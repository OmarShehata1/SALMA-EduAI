import { FileText, Calendar, Clock, TrendingUp, Award, AlertTriangle } from "lucide-react";

export default function ExamsOverview({ onExamSelect }) {
  // Mock data for exams
  const exams = [
    {
      id: 1,
      title: "Advanced Calculus Midterm",
      course: "Advanced Mathematics",
      instructor: "Dr. Sarah Wilson",
      date: "2024-03-15",
      totalGrade: 87,
      maxGrade: 100,
      status: "completed",
      questions: [
        { number: 1, grade: 18, maxGrade: 20, aiExplanation: "Excellent understanding of derivative concepts. Minor calculation error in step 3." },
        { number: 2, grade: 15, maxGrade: 20, aiExplanation: "Good approach to integration by parts. Could improve setup clarity." },
        { number: 3, grade: 19, maxGrade: 20, aiExplanation: "Perfect application of chain rule. Well-organized solution." },
        { number: 4, grade: 17, maxGrade: 20, aiExplanation: "Correct method for optimization problem. Small error in final calculation." },
        { number: 5, grade: 18, maxGrade: 20, aiExplanation: "Strong understanding of limits. Clear step-by-step approach." }
      ]
    },
    {
      id: 2,
      title: "Data Structures Quiz",
      course: "Computer Science Fundamentals",
      instructor: "Prof. Ahmed Hassan",
      date: "2024-03-10",
      totalGrade: 92,
      maxGrade: 100,
      status: "completed",
      questions: [
        { number: 1, grade: 19, maxGrade: 20, aiExplanation: "Excellent implementation of binary search tree. Clean and efficient code." },
        { number: 2, grade: 18, maxGrade: 20, aiExplanation: "Good understanding of hash tables. Minor optimization possible." },
        { number: 3, grade: 20, maxGrade: 20, aiExplanation: "Perfect sorting algorithm implementation. Optimal time complexity." },
        { number: 4, grade: 17, maxGrade: 20, aiExplanation: "Correct graph traversal approach. Could improve space complexity." },
        { number: 5, grade: 18, maxGrade: 20, aiExplanation: "Strong grasp of dynamic programming. Well-structured solution." }
      ]
    },
    {
      id: 3,
      title: "Signal Processing Lab",
      course: "Digital Signal Processing",
      instructor: "Dr. Maria Rodriguez",
      date: "2024-03-08",
      totalGrade: 78,
      maxGrade: 100,
      status: "completed",
      questions: [
        { number: 1, grade: 16, maxGrade: 20, aiExplanation: "Good understanding of FFT concepts. Some confusion in frequency domain analysis." },
        { number: 2, grade: 14, maxGrade: 20, aiExplanation: "Basic filter design is correct. Missing key considerations for practical implementation." },
        { number: 3, grade: 18, maxGrade: 20, aiExplanation: "Excellent MATLAB implementation. Clear visualization of results." },
        { number: 4, grade: 15, maxGrade: 20, aiExplanation: "Correct sampling theorem application. Could elaborate on aliasing effects." },
        { number: 5, grade: 15, maxGrade: 20, aiExplanation: "Adequate convolution analysis. Missing edge case considerations." }
      ]
    },
    {
      id: 4,
      title: "Machine Learning Assignment",
      course: "Machine Learning",
      instructor: "Prof. David Chen",
      date: "2024-03-20",
      totalGrade: 0,
      maxGrade: 100,
      status: "upcoming",
      questions: []
    }
  ];

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

  const completedExams = exams.filter(exam => exam.status === "completed");
  const upcomingExams = exams.filter(exam => exam.status === "upcoming");
  const averageGrade = completedExams.length > 0 
    ? Math.round(completedExams.reduce((sum, exam) => sum + (exam.totalGrade / exam.maxGrade) * 100, 0) / completedExams.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Exams Overview</h1>
            <p className="text-gray-600">Track your exam performance and grades</p>
          </div>
        </div>
        
        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-100">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-sky-600" />
              <div>
                <p className="text-sm text-gray-600">Total Exams</p>
                <p className="text-xl font-bold text-sky-700">{exams.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Average Grade</p>
                <p className="text-xl font-bold text-emerald-700">{averageGrade}%</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-indigo-700">{completedExams.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-xl font-bold text-amber-700">{upcomingExams.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Exams */}
      {upcomingExams.length > 0 && (
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>Upcoming Exams</span>
          </h2>
          <div className="space-y-3">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.course} • {exam.instructor}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700">{exam.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Exams */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>Completed Exams</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedExams.map((exam) => (
            <div 
              key={exam.id} 
              className={`bg-gradient-to-r ${getGradeBg(exam.totalGrade, exam.maxGrade)} p-6 rounded-2xl border cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
              onClick={() => onExamSelect(exam)}
            >
              {/* Exam Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{exam.title}</h3>
                  <p className="text-sm text-gray-600">{exam.course}</p>
                  <p className="text-xs text-gray-500">{exam.instructor}</p>
                </div>
                <div className={`text-right ${getGradeColor(exam.totalGrade, exam.maxGrade)}`}>
                  <div className="text-2xl font-bold">{exam.totalGrade}</div>
                  <div className="text-sm">/ {exam.maxGrade}</div>
                </div>
              </div>

              {/* Grade Bar */}
              <div className="mb-4">
                <div className="bg-white/60 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-500"
                    style={{ width: `${(exam.totalGrade / exam.maxGrade) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Grade: {Math.round((exam.totalGrade / exam.maxGrade) * 100)}%</span>
                  <span>{exam.date}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{exam.questions.length} Questions</span>
                  </div>
                </div>
                <button className="bg-white/60 hover:bg-white/80 text-sky-700 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 border border-sky-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
