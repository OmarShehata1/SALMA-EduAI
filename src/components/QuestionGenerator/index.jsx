// import { useState } from 'react';
// import QuestionEditor from './QuestionEditor';
// import GeneratedQuestion from './GeneratedQuestion';
// import { useNavigate } from 'react-router-dom';

// export default function QuestionGenerator() {
//   const [generatedQuestions, setGeneratedQuestions] = useState([]);
//   const [topic, setTopic] = useState('');
//   const [difficulty, setDifficulty] = useState('medium');
//   const [numQuestions, setNumQuestions] = useState(5);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);
  
//   const navigate = useNavigate();
  
//   // Mock function to simulate generating questions with an AI model
//   const generateQuestions = () => {
//     setIsGenerating(true);
    
//     // Simulate API call delay
//     setTimeout(() => {
//       const newQuestions = [];
//       for (let i = 1; i <= numQuestions; i++) {
//         newQuestions.push({
//           id: Date.now() + i,
//           question: `Sample ${difficulty} question about ${topic} (#${i})`,
//           answer: `Sample answer for question #${i} about ${topic}.`,
//           isSelected: true,
//           difficulty: difficulty
//         });
//       }
//       setGeneratedQuestions(newQuestions);
//       setIsGenerating(false);
//     }, 1500);
//   };
  
//   const handleCheckboxChange = (id) => {
//     setGeneratedQuestions(
//       generatedQuestions.map(q => 
//         q.id === id ? { ...q, isSelected: !q.isSelected } : q
//       )
//     );
//   };
  
//   const handleEditQuestion = (question) => {
//     setEditingQuestion(question);
//   };
  
//   const handleSaveEdit = (editedQuestion) => {
//     setGeneratedQuestions(
//       generatedQuestions.map(q => 
//         q.id === editedQuestion.id ? editedQuestion : q
//       )
//     );
//     setEditingQuestion(null);
//   };
  
//   const handleCancelEdit = () => {
//     setEditingQuestion(null);
//   };
  
//   const handleSaveQuestions = () => {
//     const selectedQuestions = generatedQuestions.filter(q => q.isSelected);
//     // Save selected questions to local storage (in a real app, you'd use an API)
//     localStorage.setItem('selectedQuestions', JSON.stringify(selectedQuestions));
//     navigate('/questions'); // Navigate to the questions display page
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8 mt-12">
//       <h1 className="text-3xl font-bold mb-6 text-blue-700">Question Generator</h1>
      
//       {/* Generation Controls */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
//             <input
//               type="text"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               placeholder="Enter a topic for the questions"
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
//             <select
//               value={difficulty}
//               onChange={(e) => setDifficulty(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
//             <input
//               type="number"
//               min="1"
//               max="20"
//               value={numQuestions}
//               onChange={(e) => setNumQuestions(parseInt(e.target.value))}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
        
//         <button
//           onClick={generateQuestions}
//           disabled={!topic || isGenerating}
//           className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//             !topic || isGenerating
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {isGenerating ? 'Generating...' : 'Generate Questions'}
//         </button>
//       </div>
      
//       {/* Generated Questions */}
//       {generatedQuestions.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Generated Questions</h2>
//             <button
//               onClick={handleSaveQuestions}
//               className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium"
//             >
//               Save Selected Questions
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             {generatedQuestions.map((question) => (
//               <GeneratedQuestion
//                 key={question.id}
//                 question={question}
//                 onCheckboxChange={handleCheckboxChange}
//                 onEdit={handleEditQuestion}
//               />
//             ))}
//           </div>
//         </div>
//       )}
      
//       {/* Question Editor Modal */}
//       {editingQuestion && (
//         <QuestionEditor
//           question={editingQuestion}
//           onSave={handleSaveEdit}
//           onCancel={handleCancelEdit}
//         />
//       )}
//     </div>
//   );
// }