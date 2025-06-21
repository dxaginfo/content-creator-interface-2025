import React from 'react';
import { HistoryItem } from '../types';

interface HistoryTrackerProps {
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

const HistoryTracker: React.FC<HistoryTrackerProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">History</h2>
        <button
          onClick={onClearHistory}
          className="px-3 py-1 text-sm text-red-500 hover:text-red-600 hover:underline"
        >
          Clear History
        </button>
      </div>
      <div className="border rounded-lg divide-y dark:border-gray-700">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-4 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800"
            onClick={() => onSelectHistoryItem(item)}
          >
            <div className="font-medium truncate">{item.prompt}</div>
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span>{new Date(item.timestamp).toLocaleString()}</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded dark:bg-gray-700">
                {item.style.replaceAll('-', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTracker;