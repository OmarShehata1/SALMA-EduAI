import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { navigateBasedOnRole } from "../../utils/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { register } = useAuth();

  const { name, email, password, confirmPassword, role } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep1 = () => {
    if (!name.trim()) {
      setError("Full name is required");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!role) {
      setError("Please select whether you are a Teacher or Student");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    setError("");
    if (validateStep1()) {
      setStep(2);
    }
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateStep2()) {
      return;
    }

    try {
      setIsLoading(true);

      const result = await register(name, email, password, role);

      if (!result.success) {
        throw new Error(result.message || "Registration failed");
      }

      setStep(3);

      // After successful registration, automatically navigate to appropriate dashboard
      setTimeout(() => {
        if (result.redirectTo) {
          navigate(result.redirectTo);
        } else {
          // Fallback to role-based navigation
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            navigateBasedOnRole(user, navigate);
          } else {
            // Fallback if user data is not available
            navigate("/login");
          }
        }
      }, 2000);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: "", color: "" };

    if (password.length < 6) {
      return { strength: 1, text: "Weak", color: "bg-red-400" };
    } else if (password.length < 10) {
      return { strength: 2, text: "Medium", color: "bg-yellow-400" };
    } else {
      return { strength: 3, text: "Strong", color: "bg-emerald-400" };
    }
  };

  const passwordStrength = getPasswordStrength();

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700"
        >
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-sky-400" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-sky-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      {/* Role Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          I am a
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "teacher" })}
            className={`relative rounded-xl border-2 ${
              role === "teacher"
                ? "bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-400 ring-2 ring-sky-300 shadow-lg"
                : "border-sky-200 bg-white/40 hover:bg-white/60 hover:border-sky-300"
            } p-6 flex flex-col items-center transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm`}
          >
            <div
              className={`rounded-full p-2 mb-3 ${
                role === "teacher"
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
                  : "bg-sky-100 text-sky-600"
              }`}
            >
              <BookOpen className="h-8 w-8" />
            </div>
            <span
              className={`text-lg font-semibold ${
                role === "teacher" ? "text-sky-700" : "text-gray-700"
              }`}
            >
              Teacher
            </span>
            <span className="text-sm text-gray-500 mt-1 text-center">
              Create and grade exams
            </span>
            {role === "teacher" && (
              <div className="absolute top-3 right-3">
                <CheckCircle className="h-6 w-6 text-sky-600" />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "student" })}
            className={`relative rounded-xl border-2 ${
              role === "student"
                ? "bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-400 ring-2 ring-sky-300 shadow-lg"
                : "border-sky-200 bg-white/40 hover:bg-white/60 hover:border-sky-300"
            } p-6 flex flex-col items-center transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm`}
          >
            <div
              className={`rounded-full p-4 mb-3 ${
                role === "student"
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
                  : "bg-sky-100 text-sky-600"
              }`}
            >
              <GraduationCap className="h-8 w-8" />
            </div>
            <span
              className={`text-lg font-semibold ${
                role === "student" ? "text-sky-700" : "text-gray-700"
              }`}
            >
              Student
            </span>
            <span className="text-sm text-gray-500 mt-1 text-center">
              Take exams and view results
            </span>
            {role === "student" && (
              <div className="absolute top-3 right-3">
                <CheckCircle className="h-6 w-6 text-sky-600" />
              </div>
            )}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <span>Continue</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-sky-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={password}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
            placeholder="Create a secure password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-sky-400 hover:text-sky-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Password strength:</span>
              <span
                className={`text-xs font-medium ${
                  passwordStrength.strength === 3
                    ? "text-emerald-600"
                    : passwordStrength.strength === 2
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {passwordStrength.text}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength * 33.3}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-gray-700"
        >
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Shield className="h-5 w-5 text-sky-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-sky-400 hover:text-sky-600 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
        )}
        {confirmPassword && password === confirmPassword && (
          <p className="text-xs text-emerald-600 mt-1 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Passwords match
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 flex items-center justify-center py-3 px-6 border-2 border-sky-200 bg-white/60 backdrop-blur-sm rounded-xl text-gray-700 font-semibold hover:bg-white/80 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300 hover:scale-[1.02] space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8 space-y-6">
      <div className="relative mx-auto flex items-center justify-center h-20 w-20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full animate-pulse"></div>
        <div className="relative bg-white rounded-full p-4 shadow-lg">
          <CheckCircle className="h-12 w-12 text-emerald-500" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
      </div>

      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-gray-800">Welcome to SALMA!</h3>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your account has been created successfully as a{" "}
          <span className="font-semibold text-sky-600 capitalize">{role}</span>.
        </p>
        <p className="text-sm text-gray-500">
          You'll be redirected to the login page shortly...
        </p>
      </div>

      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-6 space-y-4">
        <h4 className="font-semibold text-gray-800 flex items-center justify-center space-x-2">
          <Zap className="h-5 w-5 text-sky-500" />
          <span>What's Next?</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {role === "teacher" ? (
            <>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-medium text-gray-700">📚 Create Exams</div>
                <div className="text-gray-600">
                  Upload PDFs and generate questions
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-medium text-gray-700">🤖 AI Grading</div>
                <div className="text-gray-600">
                  Automatic assessment with OCR
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-medium text-gray-700">📝 Take Exams</div>
                <div className="text-gray-600">Access your assigned tests</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-medium text-gray-700">📊 View Results</div>
                <div className="text-gray-600">Track your performance</div>
              </div>
            </>
          )}
        </div>
      </div>

      <Link
        to="/login"
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
      >
        <span>Sign In Now</span>
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="register-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#register-grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="w-32 h-32 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-40 h-40 bg-gradient-to-r from-indigo-300 to-sky-400 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Welcome Section - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-4 rounded-2xl shadow-lg">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                <div>
                  <span
                    className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    SALMA
                  </span>
                  <div className="text-lg text-gray-600 font-medium">
                    AI Assessment Platform
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                  Join the
                  <span className="block bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                    Educational Revolution
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Create your account and experience the future of intelligent
                  assessment and automated grading.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-sky-100 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-sky-100 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        AI-Powered Grading
                      </div>
                      <div className="text-sm text-gray-600">
                        Automatic assessment with 95% accuracy
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-sky-100 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Smart Question Generation
                      </div>
                      <div className="text-sm text-gray-600">
                        Create exams from PDFs instantly
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Register Form Section */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Create Account
              </h2>
              <p className="text-gray-600 mt-2">
                Join SALMA and start your journey
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-sky-100 p-8 space-y-6">
              {/* Desktop Header */}
              <div className="hidden lg:block text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  Create Your Account
                </h3>
                <p className="text-gray-600">
                  Join thousands of educators and students
                </p>
              </div>

              {/* Error Messages */}
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Indicator */}
              {step < 3 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm font-medium ${
                        step >= 1 ? "text-sky-600" : "text-gray-400"
                      }`}
                    >
                      Account Details
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        step >= 2 ? "text-sky-600" : "text-gray-400"
                      }`}
                    >
                      Security
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        step >= 3 ? "text-sky-600" : "text-gray-400"
                      }`}
                    >
                      Complete
                    </span>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full h-1 bg-sky-100 rounded-full"></div>
                    </div>
                    <div className="relative flex justify-between">
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${
                          step >= 1
                            ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
                            : "border-2 border-sky-200 bg-white text-gray-400"
                        } rounded-full transition-all duration-300`}
                      >
                        {step > 1 ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-semibold">1</span>
                        )}
                      </div>
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${
                          step >= 2
                            ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
                            : "border-2 border-sky-200 bg-white text-gray-400"
                        } rounded-full transition-all duration-300`}
                      >
                        {step > 2 ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-semibold">2</span>
                        )}
                      </div>
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${
                          step >= 3
                            ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
                            : "border-2 border-sky-200 bg-white text-gray-400"
                        } rounded-full transition-all duration-300`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderSuccessStep()}
              </form>

              {step < 3 && (
                <>
                  {/* Terms */}
                  <p className="text-xs text-center text-gray-500 border-t border-sky-100 pt-4">
                    By creating an account, you agree to our{" "}
                    <Link to="/terms" className="text-sky-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-sky-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>

                  {/* Sign In Link */}
                  <div className="text-center">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-sky-600 hover:text-sky-700 font-semibold hover:underline decoration-sky-300 underline-offset-4 transition-all duration-300"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
