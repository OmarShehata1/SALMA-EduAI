export default function GeneratedQuestion({ question, onCheckboxChange, onEdit }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 ">
        <div className="flex items-start">
          <div className="mr-4">
            <input
              type="checkbox"
              checked={question.isSelected}
              onChange={() => onCheckboxChange(question.id)}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">{question.question}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full
                ${question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                  question.difficulty === 'medium' ? 'bg-blue-100 text-blue-800' : 
                  'bg-red-100 text-red-800'}`}>
                {question.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{question.answer}</p>
            
            <div className="mt-3 text-right">
              <button
                onClick={() => onEdit(question)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  