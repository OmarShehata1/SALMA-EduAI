import { ArrowLeft, FileText, Calendar, User, MessageSquare, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function ExamDetails({ exam, onBack, onAppeal }) {
  if (!exam) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No exam selected</p>
      </div>
    );
  }

  const getGradeColor = (grade, maxGrade) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getGradeBg = (grade, maxGrade) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return "from-emerald-50 to-green-50 border-emerald-100";
    if (percentage >= 80) return "from-blue-50 to-sky-50 border-blue-100";
    if (percentage >= 70) return "from-amber-50 to-orange-50 border-amber-100";
    return "from-red-50 to-rose-50 border-red-100";
  };

  const getQuestionGradeBg = (grade, maxGrade) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return "bg-emerald-100 text-emerald-700";
    if (percentage >= 80) return "bg-blue-100 text-blue-700";
    if (percentage >= 70) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 p-3 rounded-xl hover:from-sky-100 hover:to-indigo-100 transition-all duration-300 border border-sky-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
              <p className="text-gray-600">{exam.course}</p>
            </div>
          </div>
          <div className={`text-right ${getGradeColor(exam.totalGrade, exam.maxGrade)}`}>
            <div className="text-3xl font-bold">{exam.totalGrade}</div>
            <div className="text-sm">/ {exam.maxGrade}</div>
          </div>
        </div>

        {/* Exam Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-100">
            <User className="w-5 h-5 text-sky-600" />
            <div>
              <p className="text-sm text-gray-600">Instructor</p>
              <p className="font-medium text-gray-800">{exam.instructor}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium text-gray-800">{exam.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600">Grade</p>
              <p className="font-medium text-gray-800">{Math.round((exam.totalGrade / exam.maxGrade) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Breakdown */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <Info className="w-5 h-5 text-sky-600" />
          <span>Question-by-Question Breakdown</span>
        </h2>

        <div className="space-y-4">
          {exam.questions.map((question) => (
            <div key={question.number} className={`bg-gradient-to-r ${getGradeBg(question.grade, question.maxGrade)} p-6 rounded-2xl border`}>
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/80 text-gray-700 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg">
                    Q{question.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Question {question.number}</h3>
                    <p className="text-sm text-gray-600">Points: {question.maxGrade}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-4 py-2 rounded-xl font-bold text-lg ${getQuestionGradeBg(question.grade, question.maxGrade)}`}>
                    {question.grade} / {question.maxGrade}
                  </div>
                  <button
                    onClick={() => onAppeal(exam.id, question.number)}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-4 py-2 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 border border-amber-200 flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">Appeal</span>
                  </button>
                </div>
              </div>

              {/* AI Explanation */}
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/40">
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-r from-sky-100 to-indigo-100 text-sky-700 p-2 rounded-lg">
                    <Info className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-2">AI Feedback</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{question.aiExplanation}</p>
                  </div>
                </div>
              </div>

              {/* Grade Bar */}
              <div className="mt-4">
                <div className="bg-white/40 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-500"
                    style={{ width: `${(question.grade / question.maxGrade) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Score: {Math.round((question.grade / question.maxGrade) * 100)}%</span>
                  <span>{question.grade} points earned</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-100 text-center">
            <div className="text-2xl font-bold text-sky-700">{exam.questions.length}</div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100 text-center">
            <div className="text-2xl font-bold text-emerald-700">
              {exam.questions.filter(q => (q.grade / q.maxGrade) >= 0.9).length}
            </div>
            <div className="text-sm text-gray-600">Excellent (90%+)</div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 text-center">
            <div className="text-2xl font-bold text-amber-700">
              {exam.questions.filter(q => (q.grade / q.maxGrade) >= 0.8 && (q.grade / q.maxGrade) < 0.9).length}
            </div>
            <div className="text-sm text-gray-600">Good (80-89%)</div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-xl border border-red-100 text-center">
            <div className="text-2xl font-bold text-red-700">
              {exam.questions.filter(q => (q.grade / q.maxGrade) < 0.7).length}
            </div>
            <div className="text-sm text-gray-600">Needs Review (70%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
