import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileText, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in. Please make sure Firebase is properly configured.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <FileText className="h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Resume Analyzer</h2>
          <p className="text-gray-600 text-center mt-2">Sign in to analyze your resume</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleSignIn}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};