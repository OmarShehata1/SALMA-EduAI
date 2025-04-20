import { useState } from 'react';
import { Header } from './Header';
import { FileUpload } from './FileUpload';
import { StudentsTable } from './StudentsTable';
import { StudentDetail } from './StudentDetail';
import { EmptyState } from './EmptyState';

export default function Grades() {
  const [file, setFile] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Sample data to simulate API response
  const mockStudentsData = [
    { id: "S1001", name: "John Doe", totalGrade: 85 },
    { id: "S1002", name: "Jane Smith", totalGrade: 92 },
    { id: "S1003", name: "Alex Johnson", totalGrade: 78 },
    { id: "S1004", name: "Maria Garcia", totalGrade: 90 },
  ];
  
  const mockQuestionData = {
    "S1001": [
      { questionId: "Q1", grade: 9, explanation: "Answer demonstrates strong understanding of the core concepts but missed one minor detail." },
      { questionId: "Q2", grade: 8, explanation: "Solution was correct but explanation could be more comprehensive." },
      { questionId: "Q3", grade: 10, explanation: "Perfect answer with thorough explanation of reasoning." },
      { questionId: "Q4", grade: 7, explanation: "Answer partially addresses the question but lacks depth in analysis." },
    ],
    "S1002": [
      { questionId: "Q1", grade: 10, explanation: "Excellent answer with complete understanding of the concept." },
      { questionId: "Q2", grade: 9, explanation: "Very good work with minor improvements possible in explanation." },
      { questionId: "Q3", grade: 9, explanation: "Strong answer with clear reasoning." },
      { questionId: "Q4", grade: 8, explanation: "Good analysis but could expand on implications." },
    ]
  };

  const handleEvaluate = () => {
    // Simulate evaluation API call
    setStudentsData(mockStudentsData);
    setSelectedStudent(null);
  };
  
  const handleStudentClick = (studentId) => {
    // Simulate loading specific student data
    setSelectedStudent({
      studentId: studentId,
      questions: mockQuestionData[studentId] || []
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex-1 mt-8">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FileUpload 
            file={file} 
            setFile={setFile} 
            handleEvaluate={handleEvaluate} 
          />
        </div>
        
        <div className="lg:col-span-2">
          {studentsData ? (
            <StudentsTable 
              studentsData={studentsData} 
              handleStudentClick={handleStudentClick} 
            />
          ) : (
            <EmptyState />
          )}
          
          {selectedStudent && (
            <StudentDetail selectedStudent={selectedStudent} />
          )}
        </div>
      </div>
    </div>
  );
}