import React from 'react';

const ButtonB = () => {
  const numberButtons = [
    { label: '0', modifier: '-' },
    { label: '0', modifier: '+' },
    { label: '1', modifier: '-' },
    { label: '1', modifier: '+' },
    { label: '2', modifier: '-' },
    { label: '2', modifier: '+' },
    { label: '3', modifier: '-' },
    { label: '3', modifier: '+' },
  ];

  return (
    <div className="bg-slate-900 h-full rounded-lg p-4">
      <div className="flex flex-col h-full gap-4">
        <div className="grid grid-cols-12 gap-2">
          {/* Number control buttons - 2 columns */}
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {numberButtons.map((btn, index) => (
              <button
                key={`${btn.label}${btn.modifier}`}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-sm h-8"
              >
                {btn.label}{btn.modifier}
              </button>
            ))}
          </div>

          {/* System control buttons - 6 columns */}
          <div className="col-span-6 grid grid-cols-3 gap-2">
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8 col-span-2">
              MEM → FLASH
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8">
              UNHOLD
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8 col-span-2">
              Fin Test
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8">
              Gyro
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8">
              Mag
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8 col-span-2">
              Fin Alignment
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8 col-span-3">
              Manual Deploy Chutes
            </button>
          </div>

          {/* Critical control buttons - 4 columns */}
          <div className="col-span-4 grid grid-cols-2 gap-2">
            <button className="bg-red-900 hover:bg-red-800 text-slate-200 py-1.5 px-2 rounded text-xs h-8 col-span-2">
              MASTER ABORT
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8">
              Vehicle Safe
            </button>
            <button className="bg-yellow-900 hover:bg-yellow-800 text-slate-200 py-1.5 px-2 rounded text-xs h-8">
              HOLD
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8">
              Vehicle Arm
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded text-xs h-8 col-span-2">
              Clear Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonB;
