import { useState } from "react";
import { Users, Eye, BookOpen, TrendingUp, Calendar } from "lucide-react";

export default function GroupOverview({ onGroupSelect }) {
  const [groups] = useState([
    {
      id: 1,
      name: "Computer Science 101",
      code: "CS101",
      semester: "Fall 2024",
      studentCount: 45,
      examCount: 3,
      averageGrade: 87.5,
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      name: "Data Structures",
      code: "CS201",
      semester: "Fall 2024",
      studentCount: 38,
      examCount: 2,
      averageGrade: 82.3,
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS301",
      semester: "Fall 2024",
      studentCount: 42,
      examCount: 4,
      averageGrade: 89.1,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 4,
      name: "Software Engineering",
      code: "CS401",
      semester: "Fall 2024",
      studentCount: 35,
      examCount: 3,
      averageGrade: 85.7,
      color: "from-orange-400 to-red-500",
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          Your Classes Overview
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your groups, track student progress, and monitor exam performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-3 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {groups.reduce((total, group) => total + group.studentCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-3 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{groups.length}</div>
              <div className="text-sm text-gray-600">Active Classes</div>
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
                {(
                  groups.reduce((total, group) => total + group.averageGrade, 0) /
                  groups.length
                ).toFixed(1)}
                %
              </div>
              <div className="text-sm text-gray-600">Avg Grade</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {groups.reduce((total, group) => total + group.examCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </div>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]"
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${group.color} p-6 text-white relative`}>
              <div className="absolute top-4 right-4 opacity-20">
                <BookOpen className="w-12 h-12" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1">{group.name}</h3>
                <p className="text-sm opacity-90">
                  {group.code} • {group.semester}
                </p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {group.studentCount}
                  </div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {group.examCount}
                  </div>
                  <div className="text-sm text-gray-600">Exams</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Average Grade</span>
                  <span className="text-lg font-bold text-gray-800">
                    {group.averageGrade}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${group.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${group.averageGrade}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => onGroupSelect(group)}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:from-sky-600 group-hover:to-indigo-700"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
