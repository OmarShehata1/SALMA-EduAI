import { useState } from "react";
import { MessageSquare, User, Calendar, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";

export default function Appeals() {
  const [appeals, setAppeals] = useState([
    {
      id: 1,
      studentName: "Ahmed Hassan",
      studentEmail: "ahmed.hassan@university.edu",
      examName: "Midterm Exam",
      questionNumber: 2,
      originalGrade: 8,
      maxGrade: 10,
      reason: "I believe my answer about inheritance in OOP was more comprehensive than graded. I included examples of parent-child relationships and mentioned code reusability which wasn't reflected in the scoring.",
      submittedAt: "2024-12-08T10:30:00Z",
      status: "pending",
      studentAnswer: "Inheritance allows a class to inherit properties and methods from another class. It enables code reusability and establishes parent-child relationships between classes.",
      originalFeedback: "Good understanding shown, but could have included more details about parent-child relationships and code reusability.",
    },
    {
      id: 2,
      studentName: "Sarah Mitchell",
      studentEmail: "sarah.mitchell@university.edu",
      examName: "Final Exam",
      questionNumber: 1,
      originalGrade: 6,
      maxGrade: 10,
      reason: "I think my explanation of MVC architecture was complete and covered all the main components. The grading seems too harsh given that I mentioned Model, View, and Controller clearly.",
      submittedAt: "2024-12-07T14:15:00Z",
      status: "under_review",
      studentAnswer: "MVC separates application into Model, View, and Controller components. Model handles data, View handles presentation, Controller handles user input.",
      originalFeedback: "Good basic understanding, but answer lacks detail about the responsibilities of each component and their interactions.",
    },
    {
      id: 3,
      studentName: "Omar Al-Rashid",
      studentEmail: "omar.alrashid@university.edu",
      examName: "Midterm Exam",
      questionNumber: 1,
      originalGrade: 9,
      maxGrade: 10,
      reason: "I provided the exact correct answer for time complexity. I don't understand why I lost a point.",
      submittedAt: "2024-12-06T09:45:00Z",
      status: "approved",
      studentAnswer: "O(log n)",
      originalFeedback: "Correct answer, minor formatting issue.",
      resolution: "Grade updated to 10/10. Formatting was indeed correct.",
    },
  ]);

  const handleReEvaluate = (appealId) => {
    setAppeals(appeals.map(appeal => 
      appeal.id === appealId 
        ? { ...appeal, status: "under_review" }
        : appeal
    ));
  };

  const handleApprove = (appealId) => {
    setAppeals(appeals.map(appeal => 
      appeal.id === appealId 
        ? { 
            ...appeal, 
            status: "approved",
            resolution: "Appeal approved. Grade has been updated."
          }
        : appeal
    ));
  };

  const handleReject = (appealId) => {
    setAppeals(appeals.map(appeal => 
      appeal.id === appealId 
        ? { 
            ...appeal, 
            status: "rejected",
            resolution: "Appeal reviewed. Original grade maintained."
          }
        : appeal
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "under_review":
        return <RefreshCw className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const pendingAppeals = appeals.filter(appeal => appeal.status === "pending").length;
  const underReviewAppeals = appeals.filter(appeal => appeal.status === "under_review").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          Student Appeals
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Review and manage grade appeals submitted by students
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{pendingAppeals}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-3 rounded-xl">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{underReviewAppeals}</div>
              <div className="text-sm text-gray-600">Under Review</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {appeals.filter(appeal => appeal.status === "approved").length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-red-400 to-pink-500 p-3 rounded-xl">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {appeals.filter(appeal => appeal.status === "rejected").length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Appeals List */}
      <div className="space-y-6">
        {appeals.map((appeal) => (
          <div
            key={appeal.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg overflow-hidden"
          >
            {/* Appeal Header */}
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-6 border-b border-sky-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-sky-400 to-indigo-500 p-3 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {appeal.examName} - Question {appeal.questionNumber}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{appeal.studentName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appeal.submittedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Grade: {appeal.originalGrade}/{appeal.maxGrade}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      appeal.status
                    )}`}
                  >
                    {getStatusIcon(appeal.status)}
                    <span className="ml-1 capitalize">{appeal.status.replace('_', ' ')}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Appeal Content */}
            <div className="p-6 space-y-6">
              {/* Student's Reason */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Appeal Reason</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{appeal.reason}</p>
                </div>
              </div>

              {/* Student Answer & Original Feedback */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Student Answer</h4>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-gray-700">{appeal.studentAnswer}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Original Feedback</h4>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <p className="text-gray-700">{appeal.originalFeedback}</p>
                  </div>
                </div>
              </div>

              {/* Resolution (if any) */}
              {appeal.resolution && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Resolution</h4>
                  <div className={`rounded-lg p-4 border ${
                    appeal.status === "approved" 
                      ? "bg-green-50 border-green-200" 
                      : "bg-red-50 border-red-200"
                  }`}>
                    <p className="text-gray-700">{appeal.resolution}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {(appeal.status === "pending" || appeal.status === "under_review") && (
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-sky-200">
                  {appeal.status === "pending" && (
                    <button
                      onClick={() => handleReEvaluate(appeal.id)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Start Review</span>
                    </button>
                  )}
                  {appeal.status === "under_review" && (
                    <>
                      <button
                        onClick={() => handleReject(appeal.id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleApprove(appeal.id)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {appeals.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appeals</h3>
          <p className="text-gray-500">No student appeals have been submitted yet.</p>
        </div>
      )}
    </div>
  );
}
