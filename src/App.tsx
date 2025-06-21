import React, { useState, useRef, useEffect } from 'react';
import StyleSelector from './components/StyleSelector';
import ContentPromptInput from './components/ContentPromptInput';
import GeneratedContent from './components/GeneratedContent';
import HistoryTracker from './components/HistoryTracker';
import { WritingStyle, GeneratedContent as ContentType, HistoryItem } from './types';
import { generateContent } from './services/contentGenerator';

const App: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('tim-ferriss');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<ContentType | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('contentHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing saved history:', error);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('contentHistory', JSON.stringify(history));
  }, [history]);

  const handleGenerateContent = async (prompt: string) => {
    setIsLoading(true);
    try {
      const content = await generateContent(prompt, selectedStyle);
      setGeneratedContent(content);
      setHistory((prev) => [content, ...prev]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content);
      alert('Content copied to clipboard!');
    }
  };

  const handleExportContent = () => {
    setShowExportOptions(!showExportOptions);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setGeneratedContent(item);
    setSelectedStyle(item.style);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your history?')) {
      setHistory([]);
      localStorage.removeItem('contentHistory');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Content Creator Interface</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate content in various writing styles
          </p>
        </header>

        <main>
          <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
          <ContentPromptInput onSubmit={handleGenerateContent} isLoading={isLoading} />
          
          <div ref={contentRef}>
            <GeneratedContent 
              content={generatedContent} 
              onExport={handleExportContent}
              onCopy={handleCopyContent}
            />
          </div>
          
          {showExportOptions && generatedContent && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Export Options</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (generatedContent) {
                      const blob = new Blob([generatedContent.content], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `content-${new Date().getTime()}.txt`;
                      a.click();
                    }
                  }}
                  className="w-full px-4 py-2 text-left border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Export as Text (.txt)
                </button>
                <button
                  onClick={() => {
                    if (generatedContent) {
                      const blob = new Blob([generatedContent.content], { type: 'text/markdown;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `content-${new Date().getTime()}.md`;
                      a.click();
                    }
                  }}
                  className="w-full px-4 py-2 text-left border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Export as Markdown (.md)
                </button>
              </div>
            </div>
          )}

          <HistoryTracker 
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
          />
        </main>

        <footer className="mt-12 pt-6 border-t text-center text-gray-500 dark:border-gray-700">
          <p>© 2025 Content Creator Interface</p>
        </footer>
      </div>
    </div>
  );
};

export default App;