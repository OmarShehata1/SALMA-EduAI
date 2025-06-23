// file upload component for uploading answer sheets in PDF format
import React from "react";

export function FileUpload({
  files,
  setFiles,
  handleEvaluate,
  isEvaluating,
  selectedExam,
}) {  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const invalidFiles = selectedFiles.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert(`Invalid file types detected: ${invalidFiles.map(f => f.name).join(', ')}. Please upload only JPG, PNG, or PDF files.`);
      return;
    }
    
    // Validate file count if exam is selected
    if (selectedExam && selectedFiles.length > selectedExam.num_of_questions) {
      alert(`Too many files! This exam has ${selectedExam.num_of_questions} questions. Please select exactly ${selectedExam.num_of_questions} files.`);
      return;
    }
    
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Question Answer Photos</h2>
      
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-700 mb-1">
          📸 One Photo Per Question
        </h3>
        <p className="text-xs text-blue-600">
          Upload one photo for each question's answer. Photos will be matched to questions based on upload order.
        </p>
      </div>

      {/* Selected Exam Info */}
      {selectedExam && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Selected Exam:
          </h3>
          <p className="text-sm text-gray-900 font-medium">
            {selectedExam.title}
          </p>
          <p className="text-xs text-gray-600">
            {selectedExam.num_of_questions} questions • Upload exactly {selectedExam.num_of_questions} photos
          </p>
          <div className="mt-2">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              files.length === selectedExam.num_of_questions 
                ? 'bg-green-100 text-green-700' 
                : files.length > selectedExam.num_of_questions
                  ? 'bg-red-100 text-red-700'
                  : 'bg-orange-100 text-orange-700'
            }`}>
              {files.length === selectedExam.num_of_questions 
                ? `✅ Perfect! ${files.length} of ${selectedExam.num_of_questions} photos` 
                : files.length > selectedExam.num_of_questions
                  ? `❌ Too many: ${files.length}/${selectedExam.num_of_questions} photos`
                  : `⏳ Need ${selectedExam.num_of_questions - files.length} more photos`
              }
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Question Answer Photos (JPG, PNG, PDF)
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileUpload}
          disabled={isEvaluating}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"        />
        <p className="text-xs text-gray-500 mt-1">
          📋 Upload photos in order: Photo 1 = Question 1 answer, Photo 2 = Question 2 answer, etc.
        </p>
        {selectedExam && (
          <p className="text-xs text-blue-600 mt-1">
            📸 Upload exactly {selectedExam.num_of_questions} photos for this exam
          </p>
        )}
      </div>      {files.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Question Answer Photos ({files.length}):
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm text-gray-700 truncate">
                  <span className="text-blue-600 font-medium">Q{index + 1}:</span> {file.name}
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
      )}      <button
        onClick={handleEvaluate}
        disabled={
          !selectedExam || 
          files.length === 0 || 
          files.length !== selectedExam?.num_of_questions || 
          isEvaluating
        }
        className={`w-full py-3 px-4 rounded-lg font-medium transition ${
          !selectedExam || 
          files.length === 0 || 
          files.length !== selectedExam?.num_of_questions || 
          isEvaluating
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isEvaluating 
          ? "Evaluating Submissions..." 
          : selectedExam && files.length === selectedExam.num_of_questions
            ? "Evaluate Submissions"
            : !selectedExam
              ? "Select an Exam First"
              : files.length === 0
                ? "Upload Photos First"
                : `Upload ${selectedExam.num_of_questions - files.length} More Photos`
        }
      </button>

      {!selectedExam && (
        <p className="text-xs text-red-600 mt-2">
          Please select an exam before uploading files
        </p>
      )}

      {selectedExam && files.length > 0 && files.length !== selectedExam.num_of_questions && (
        <p className="text-xs text-amber-600 mt-2">
          {files.length < selectedExam.num_of_questions 
            ? `Upload ${selectedExam.num_of_questions - files.length} more photos to match the ${selectedExam.num_of_questions} questions in this exam`
            : `Too many photos! Remove ${files.length - selectedExam.num_of_questions} photos to match the ${selectedExam.num_of_questions} questions`
          }
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
