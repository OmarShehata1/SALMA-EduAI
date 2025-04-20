// import { useState } from 'react';

// export default function Grades() {
//   const [file, setFile] = useState(null);
//   const [studentsData, setStudentsData] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
  
//   // Sample data to simulate API response
//   const mockStudentsData = [
//     { id: "S1001", name: "John Doe", totalGrade: 85 },
//     { id: "S1002", name: "Jane Smith", totalGrade: 92 },
//     { id: "S1003", name: "Alex Johnson", totalGrade: 78 },
//     { id: "S1004", name: "Maria Garcia", totalGrade: 90 },
//   ];
  
//   const mockQuestionData = {
//     "S1001": [
//       { questionId: "Q1", grade: 9, explanation: "Answer demonstrates strong understanding of the core concepts but missed one minor detail." },
//       { questionId: "Q2", grade: 8, explanation: "Solution was correct but explanation could be more comprehensive." },
//       { questionId: "Q3", grade: 10, explanation: "Perfect answer with thorough explanation of reasoning." },
//       { questionId: "Q4", grade: 7, explanation: "Answer partially addresses the question but lacks depth in analysis." },
//     ],
//     "S1002": [
//       { questionId: "Q1", grade: 10, explanation: "Excellent answer with complete understanding of the concept." },
//       { questionId: "Q2", grade: 9, explanation: "Very good work with minor improvements possible in explanation." },
//       { questionId: "Q3", grade: 9, explanation: "Strong answer with clear reasoning." },
//       { questionId: "Q4", grade: 8, explanation: "Good analysis but could expand on implications." },
//     ]
//   };

//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleEvaluate = () => {
//     // Simulate evaluation API call
//     setStudentsData(mockStudentsData);
//     setSelectedStudent(null);
//   };
  
//   const handleStudentClick = (studentId) => {
//     // Simulate loading specific student data
//     setSelectedStudent({
//       studentId: studentId,
//       questions: mockQuestionData[studentId] || []
//     });
//   };
  
//   const calculateOverallAverage = (questions) => {
//     if (!questions || questions.length === 0) return 0;
//     const sum = questions.reduce((total, q) => total + q.grade, 0);
//     return (sum / questions.length).toFixed(1);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 flex-1 mt-8">
//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <h1 className="text-3xl font-bold text-blue-700 mb-3">Grade Evaluation Dashboard</h1>
//         <p className="text-gray-600 mb-6">
//           Upload assessment files to evaluate student performance using our AI-powered grading system. 
//           The system analyzes responses question by question, providing detailed feedback and justifications for each grade.
//         </p>
        
//         <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-blue-700">
//                 Upload your answer sheets in PDF format. After evaluation, click on any student ID to view question-by-question analysis.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-1">
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
            
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium text-gray-700">Upload Answer Sheets (PDF)</label>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleFileUpload}
//                 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
//               />
//             </div>
            
//             <button
//               onClick={handleEvaluate}
//               disabled={!file}
//               className={`w-full py-3 px-4 rounded-lg font-medium transition ${
//                 file
//                   ? 'bg-blue-600 text-white hover:bg-blue-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Evaluate Submissions
//             </button>
//           </div>
//         </div>
        
//         <div className="lg:col-span-2">
//           {studentsData ? (
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//               <h2 className="text-xl font-semibold p-4 border-b">Student Results</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Student ID
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Total Grade
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {studentsData.map((student) => (
//                       <tr key={student.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full 
//                             ${student.totalGrade >= 90 ? 'bg-green-100 text-green-800' : 
//                               student.totalGrade >= 80 ? 'bg-blue-100 text-blue-800' : 
//                               student.totalGrade >= 70 ? 'bg-yellow-100 text-yellow-800' : 
//                               'bg-red-100 text-red-800'}`}>
//                             {student.totalGrade}%
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           <button 
//                             onClick={() => handleStudentClick(student.id)}
//                             className="text-blue-600 hover:text-blue-900 font-medium"
//                           >
//                             View Details
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white shadow-md rounded-lg p-8 text-center">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">No data to display</h3>
//               <p className="mt-1 text-gray-500">Upload files and click evaluate to see results.</p>
//             </div>
//           )}
          
//           {selectedStudent && (
//             <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
//               <div className="bg-gray-50 px-6 py-4 border-b">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Detailed Analysis for Student {selectedStudent.studentId}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Overall Average: {calculateOverallAverage(selectedStudent.questions)}/10
//                 </p>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Question ID
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Grade (0-10)
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         AI Explanation
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {selectedStudent.questions.map((question) => (
//                       <tr key={question.questionId}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {question.questionId}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
//                             ${question.grade >= 9 ? 'bg-green-100 text-green-800' : 
//                               question.grade >= 7 ? 'bg-blue-100 text-blue-800' : 
//                               question.grade >= 5 ? 'bg-yellow-100 text-yellow-800' : 
//                               'bg-red-100 text-red-800'}`}>
//                             {question.grade}/10
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500">
//                           {question.explanation}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import Grades from "../components/Grades";

export default function Grade() {
  return (
    <div className="mt-10 mb-10">
      <Grades />
    </div>
  );
}
