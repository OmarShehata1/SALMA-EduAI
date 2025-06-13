import { Users, BookOpen, Clock, Star } from "lucide-react";

export default function TeacherList() {
  // Mock data for teachers/courses
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      course: "Advanced Mathematics",
      department: "Mathematics",
      students: 45,
      rating: 4.8,
      nextClass: "Today, 2:00 PM",
      avatar: "https://via.placeholder.com/60?text=SW",
      subjects: ["Calculus", "Linear Algebra", "Statistics"]
    },
    {
      id: 2,
      name: "Prof. Ahmed Hassan",
      course: "Computer Science Fundamentals",
      department: "Computer Science",
      students: 38,
      rating: 4.9,
      nextClass: "Tomorrow, 10:00 AM",
      avatar: "https://via.placeholder.com/60?text=AH",
      subjects: ["Programming", "Data Structures", "Algorithms"]
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      course: "Digital Signal Processing",
      department: "Electrical Engineering",
      students: 32,
      rating: 4.7,
      nextClass: "Friday, 1:00 PM",
      avatar: "https://via.placeholder.com/60?text=MR",
      subjects: ["Signal Processing", "Digital Systems", "MATLAB"]
    },
    {
      id: 4,
      name: "Prof. David Chen",
      course: "Machine Learning",
      department: "Computer Science",
      students: 52,
      rating: 4.9,
      nextClass: "Monday, 9:00 AM",
      avatar: "https://via.placeholder.com/60?text=DC",
      subjects: ["ML Algorithms", "Neural Networks", "Python"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Teachers</h1>
            <p className="text-gray-600">View all your enrolled courses and instructors</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-100">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-sky-600" />
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-xl font-bold text-sky-700">{teachers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-xl font-bold text-emerald-700">4.8</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Next Class</p>
                <p className="text-xl font-bold text-amber-700">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            {/* Teacher Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-sky-200"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-100 text-emerald-600 rounded-full p-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{teacher.name}</h3>
                <p className="text-sky-600 font-medium">{teacher.course}</p>
                <p className="text-sm text-gray-500">{teacher.department}</p>
              </div>
              <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 rounded-full border border-amber-100">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-sm font-medium text-amber-700">{teacher.rating}</span>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Students Enrolled:</span>
                <span className="font-medium text-gray-800">{teacher.students}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Next Class:</span>
                <span className="font-medium text-sky-600">{teacher.nextClass}</span>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Topics Covered:</p>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 px-3 py-1 rounded-full text-xs font-medium border border-sky-100"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:from-sky-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                View Course Details
              </button>
              <button className="bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 py-2 px-4 rounded-xl font-medium hover:from-sky-100 hover:to-indigo-100 transition-all duration-300 border border-sky-200">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
