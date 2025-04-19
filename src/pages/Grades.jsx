import { useState } from 'react';

export default function Grades() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEvaluate = () => {
    // Simulate evaluation
    setResults({
      questions: 10,
      grade: '85%',
      explanation: 'Strong performance in multiple choice questions. Areas for improvement in essay sections.'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex-1">
      <h1 className="text-3xl font-bold mb-8">Grade Evaluation</h1>

      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">Upload Answer Sheet PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        <button
          onClick={handleEvaluate}
          disabled={!file}
          className={`w-full py-2 px-4 rounded-lg font-medium ${
            file
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Evaluate
        </button>

        {results && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Number of Questions</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{results.questions}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grade</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{results.grade}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Explanation</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{results.explanation}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}