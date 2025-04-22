// StudentGrades.jsx - Main component for the student grades page
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Award, AlertCircle, CheckCircle, HelpCircle, Lock, Shield } from 'lucide-react';
import StudentHeader from './StudentHeader';
import GradesSummary from './GradesSummary';
import QuestionBreakdown from './QuestionBreakdown';
import EmptyState from './EmptyState';
// import useAuth from '../../hooks/useAuth';

export default function StudentGrades() {
//   const { user } = useAuth(); // Custom hook to get authenticated user details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gradesData, setGradesData] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch from your secure API
    const fetchStudentGrades = async () => {
      try {
        setLoading(true);
        
        // Replace with actual API call using the student's ID from auth context
        // Example: const response = await axios.get(`/api/students/${user.id}/grades`);
        
        // For demonstration, using mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Mock data structure similar to what your backend would return
        const mockTeachers = [
          { id: "T1001", name: "Dr. Smith" },
          { id: "T1002", name: "Prof. Johnson" }
        ];
        
        const mockGradesData = {
          "T1001": {
            teacherName: "Dr. Smith",
            totalScore: 85,
            courseTitle: "Advanced Mathematics",
            evaluationDate: "2025-04-15",
            questions: [
              { 
                questionId: "Q1", 
                title: "Differential Equations",
                grade: 9, 
                maxGrade: 10,
                explanation: "Strong understanding of key concepts. The solution demonstrates excellent application of differential equations to solve the problem. Minor errors in final calculation." 
              },
              { 
                questionId: "Q2", 
                title: "Vector Calculus",
                grade: 8, 
                maxGrade: 10,
                explanation: "Good work showing vector field analysis. The answer correctly identifies the gradient but could have elaborated more on the divergence theorem application." 
              },
              { 
                questionId: "Q3", 
                title: "Linear Algebra",
                grade: 10, 
                maxGrade: 10,
                explanation: "Perfect answer with comprehensive understanding of eigenvalues and eigenvectors. Excellent work showing all steps clearly." 
              },
            ]
          },
          "T1002": {
            teacherName: "Prof. Johnson",
            totalScore: 78,
            courseTitle: "Data Structures",
            evaluationDate: "2025-04-10",
            questions: [
              { 
                questionId: "Q1", 
                title: "Binary Trees",
                grade: 8, 
                maxGrade: 10,
                explanation: "Good understanding of tree traversal algorithms. Implementation was correct but efficiency analysis could be improved." 
              },
              { 
                questionId: "Q2", 
                title: "Hash Tables",
                grade: 7, 
                maxGrade: 10,
                explanation: "Adequate explanation of collision resolution techniques. The time complexity analysis was correct but lacked depth." 
              },
              { 
                questionId: "Q3", 
                title: "Graph Algorithms",
                grade: 6, 
                maxGrade: 10,
                explanation: "Basic understanding demonstrated but missed some important concepts in the Dijkstra algorithm implementation." 
              },
            ]
          }
        };
        
        setTeachers(mockTeachers);
        setGradesData(mockGradesData);
        setSelectedTeacher(mockTeachers[0].id);
      } catch (err) {
        console.error("Error fetching student grades:", err);
        setError("Failed to load your grades. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    
      fetchStudentGrades();
    
  }, []);

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your grades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex-1 mt-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gradesData || Object.keys(gradesData).length === 0) {
    return <EmptyState message="No grades available yet" icon={Book} />;
  }

  const currentTeacherData = gradesData[selectedTeacher];

  return (
    <div className="container mx-auto px-4 py-8 flex-1 mt-8">
      <StudentHeader 
        // studentName={user?.name || "Student"} 
        // studentId={user?.id || "Unknown"}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Teacher Selection Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 text-blue-600 mr-2" />
              Your Teachers
            </h2>
            
            <div className="mt-4 space-y-2">
              {teachers.map((teacher) => (
                <motion.button
                  key={teacher.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTeacherSelect(teacher.id)}
                  className={`w-full p-3 rounded-lg flex items-center ${
                    selectedTeacher === teacher.id
                      ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-700">{teacher.name.charAt(0)}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{teacher.name}</div>
                    <div className="text-xs text-gray-500">
                      {gradesData[teacher.id]?.courseTitle || "No course info"}
                    </div>
                  </div>
                  {selectedTeacher === teacher.id && (
                    <CheckCircle className="h-5 w-5 text-blue-600 ml-auto" />
                  )}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Your grades are private and secure. Only you and your teachers can access this information.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {currentTeacherData ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GradesSummary
                  teacherName={currentTeacherData.teacherName}
                  courseTitle={currentTeacherData.courseTitle}
                  totalScore={currentTeacherData.totalScore}
                  evaluationDate={currentTeacherData.evaluationDate}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8"
              >
                <QuestionBreakdown
                  questions={currentTeacherData.questions}
                />
              </motion.div>
            </>
          ) : (
            <EmptyState 
              message="Select a teacher to view your grades" 
              icon={HelpCircle} 
            />
          )}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <Lock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Privacy Note</h3>
            <p className="text-sm text-blue-700 mt-1">
              This page shows only your personal grades and evaluations. All data is encrypted and securely stored.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}