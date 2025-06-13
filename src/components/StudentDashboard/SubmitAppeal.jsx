import { useState } from "react";
import { ArrowLeft, MessageSquare, Send, AlertTriangle, CheckCircle, FileText, User } from "lucide-react";

export default function SubmitAppeal({ preSelectedExam, onBack }) {
  const [selectedExam, setSelectedExam] = useState(preSelectedExam || null);
  const [selectedQuestion, setSelectedQuestion] = useState(preSelectedExam?.appealQuestionNumber || "");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock data for exams (in a real app, this would come from props or API)
  const availableExams = [
    {
      id: 1,
      title: "Advanced Calculus Midterm",
      course: "Advanced Mathematics",
      instructor: "Dr. Sarah Wilson",
      date: "2024-03-15",
      totalQuestions: 5
    },
    {
      id: 2,
      title: "Data Structures Quiz",
      course: "Computer Science Fundamentals",
      instructor: "Prof. Ahmed Hassan",
      date: "2024-03-10",
      totalQuestions: 5
    },
    {
      id: 3,
      title: "Signal Processing Lab",
      course: "Digital Signal Processing",
      instructor: "Dr. Maria Rodriguez",
      date: "2024-03-08",
      totalQuestions: 5
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExam || !selectedQuestion || !reason.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-sky-100 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Appeal Submitted Successfully!</h1>
            <p className="text-gray-600">Your appeal has been sent to the instructor for review.</p>
          </div>
          
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-6 rounded-xl border border-sky-100 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Appeal Details</h3>
            <div className="text-left space-y-2 text-sm">
              <p><span className="font-medium">Exam:</span> {selectedExam.title}</p>
              <p><span className="font-medium">Question:</span> #{selectedQuestion}</p>
              <p><span className="font-medium">Instructor:</span> {selectedExam.instructor}</p>
              <p><span className="font-medium">Submitted:</span> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-sky-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
            >
              Back to Exams
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedExam(null);
                setSelectedQuestion("");
                setReason("");
              }}
              className="bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 px-6 py-3 rounded-xl font-medium hover:from-sky-100 hover:to-indigo-100 transition-all duration-300 border border-sky-200"
            >
              Submit Another Appeal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 p-3 rounded-xl hover:from-sky-100 hover:to-indigo-100 transition-all duration-300 border border-sky-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-3 rounded-xl shadow-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Submit Appeal</h1>
            <p className="text-gray-600">Contest a grade you believe is incorrect</p>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 mb-1">Appeal Guidelines</p>
              <p className="text-amber-700">
                Please provide a clear and detailed explanation for your appeal. 
                Appeals are reviewed by instructors and may take 3-5 business days for response.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appeal Form */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Exam Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Exam <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {availableExams.map((exam) => (
                <div
                  key={exam.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedExam?.id === exam.id
                      ? "border-sky-300 bg-gradient-to-r from-sky-50 to-indigo-50"
                      : "border-gray-200 bg-white/60 hover:border-sky-200 hover:bg-sky-50/50"
                  }`}
                  onClick={() => {
                    setSelectedExam(exam);
                    setSelectedQuestion(""); // Reset question selection
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      selectedExam?.id === exam.id 
                        ? "border-sky-500 bg-sky-500" 
                        : "border-gray-300"
                    }`}>
                      {selectedExam?.id === exam.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <FileText className="w-4 h-4 text-sky-600" />
                        <h3 className="font-bold text-gray-800">{exam.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{exam.course}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{exam.instructor}</span>
                        </span>
                        <span>{exam.date}</span>
                        <span>{exam.totalQuestions} questions</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question Selection */}
          {selectedExam && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Question Number <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: selectedExam.totalQuestions }, (_, i) => i + 1).map((questionNum) => (
                  <button
                    key={questionNum}
                    type="button"
                    onClick={() => setSelectedQuestion(questionNum.toString())}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-300 ${
                      selectedQuestion === questionNum.toString()
                        ? "border-sky-300 bg-gradient-to-r from-sky-500 to-indigo-600 text-white"
                        : "border-gray-200 bg-white/60 text-gray-700 hover:border-sky-200 hover:bg-sky-50"
                    }`}
                  >
                    Q{questionNum}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-3">
              Reason for Appeal <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a detailed explanation of why you believe this grade should be reconsidered. Include specific details about your answer and why you think it deserves more points..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none transition-all duration-300"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">Be specific and professional in your explanation</p>
              <p className="text-xs text-gray-500">{reason.length} characters</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!selectedExam || !selectedQuestion || !reason.trim() || isSubmitting}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                !selectedExam || !selectedQuestion || !reason.trim() || isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Appeal</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 py-3 px-6 rounded-xl font-medium hover:from-sky-100 hover:to-indigo-100 transition-all duration-300 border border-sky-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
