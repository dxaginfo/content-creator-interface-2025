import React from 'react';
import ReactMarkdown from 'react-markdown';
import { GeneratedContent as ContentType } from '../types';

interface GeneratedContentProps {
  content: ContentType | null;
  onExport: () => void;
  onCopy: () => void;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, onExport, onCopy }) => {
  if (!content) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Generated Content</h2>
        <div className="space-x-2">
          <button
            onClick={onCopy}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Copy
          </button>
          <button
            onClick={onExport}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Export
          </button>
        </div>
      </div>
      <div className="p-6 border border-gray-200 rounded-lg prose dark:prose-invert dark:border-gray-700">
        <ReactMarkdown>{content.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default GeneratedContent;