import React from 'react';

export function FileUpload({ file, setFile, handleEvaluate }) {
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
      
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Upload Answer Sheets (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
        />
      </div>
      
      <button
        onClick={handleEvaluate}
        disabled={!file}
        className={`w-full py-3 px-4 rounded-lg font-medium transition ${
          file
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Evaluate Submissions
      </button>
    </div>
  );
}
