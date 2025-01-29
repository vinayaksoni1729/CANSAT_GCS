import React from 'react';
import { Aperture, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const FinStabilizationStatus = ({ telemetryData }) => {
  // Calculate torque from IMU data
  const momentOfInertia = 0.25; // Example value, update based on your CanSat
  const torque = momentOfInertia * (telemetryData.angularAccelerationX ** 2 + 
                                   telemetryData.angularAccelerationY ** 2 + 
                                   telemetryData.angularAccelerationZ ** 2) ** 0.5;

  const isStabilizing = torque <= 0.5; // Example threshold, adjust as needed

  // Handle the case where finAngle is undefined
  const finAngle = telemetryData.finAngle !== undefined ? telemetryData.finAngle : 0;

  return (
    <div className="bg-gray-900 text-white rounded-lg p-5 flex items-center justify-between h-45 w-full">
      <div className="flex items-center">
        <Aperture size={36} className="mr-4 text-blue-500" />
        <div>
          <div className="text-4xl font-bold">{isStabilizing ? 'Stabilizing' : 'Not Stabilizing'}</div>
          <div className="text-sm text-gray-400">Stabilization Status</div>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <ArrowUpRight size={36} className="mr-4 text-blue-500" />
          <div>
            <div className="text-3xl font-bold">{torque.toFixed(2)} N·m</div>
            <div className="text-sm text-gray-400">Detected Torque</div>
          </div>
        </div>
        <div className="flex items-center">
          <ArrowDownRight size={36} className="mr-4 text-blue-500" />
          <div>
            <div className="text-3xl font-bold">{finAngle.toFixed(1)}°</div>
            <div className="text-sm text-gray-400">Fin Angle</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinStabilizationStatus;