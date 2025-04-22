// student detail component
import React from 'react';

export function StudentDetail({ selectedStudent }) {
  const calculateOverallAverage = (questions) => {
    if (!questions || questions.length === 0) return 0;
    const sum = questions.reduce((total, q) => total + q.grade, 0);
    return (sum / questions.length).toFixed(1);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          Detailed Analysis for Student {selectedStudent.studentId}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Overall Average: {calculateOverallAverage(selectedStudent.questions)}/10
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade (0-10)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Explanation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedStudent.questions.map((question) => (
              <tr key={question.questionId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {question.questionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                    ${question.grade >= 9 ? 'bg-green-100 text-green-800' : 
                      question.grade >= 7 ? 'bg-blue-100 text-blue-800' : 
                      question.grade >= 5 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {question.grade}/10
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {question.explanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
