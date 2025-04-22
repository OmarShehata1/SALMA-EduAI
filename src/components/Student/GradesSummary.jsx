// GradesSummary.jsx - Component to display summary of grades for a specific teacher
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Award } from 'lucide-react';

export default function GradesSummary({ teacherName, courseTitle, totalScore, evaluationDate }) {
  // Function to determine grade color based on score
  const getGradeColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  // Function to get grade letter based on score
  const getGradeLetter = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg overflow-hidden"
      whileHover={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
          <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
          {courseTitle}
        </h2>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Teacher</p>
            <p className="font-medium text-gray-800">{teacherName}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Evaluated on
            </p>
            <p className="font-medium text-gray-800">{evaluationDate}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 flex items-center">
              <Award className="h-4 w-4 mr-1" />
              Total Score
            </p>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-lg font-bold text-lg ${getGradeColor(totalScore)} border`}>
                {totalScore}%
              </div>
              <div className={`px-3 py-1 rounded-lg font-bold text-lg ${getGradeColor(totalScore)} border`}>
                {getGradeLetter(totalScore)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              totalScore >= 90 ? 'bg-green-600' :
              totalScore >= 80 ? 'bg-blue-600' :
              totalScore >= 70 ? 'bg-yellow-500' :
              'bg-red-600'
            }`} 
            style={{ width: `${totalScore}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </motion.div>
  );
}