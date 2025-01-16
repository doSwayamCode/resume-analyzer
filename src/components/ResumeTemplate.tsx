import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

interface ResumeTemplateProps {
  resumeText: string;
  analysis: {
    keywords?: string[];
    recommendations?: string[];
  };
}

export function ResumeTemplate({ resumeText, analysis }: ResumeTemplateProps) {
  const templateUrl = "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs"; 

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([resumeText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "resume-template.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">ATS-Optimized Resume Template</h2>
        <div className="flex gap-3">
          <a
            href={templateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Template
          </a>
          {/* <button 
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </button> */}
        </div>
      </div>
      
      <div className="prose max-w-none">
        <div className="border rounded-lg p-6 bg-gray-50">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {resumeText || 'No resume content available'}
          </pre>
        </div>
        
        {analysis && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Analysis Results</h3>
            {analysis.keywords && analysis.keywords.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Keywords Found:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}