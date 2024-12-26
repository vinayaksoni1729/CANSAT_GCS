# main.py
from fastapi import FastAPI, WebSocket
from serial import Serial
import asyncio
from datetime import datetime
from dataclasses import dataclass
from typing import List, Optional
import json

@dataclass
class TelemetryPacket:
    mission_id: str
    timestamp: datetime
    packet_id: int
    packet_type: str
    temperature: float
    pressure: float
    altitude: float
    gyro_x: float
    gyro_y: float
    gyro_z: float
    accel_x: float
    accel_y: float
    accel_z: float
    latitude: float
    longitude: float
    battery: float
    
class SerialManager:
    def __init__(self, port: str, baudrate: int = 9600):
        self.serial = Serial(port, baudrate)
        self.is_running = False
    
    async def read_packets(self):
        while self.is_running:
            if self.serial.in_waiting:
                data = self.serial.readline().decode().strip()
                yield self.parse_packet(data)
            await asyncio.sleep(0.1)
    
    def parse_packet(self, data: str) -> Optional[TelemetryPacket]:
        try:
            values = data.split(',')
            return TelemetryPacket(
                mission_id=values[0],
                timestamp=datetime.strptime(values[1], '%H:%M:%S'),
                packet_id=int(values[2]),
                packet_type=values[3],
                temperature=float(values[4]),
                pressure=float(values[5]),
                altitude=float(values[6]),
                gyro_x=float(values[7]),
                gyro_y=float(values[8]),
                gyro_z=float(values[9]),
                accel_x=float(values[10]),
                accel_y=float(values[11]),
                accel_z=float(values[12]),
                latitude=float(values[13]),
                longitude=float(values[14]),
                battery=float(values[15])
            )
        except Exception as e:
            print(f"Error parsing packet: {e}")
            return None

class MissionManager:
    def __init__(self):
        self.packets: List[TelemetryPacket] = []
        self.connected_clients = set()
        
    def add_packet(self, packet: TelemetryPacket):
        self.packets.append(packet)
        self.notify_clients(packet)
    
    async def notify_clients(self, packet: TelemetryPacket):
        for client in self.connected_clients:
            await client.send_text(json.dumps(packet.__dict__))

app = FastAPI()
mission_manager = MissionManager()
serial_manager = None

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    mission_manager.connected_clients.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            command = json.loads(data)
            if command['type'] == 'COMMAND':
                # Send command to serial port
                serial_manager.serial.write(command['data'].encode())
    except:
        mission_manager.connected_clients.remove(websocket)

@app.post("/start/{port}")
async def start_mission(port: str):
    global serial_manager
    serial_manager = SerialManager(port)
    serial_manager.is_running = True
    
    async for packet in serial_manager.read_packets():
        if packet:
            mission_manager.add_packet(packet)

@app.post("/stop")
async def stop_mission():
    if serial_manager:
        serial_manager.is_running = False
        serial_manager.serial.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)