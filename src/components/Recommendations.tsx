import React from 'react';
import { Lightbulb } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200 md:col-span-2">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
        </div>
        <p className="text-gray-500">No recommendations available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200 md:col-span-2">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
      </div>
      <ul className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                {index + 1}
              </span>
            </div>
            <p className="text-gray-700">{recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}