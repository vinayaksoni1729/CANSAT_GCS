import React, { useCallback, useRef } from 'react';
import { RefreshCw, Upload } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ConnectionPanel = ({ port, onRefresh, onDataLoad }) => {
  const { isDark } = useTheme();
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(header => header.trim());
      
      const parsedData = rows.slice(1)
        .filter(row => row.trim()) // Skip empty rows
        .map(row => {
          const values = row.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index]?.trim() || '';
            return obj;
          }, {});
        });

      onDataLoad(parsedData);
    } catch (error) {
      console.error('Error reading CSV file:', error);
      alert('Error reading CSV file. Please check the format.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white shadow-md'} rounded-lg`}>
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <label className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            XBEE Port:
          </label>
          <select 
            className={`w-full ${
              isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'
            } p-2 rounded`}
          >
            <option>{port}</option>
          </select>
        </div>
        <button 
          onClick={onRefresh}
          className={`p-3 ${
            isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'
          } rounded`}
        >
          <RefreshCw className={isDark ? 'text-white' : 'text-gray-800'} size={20} />
        </button>
      </div>
      
      <div className="mt-4">
        <label className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Simulation File:
        </label>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={handleUploadClick}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              isDark 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <Upload size={16} />
            Upload CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPanel;