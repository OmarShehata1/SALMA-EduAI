// StudentHeader.jsx - Header component for the student grades page
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function StudentHeader({ studentName, studentId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-1 flex items-center">
            <GraduationCap className="h-8 w-8 mr-2" />
            My Academic Performance
          </h1>
          <p className="text-gray-600">
            Review your grades and feedback from all your teachers in one place.
          </p>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mt-4 md:mt-0 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100"
        >
          <p className="text-sm text-gray-600">Student</p>
          <p className="font-medium text-blue-800">{studentName}</p>
          <p className="text-xs text-gray-500">ID: {studentId}</p>
        </motion.div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Select a teacher from the list to see your grades and detailed feedback on each question.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}