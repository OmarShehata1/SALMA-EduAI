
// src/components/Grades/Header.jsx for the Grade Evaluation Dashboard
import React from 'react';

export function Header() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">      <h1 className="text-3xl font-bold text-blue-700 mb-3">Photo-Based Exam Grading</h1>
      <p className="text-gray-600 mb-6">
        Upload photos of student answer sheets for automatic grading. Each photo should contain the answer to one specific question. 
        The AI system will grade each answer against the corresponding question from your exam template.
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              📸 <strong>How it works:</strong> Select an exam template → Upload photos in order (Photo 1 = Q1 answer, Photo 2 = Q2 answer, etc.) → Get instant AI grading results with detailed feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
