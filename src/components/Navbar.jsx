import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  LogOut,
  User,
  Sparkles,
  BookOpen,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCreateExamOpen && !event.target.closest("#create-exam-dropdown")) {
        setIsCreateExamOpen(false);
      }
      if (isUserMenuOpen && !event.target.closest("#user-menu-dropdown")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreateExamOpen, isUserMenuOpen]);

  const toggleCreateExamDropdown = () => {
    setIsCreateExamOpen(!isCreateExamOpen);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenuDropdown = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsCreateExamOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-sky-100"
          : "bg-gradient-to-r from-sky-50/80 to-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Enhanced with modern design */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xl font-bold px-3 py-2 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <div className="ml-3">
              <span
                className="text-2xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                style={{ fontFamily: "Patrick Hand, cursive" }}
              >
                SALMA
              </span>
              <div className="text-xs text-gray-500 font-medium">
                AI Assessment
              </div>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-sky-600 hover:bg-sky-50 focus:outline-none transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-2 bg-white/60 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-sky-100">
              <NavLink to="/" label="Home" />
              
              {/* Role-based navigation */}
              {currentUser?.role === 'student' ? (
                <NavLink to="/student-dashboard" label="Dashboard" />
              ) : currentUser?.role === 'teacher' || currentUser?.role === 'instructor' ? (
                <>
                  <NavLink to="/dashboard" label="Dashboard" />
                  
                  {/* Create Exam Dropdown - Teachers only */}
                  <div className="relative" id="create-exam-dropdown">
                    <button
                      onClick={toggleCreateExamDropdown}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-gray-600 hover:text-sky-600 hover:bg-sky-50 flex items-center ${
                        isCreateExamOpen ? "bg-sky-50 text-sky-600" : ""
                      }`}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Create
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                          isCreateExamOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>                    {isCreateExamOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-sky-100 z-[110] overflow-hidden">
                        <div className="py-2">
                          <Link
                            to="/create"
                            onClick={() => setIsCreateExamOpen(false)}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-all duration-300"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                              <GraduationCap className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">Custom Exam</div>
                              <div className="text-xs text-gray-500">
                                Tailored questions
                              </div>
                            </div>
                          </Link>
                          <Link
                            to="/create/full"
                            onClick={() => setIsCreateExamOpen(false)}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-all duration-300"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">Full Exam</div>
                              <div className="text-xs text-gray-500">
                                Complete assessment
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <NavLink
                    to="/grades"
                    label="Analytics"
                    icon={<BarChart3 className="w-4 h-4" />}
                  />
                </>
              ) : !currentUser ? (
                <NavLink to="/student-dashboard" label="Student" />
              ) : null}
            </div>
          </div>

          {/* Auth Section - Right */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="relative" id="user-menu-dropdown">
                <button
                  onClick={toggleUserMenuDropdown}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-xl font-medium transition-all duration-300 text-gray-700 hover:bg-sky-50 hover:text-sky-600 ${
                    isUserMenuOpen ? "bg-sky-50 text-sky-600" : ""
                  }`}
                >
                  <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white p-2 rounded-lg">
                    <User className="w-4 h-4" />
                  </div>                  <div className="text-left">
                    <div className="text-sm font-medium">
                      {currentUser.name || currentUser.username || currentUser.email?.split('@')[0] || "User"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentUser.email}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-sky-100 z-[110] overflow-hidden">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-all duration-300"
                      >
                        <User className="w-4 h-4 mr-3 text-sky-500" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sky-600 hover:text-sky-700 font-medium rounded-xl hover:bg-sky-50 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-sky-100 overflow-hidden">
            <div className="py-4">
              <div className="space-y-2 px-4">                <MobileNavLink
                  to="/"
                  label="Home"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Role-based mobile navigation */}
                {currentUser?.role === 'student' ? (
                  <MobileNavLink
                    to="/student-dashboard"
                    label="Dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ) : currentUser?.role === 'teacher' || currentUser?.role === 'instructor' ? (
                  <>
                    <MobileNavLink
                      to="/dashboard"
                      label="Dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Mobile Create Exam Section - Teachers only */}
                    <div className="py-2">
                      <div className="font-medium text-gray-800 mb-3 px-2">
                        Create Exams
                      </div>
                      <div className="ml-4 space-y-2">
                        <MobileNavLink
                          to="/create"
                          label="Custom Exam"
                          onClick={() => setIsMobileMenuOpen(false)}
                          icon={<GraduationCap className="w-4 h-4" />}
                        />
                        <MobileNavLink
                          to="/create/full"
                          label="Full Exam"
                          onClick={() => setIsMobileMenuOpen(false)}
                          icon={<BookOpen className="w-4 h-4" />}
                        />
                      </div>
                    </div>

                    <MobileNavLink
                      to="/grades"
                      label="Analytics"
                      onClick={() => setIsMobileMenuOpen(false)}
                      icon={<BarChart3 className="w-4 h-4" />}
                    />
                  </>
                ) : (
                  // Show general navigation for non-authenticated users
                  !currentUser && (
                    <MobileNavLink
                      to="/login"
                      label="Get Started"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  )
                )}
              </div>

              <div className="border-t border-sky-100 mt-4 pt-4 px-4">
                {currentUser ? (
                  <div className="space-y-2">                    <div className="px-2 py-2">
                      <div className="font-medium text-gray-800">
                        {currentUser.name || currentUser.username || currentUser.email?.split('@')[0] || "User"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {currentUser.email}
                      </div>
                    </div>
                    <MobileNavLink
                      to="/profile"
                      label="Profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      icon={<User className="w-4 h-4" />}
                    />
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-2 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <MobileNavLink
                      to="/login"
                      label="Sign In"
                      onClick={() => setIsMobileMenuOpen(false)}
                      icon={<LogIn className="w-4 h-4" />}
                    />
                    <MobileNavLink
                      to="/register"
                      label="Get Started"
                      onClick={() => setIsMobileMenuOpen(false)}
                      icon={<UserPlus className="w-4 h-4" />}
                      isButton
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const NavLink = ({ to, label, icon, activePaths = [] }) => {
  const location = useLocation();

  const isActive =
    location.pathname === to ||
    activePaths.some((path) => location.pathname.startsWith(path));

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? "bg-sky-100 text-sky-600 shadow-md"
          : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label, onClick, icon, isButton = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-2 py-3 rounded-xl font-medium transition-all duration-300 ${
        isButton
          ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
          : isActive
          ? "bg-sky-100 text-sky-600"
          : "text-gray-800 hover:bg-sky-50 hover:text-sky-600"
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {label}
    </Link>
  );
};
