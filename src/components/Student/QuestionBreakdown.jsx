// QuestionBreakdown.jsx - Component to display detailed breakdown of each question
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function QuestionBreakdown({ questions }) {
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Function to get icon based on score
  const getScoreIcon = (score) => {
    if (score >= 9) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 7) return <CheckCircle className="h-5 w-5 text-blue-600" />;
    if (score >= 5) return <HelpCircle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          Question by Question Analysis
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Click on any question to see detailed feedback and explanation.
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {questions.map((question) => (
          <div key={question.questionId} className="bg-white">
            <button
              onClick={() => toggleQuestion(question.questionId)}
              className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
            >
              <div className="flex items-center">
                <div className="mr-4">
                  {getScoreIcon(question.grade)}
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">{question.title}</p>
                  <p className="text-sm text-gray-500">Question {question.questionId}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`px-2 py-1 rounded-full text-sm font-semibold mr-3
                  ${question.grade >= 9 ? 'bg-green-100 text-green-800' :
                    question.grade >= 7 ? 'bg-blue-100 text-blue-800' :
                    question.grade >= 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}
                >
                  {question.grade}/{question.maxGrade}
                </div>
                {expandedQuestions[question.questionId] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </button>
            
            <AnimatePresence>
              {expandedQuestions[question.questionId] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback from AI:</h4>
                    <p className="text-gray-600 bg-white p-3 rounded-md border border-gray-200">
                      {question.explanation}
                    </p>
                    
                    <div className="mt-4 flex items-center">
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">Score</span>
                          <span className="text-xs font-medium text-gray-700">{question.grade}/{question.maxGrade}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              question.grade >= 9 ? 'bg-green-600' :
                              question.grade >= 7 ? 'bg-blue-600' :
                              question.grade >= 5 ? 'bg-yellow-500' :
                              'bg-red-600'
                            }`} 
                            style={{ width: `${(question.grade/question.maxGrade) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}