// student detail component for displaying individual student grades
import React from "react";

export function StudentDetail({ selectedStudent, selectedExam }) {
  const getGradeColor = (grade, maxGrade) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 70)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (percentage >= 60)
      return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getOverallGradeColor = (percentage) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-100";
    if (percentage >= 60) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Student Details</h2>
          {selectedExam && (
            <p className="text-sm text-blue-600 mt-1">
              📄 Exam: <span className="font-medium">{selectedExam.name}</span>
            </p>
          )}
        </div>
        <div className="text-sm text-gray-500">
          File: {selectedStudent.fileName}
        </div>
      </div>

      {/* Student Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {selectedStudent.studentName}
            </div>
            <div className="text-sm text-gray-500">Student Name</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {selectedStudent.totalGrade}/{selectedStudent.maxTotalGrade}
            </div>
            <div className="text-sm text-gray-500">Total Score</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold px-3 py-1 rounded-full ${getOverallGradeColor(
                parseFloat(selectedStudent.percentage)
              )}`}
            >
              {selectedStudent.percentage}%
            </div>
            <div className="text-sm text-gray-500">Percentage</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                getOverallGradeColor(
                  parseFloat(selectedStudent.percentage)
                ).split(" ")[0]
              }`}
            >
              {parseFloat(selectedStudent.percentage) >= 90
                ? "A"
                : parseFloat(selectedStudent.percentage) >= 80
                ? "B"
                : parseFloat(selectedStudent.percentage) >= 70
                ? "C"
                : parseFloat(selectedStudent.percentage) >= 60
                ? "D"
                : "F"}
            </div>
            <div className="text-sm text-gray-500">Letter Grade</div>
          </div>
        </div>
      </div>

      {/* Question Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Question-by-Question Breakdown
        </h3>
        <div className="space-y-4">
          {selectedStudent.questions.map((question) => (
            <div
              key={question.questionId}
              className={`p-4 rounded-lg border-2 ${getGradeColor(
                question.grade,
                question.maxGrade
              )}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Question {question.questionNumber}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    {question.questionText}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold">
                    {question.grade}/{question.maxGrade}
                  </div>
                  <div className="text-sm text-gray-600">
                    {((question.grade / question.maxGrade) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="mt-3 p-3 bg-white bg-opacity-50 rounded border">
                <h5 className="text-sm font-medium text-gray-700 mb-1">
                  Grading Explanation:
                </h5>
                <p className="text-sm text-gray-600">
                  {question.explanation || "No explanation provided"}
                </p>
              </div>

              {/* Grade indicator */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500">
                    Grade:
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      getGradeColor(question.grade, question.maxGrade).split(
                        " "
                      )[0]
                    }`}
                  >
                    {question.grade >= question.maxGrade * 0.9
                      ? "Excellent"
                      : question.grade >= question.maxGrade * 0.8
                      ? "Good"
                      : question.grade >= question.maxGrade * 0.7
                      ? "Satisfactory"
                      : question.grade >= question.maxGrade * 0.6
                      ? "Needs Improvement"
                      : "Poor"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Performance Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-700">Questions Answered:</span>
            <span className="ml-2 font-medium text-blue-900">
              {selectedStudent.questions.length}
            </span>
          </div>
          <div>
            <span className="text-blue-700">Average Question Score:</span>
            <span className="ml-2 font-medium text-blue-900">
              {selectedStudent.questions.length > 0
                ? (
                    selectedStudent.questions.reduce(
                      (sum, q) => sum + (q.grade / q.maxGrade) * 100,
                      0
                    ) / selectedStudent.questions.length
                  ).toFixed(1)
                : 0}
              %
            </span>
          </div>
          <div>
            <span className="text-blue-700">Highest Question Score:</span>
            <span className="ml-2 font-medium text-blue-900">
              {selectedStudent.questions.length > 0
                ? Math.max(
                    ...selectedStudent.questions.map(
                      (q) => (q.grade / q.maxGrade) * 100
                    )
                  ).toFixed(1)
                : 0}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
