import React from 'react';
import { Tag } from 'lucide-react';

interface KeywordSuggestionsProps {
  keywords: string[];
}

export function KeywordSuggestions({ keywords }: KeywordSuggestionsProps) {
  if (!keywords || keywords.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Suggested Keywords</h3>
        </div>
        <p className="text-gray-500">No keywords available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Suggested Keywords</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}