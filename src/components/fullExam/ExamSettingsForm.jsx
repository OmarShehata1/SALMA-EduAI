
// ExamSettingsForm.jsx
export default function ExamSettingsForm({
    difficulty,
    setDifficulty,
    numQuestions,
    setNumQuestions,
    generateQuestions,
    isGenerating,
    selectedFileIds
  }) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Exam Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <button
          onClick={generateQuestions}
          disabled={selectedFileIds.length === 0 || isGenerating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate Questions"}
        </button>
      </div>
    );
  }
  