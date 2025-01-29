// In your main component:
import { useDataPlayer } from './useDataPlayer';
import { useDataParser } from './DataParser';

const MainComponent = () => {
  const { parseData } = useDataParser();
  const { currentData, isPlaying, play, pause, reset, progress } = useDataPlayer([]);
  
  const handleDataLoad = (data) => {
    // Reset playback when new data is loaded
    reset();
    
    // Process each data point through the parser
    const processedData = data.map(item => parseData(item));
    setData(processedData);
  };

  useEffect(() => {
    if (currentData) {
      parseData(currentData);
    }
  }, [currentData]);

  return (
    <div>
      <ConnectionPanel
        port={port}
        onRefresh={handleRefresh}
        onDataLoad={handleDataLoad}
      />
      <div className="mt-4 flex items-center gap-2">
        <button 
          onClick={isPlaying ? pause : play}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button 
          onClick={reset}
          className="px-4 py-2 rounded bg-gray-500 text-white"
        >
          Reset
        </button>
        <div className="flex-1 h-2 bg-gray-200 rounded">
          <div 
            className="h-full bg-blue-500 rounded" 
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};