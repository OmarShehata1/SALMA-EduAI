// file upload component for uploading answer sheets in PDF format
import React from "react";

export function FileUpload({
  files,
  setFiles,
  handleEvaluate,
  isEvaluating,
  selectedExam,
}) {
  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Answer Sheets</h2>

      {/* Selected Exam Info */}
      {selectedExam && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Grading Exam:
          </h3>
          <p className="text-sm text-gray-900 font-medium">
            {selectedExam.title}
          </p>
          <p className="text-xs text-gray-600">
            {selectedExam.num_of_questions} questions • {selectedExam.duration}{" "}
            minutes
          </p>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Answer Sheets (PDF/Images)
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileUpload}
          disabled={isEvaluating}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          Select multiple files - each file will be treated as a different
          student's answer sheet
        </p>
        {selectedExam && (
          <p className="text-xs text-blue-600 mt-1">
            ⚠️ Make sure each file contains exactly{" "}
            {selectedExam.num_of_questions} question answers
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Files ({files.length}):
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm text-gray-700 truncate">
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  disabled={isEvaluating}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleEvaluate}
        disabled={files.length === 0 || isEvaluating || !selectedExam}
        className={`w-full py-3 px-4 rounded-lg font-medium transition ${
          files.length === 0 || isEvaluating || !selectedExam
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isEvaluating ? "Evaluating Submissions..." : "Evaluate Submissions"}
      </button>

      {!selectedExam && (
        <p className="text-xs text-red-600 mt-2">
          Please select an exam before uploading files
        </p>
      )}

      {isEvaluating && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-700">
              Processing {files.length} answer sheet
              {files.length !== 1 ? "s" : ""} for "{selectedExam?.title}"...
              This may take a few minutes.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
