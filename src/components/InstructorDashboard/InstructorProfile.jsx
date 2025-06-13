import { useState } from "react";
import { User, Mail, Phone, MapPin, BookOpen, Save, Edit2, Camera } from "lucide-react";

export default function InstructorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    office: "Room 301, Computer Science Building",
    bio: "Professor of Computer Science with 15 years of experience in software engineering, database systems, and machine learning. Passionate about innovative teaching methods and student success.",
    specializations: ["Software Engineering", "Database Systems", "Machine Learning", "Data Structures"],
    education: [
      "Ph.D. in Computer Science - Stanford University (2008)",
      "M.S. in Computer Science - MIT (2004)",
      "B.S. in Computer Science - UC Berkeley (2002)"
    ],
    courses: [
      "CS101 - Introduction to Computer Science",
      "CS201 - Data Structures and Algorithms",
      "CS301 - Database Systems",
      "CS401 - Software Engineering"
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log("Profile saved:", profile);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          Instructor Profile
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your personal information and academic profile
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg p-6 space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-sky-200 hover:bg-sky-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-4">{profile.name}</h2>
              <p className="text-gray-600">{profile.department}</p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
              
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profile.email}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profile.phone}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Office Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.office}
                    onChange={(e) => handleInputChange("office", e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profile.office}</div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Biography</h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 resize-none"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Specializations */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {profile.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-sky-100 to-indigo-100 text-sky-700 rounded-full text-sm font-medium border border-sky-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Education</h3>
            <div className="space-y-3">
              {profile.education.map((edu, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  <span className="text-gray-700">{edu}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Courses */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              <BookOpen className="w-5 h-5 inline mr-2" />
              Current Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-sky-50 to-indigo-50 p-4 rounded-xl border border-sky-200"
                >
                  <div className="font-semibold text-gray-800">{course.split(' - ')[0]}</div>
                  <div className="text-sm text-gray-600">{course.split(' - ')[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
