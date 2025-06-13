import { useState } from "react";
import { FileText, Upload, Clock, CheckCircle, Users, TrendingUp } from "lucide-react";

export default function CorrectExam() {
  const [submissions] = useState([
    {
      id: 1,
      examName: "Midterm Exam - CS101",
      submissionDate: "2024-12-08",
      totalSubmissions: 45,
      corrected: 45,
      pending: 0,
      averageGrade: 87.5,
      status: "completed",
    },
    {
      id: 2,
      examName: "Final Exam - Database Systems",
      submissionDate: "2024-12-10",
      totalSubmissions: 42,
      corrected: 35,
      pending: 7,
      averageGrade: 82.3,
      status: "in_progress",
    },
    {
      id: 3,
      examName: "Quiz - Data Structures",
      submissionDate: "2024-12-12",
      totalSubmissions: 38,
      corrected: 0,
      pending: 38,
      averageGrade: 0,
      status: "pending",
    },
  ]);

  const handleUploadSubmissions = () => {
    // Handle file upload logic
    console.log("Upload submissions");
  };

  const handleStartCorrection = (examId) => {
    // Handle start correction logic
    console.log("Start correction for exam:", examId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <Upload className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const totalSubmissions = submissions.reduce((sum, exam) => sum + exam.totalSubmissions, 0);
  const totalCorrected = submissions.reduce((sum, exam) => sum + exam.corrected, 0);
  const totalPending = submissions.reduce((sum, exam) => sum + exam.pending, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          Exam Correction
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload and manage exam submissions with AI-powered grading assistance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalSubmissions}</div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalCorrected}</div>
              <div className="text-sm text-gray-600">Corrected</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalPending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {totalCorrected > 0 ? 
                  (submissions
                    .filter(exam => exam.corrected > 0)
                    .reduce((sum, exam) => sum + exam.averageGrade, 0) / 
                   submissions.filter(exam => exam.corrected > 0).length
                  ).toFixed(1) : 0}%
              </div>
              <div className="text-sm text-gray-600">Avg Grade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload New Submissions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg p-6">
        <div className="text-center space-y-4">
          <div className="bg-gradient-to-r from-sky-400 to-indigo-500 p-4 rounded-2xl w-fit mx-auto">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Upload New Submissions</h3>
            <p className="text-gray-600">Upload scanned exam papers for AI-powered correction</p>
          </div>
          <button
            onClick={handleUploadSubmissions}
            className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Files</span>
          </button>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg">
        <div className="p-6 border-b border-sky-200">
          <h2 className="text-xl font-bold text-gray-800">Exam Submissions</h2>
          <p className="text-gray-600">Manage and track correction progress</p>
        </div>
        
        <div className="p-6 space-y-4">
          {submissions.map((exam) => (
            <div
              key={exam.id}
              className="bg-white/60 backdrop-blur-sm rounded-xl border border-sky-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-sky-400 to-indigo-500 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{exam.examName}</h3>
                    <p className="text-sm text-gray-600">
                      Submitted: {new Date(exam.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      exam.status
                    )}`}
                  >
                    {getStatusIcon(exam.status)}
                    <span className="ml-1 capitalize">{exam.status.replace('_', ' ')}</span>
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{exam.totalSubmissions}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{exam.corrected}</div>
                  <div className="text-sm text-gray-600">Corrected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{exam.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {exam.corrected > 0 ? exam.averageGrade.toFixed(1) : '-'}%
                  </div>
                  <div className="text-sm text-gray-600">Average</div>
                </div>
              </div>

              {exam.pending > 0 && (
                <div className="mt-4 pt-4 border-t border-sky-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Progress: {exam.corrected}/{exam.totalSubmissions} completed
                    </div>
                    <button
                      onClick={() => handleStartCorrection(exam.id)}
                      className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      {exam.status === "pending" ? (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Start Correction</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          <span>Continue</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(exam.corrected / exam.totalSubmissions) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
