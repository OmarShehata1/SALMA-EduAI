
// GeneratedQuestions.jsx
import { useState } from "react";

export default function GeneratedQuestions({ questions, saveSelectedQuestions }) {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState(
    questions.map(q => q.id) // Select all by default
  );
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Toggle question selection
  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestionIds(prevIds => 
      prevIds.includes(questionId)
        ? prevIds.filter(id => id !== questionId)
        : [...prevIds, questionId]
    );
  };

  // Start editing a question
  const startEditing = (question) => {
    setEditingId(question.id);
    setEditData(question);
  };

  // Save edited question
  const saveEdit = () => {
    questions = questions.map(q => 
      q.id === editingId ? editData : q
    );
    setEditingId(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Handle saving all selected questions
  const handleSaveSelected = () => {
    const selectedQuestions = questions.filter(q => 
      selectedQuestionIds.includes(q.id)
    );
    saveSelectedQuestions(selectedQuestions);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSaveSelected}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Selected Questions
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Generated Questions</h2>
      
      <div className="space-y-4">
        {questions.map((question) => (
          <div 
            key={question.id} 
            className="border-l-4 border-blue-500 bg-white rounded shadow"
          >
            {editingId === question.id ? (
              <div className="p-4 space-y-4">
                <textarea
                  value={editData.question}
                  onChange={(e) => setEditData({...editData, question: e.target.value})}
                  className="w-full border rounded p-2"
                  rows={2}
                />
                <textarea
                  value={editData.answer}
                  onChange={(e) => setEditData({...editData, answer: e.target.value})}
                  className="w-full border rounded p-2"
                  rows={2}
                />
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={cancelEdit}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveEdit}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={`question-${question.id}`}
                    checked={selectedQuestionIds.includes(question.id)}
                    onChange={() => toggleQuestionSelection(question.id)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <label 
                        htmlFor={`question-${question.id}`}
                        className="text-gray-900 font-medium cursor-pointer"
                      >
                        {question.question}
                      </label>                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Grade: {question.grade || 1}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{question.answer}</p>
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={() => startEditing(question)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}