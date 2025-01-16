import React, { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { KeywordSuggestions } from './components/KeywordSuggestions';
import { Recommendations } from './components/Recommendations';
import { ScoreCard } from './components/ScoreCard';
import { ResumeTemplate } from './components/ResumeTemplate';

interface Analysis {
  atsScore: number;
  suggestedKeywords: string[];
  recommendations: string[];
}

const calculateATSScore = (text: string): number => {
  const essentialSections = {
    contact: ['email', 'phone', 'linkedin', 'address'],
    education: ['degree', 'university', 'gpa', 'graduation'],
    experience: ['work', 'role', 'company', 'achievements', 'responsibilities'],
    skills: ['technical', 'software', 'programming', 'tools', 'frameworks'],
    projects: ['project', 'developed', 'implemented', 'created', 'led']
  };

  const formatChecks = {
    bulletPoints: ['•', '-', '►'],
    headers: ['summary', 'experience', 'education', 'skills'],
    formatting: ['spacing', 'consistency', 'alignment']
  };

  let score = 0;
  const textLower = text.toLowerCase();

  // Section scoring (40%)
  Object.entries(essentialSections).forEach(([_, keywords]) => {
    const sectionScore = keywords.reduce((acc, keyword) => {
      return acc + (textLower.includes(keyword.toLowerCase()) ? 8 : 0);
    }, 0);
    score += Math.min(sectionScore, 40);
  });

  // Format scoring (30%)
  Object.entries(formatChecks).forEach(([_, elements]) => {
    const formatScore = elements.reduce((acc, element) => {
      return acc + (text.includes(element) ? 10 : 0);
    }, 0);
    score += Math.min(formatScore, 30);
  });

  // Content density (20%)
  const words = textLower.split(/\s+/);
  const keywordDensity = words.filter(word => 
    Object.values(essentialSections).flat().includes(word)
  ).length / words.length;
  score += Math.min(keywordDensity * 100, 20);

  // Length check (10%)
  const idealLength = 500;
  const lengthScore = Math.min((words.length / idealLength) * 10, 10);
  score += lengthScore;

  return Math.min(Math.round(score), 100);
};

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const uploadedFile = event.target.files?.[0];
      if (!uploadedFile) return;

      setFile(uploadedFile);
      setIsLoading(true);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const atsScore = calculateATSScore(text);
        
        const analysis: Analysis = {
          atsScore,
          suggestedKeywords: ['React', 'Node.js', 'TypeScript', 'API Development', 'AWS','CI/CD','DevOps','Microservices','System Design'],
          recommendations: [
            'Add more quantifiable achievements',
            'Include relevant certifications',
            'Use more industry-specific keywords',
            'Improve formatting with bullet points',
            'Customize your resume for each job application',
            'Proofread your resume for spelling and grammar errors',
            'Ensure your contact information is clearly visible',
            'Highlight your most relevant skills and experiences',
            'Quantify your achievements with numbers and percentage',
            'Use action verbs to describe your achievements',
            'Keep your resume concise',
            'Use a professional email address',
            'Use a simple and clean resume template',


          ]
        };
        
        setAnalysis(analysis);
        setIsLoading(false);
      };

      reader.readAsText(uploadedFile);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Resume Analyzer</h1>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Analyzing your resume...</p>
                </div>
              )}

              {analysis && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ScoreCard score={analysis.atsScore} />
                  <KeywordSuggestions keywords={analysis.suggestedKeywords} />
                  <Recommendations recommendations={analysis.recommendations} />
                  {file && (
                    <div className="md:col-span-3">
                      <ResumeTemplate 
                        resumeText={URL.createObjectURL(file)}
                        analysis={{
                          keywords: analysis.suggestedKeywords,
                          recommendations: analysis.recommendations
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
                Made with love by Swayam & Vaibhav
            </p>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/in/vm07/" className="text-gray-500 hover:text-gray-900">Vaibhav</a>
              <a href="https://www.linkedin.com/in/swayam-gupta0708/" className="text-gray-500 hover:text-gray-900">Swayam</a>
              {/* <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}