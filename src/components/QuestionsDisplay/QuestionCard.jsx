import { useState } from 'react';

export default function QuestionCard({ question, onEdit, onDelete }) {
  const [showAnswer, setShowAnswer] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{question.question}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full
            ${question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
              question.difficulty === 'medium' ? 'bg-blue-100 text-blue-800' : 
              'bg-red-100 text-red-800'}`}>
            {question.difficulty}
          </span>
        </div>
        
        {showAnswer && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-gray-700">{question.answer}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          
          <div className="space-x-3">
            <button
              onClick={() => onEdit(question)}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(question.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}