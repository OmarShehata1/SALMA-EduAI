
// ExamSettingsForm.jsx
import { Sparkles, Globe, FileText } from "lucide-react";

export default function ExamSettingsForm({
    generateQuestions,
    isGenerating,
    selectedFileIds,
    selectedLanguage,
    onLanguageChange
  }) {
    return (
      <div>
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">Generation Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 mr-2" />
              Question Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md transition-colors"
              disabled={isGenerating}
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Choose the language for generated questions
            </p>
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2" />
              Expected Output
            </label>
            <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">20-30 comprehensive questions</span>
              </div>
              <div className="text-xs mt-1 ml-4">
                Generated automatically from your PDF content
              </div>
            </div>
          </div>
        </div>

        {/* File Selection Summary */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-blue-800">
                {selectedFileIds.length} PDF{selectedFileIds.length !== 1 ? 's' : ''} selected
              </span>
              <div className="text-xs text-blue-600 mt-1">
                Ready for question generation
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {selectedFileIds.length}
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={generateQuestions}
          disabled={selectedFileIds.length === 0 || isGenerating}
          className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-200 ${
            selectedFileIds.length === 0 || isGenerating
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Generating Questions...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Questions from PDFs
            </div>
          )}
        </button>
        
        {selectedFileIds.length === 0 && (
          <div className="flex items-center mt-3 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
            <div className="w-4 h-4 bg-amber-500 rounded-full mr-2 flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            Please select at least one PDF file before generating questions.
          </div>
        )}
      </div>
    );
  }
  