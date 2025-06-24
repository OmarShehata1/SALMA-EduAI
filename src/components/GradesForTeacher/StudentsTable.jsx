// student tables component
import React from "react";

export function StudentsTable({ studentsData, handleStudentClick, selectedExam }) {
  const getGradeColor = (percentage) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-blue-600 bg-blue-50";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
    if (percentage >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Grading Results</h2>
        {selectedExam && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 px-3 py-1 rounded-lg">
            <p className="text-sm text-purple-700">
              📊 <span className="font-medium">{selectedExam.name}</span>
            </p>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Student
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                File Name
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">
                Score
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">
                Percentage
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">
                Grade
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr
                key={student.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {student.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600 truncate max-w-xs block">
                    {student.fileName}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="font-medium text-gray-900">
                    {student.totalGrade}/{student.maxTotalGrade}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(
                      parseFloat(student.percentage)
                    )}`}
                  >
                    {student.percentage}%
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {/* Letter grade based on percentage */}
                  <span
                    className={`font-semibold ${
                      getGradeColor(parseFloat(student.percentage)).split(
                        " "
                      )[0]
                    }`}
                  >
                    {parseFloat(student.percentage) >= 90
                      ? "A"
                      : parseFloat(student.percentage) >= 80
                      ? "B"
                      : parseFloat(student.percentage) >= 70
                      ? "C"
                      : parseFloat(student.percentage) >= 60
                      ? "D"
                      : "F"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleStudentClick(student.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Summary Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Submissions:</span>
            <span className="ml-2 font-medium">{studentsData.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Average Score:</span>
            <span className="ml-2 font-medium">
              {(
                studentsData.reduce(
                  (sum, student) => sum + parseFloat(student.percentage),
                  0
                ) / studentsData.length
              ).toFixed(1)}
              %
            </span>
          </div>
          <div>
            <span className="text-gray-500">Highest Score:</span>
            <span className="ml-2 font-medium">
              {Math.max(
                ...studentsData.map((s) => parseFloat(s.percentage))
              ).toFixed(1)}
              %
            </span>
          </div>
          <div>
            <span className="text-gray-500">Lowest Score:</span>
            <span className="ml-2 font-medium">
              {Math.min(
                ...studentsData.map((s) => parseFloat(s.percentage))
              ).toFixed(1)}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
