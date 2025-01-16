import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ScoreCardProps {
  score: number;
}

export function ScoreCard({ score }: ScoreCardProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number): JSX.Element => {
    if (score >= 60) return <CheckCircle className="w-6 h-6" />;
    return <AlertCircle className="w-6 h-6" />;
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 80) return 'Excellent ATS compatibility';
    if (score >= 60) return 'Good ATS compatibility';
    return 'Needs improvement';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">ATS Score</h3>
        <div className={`flex items-center ${getScoreColor(score)}`}>
          {getScoreIcon(score)}
        </div>
      </div>
      <div className="text-center">
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </div>
        <p className="mt-2 text-sm text-gray-600">{getScoreMessage(score)}</p>
      </div>
    </div>
  );
}