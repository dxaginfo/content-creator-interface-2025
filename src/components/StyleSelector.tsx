import React from 'react';
import { WritingStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: WritingStyle;
  onStyleChange: (style: WritingStyle) => void;
}

const styleNames: Record<WritingStyle, string> = {
  'tim-ferriss': 'Super Writer GPT (Tim Ferriss Style)',
  'tim-ferriss-james-clear': 'Super Writer GPT (Tim Ferriss Style) + James Clear (20%)',
  'shane-parrish': 'Insight Writer GPT (Shane Parrish Style)',
  'mark-manson': 'Brutally Honest GPT (Mark Manson Style)',
  'david-perell': 'Idea Curator GPT (David Perell Style)'
};

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Select Writing Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {(Object.keys(styleNames) as WritingStyle[]).map((style) => (
          <div
            key={style}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedStyle === style 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
            onClick={() => onStyleChange(style)}
          >
            <h3 className="font-medium">{styleNames[style]}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;