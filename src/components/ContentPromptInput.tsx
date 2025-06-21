import React, { useState } from 'react';

interface ContentPromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const ContentPromptInput: React.FC<ContentPromptInputProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-lg font-semibold mb-2">
          What would you like to write about?
        </label>
        <textarea
          id="prompt"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your content prompt here... (e.g., 'Write a blog post about improving productivity')"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          isLoading || !prompt.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'
            : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </form>
  );
};

export default ContentPromptInput;