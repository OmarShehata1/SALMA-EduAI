import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, CheckCircle, BookOpen, GraduationCap } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // Changed from userType to match backend parameter "role"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  // const navigate = useNavigate();

  const { name, email, password, confirmPassword, role } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep1 = () => {
    // Basic validation for step 1
    if (!name.trim()) {
      setError('Full name is required');
      return false;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate user type selection
    if (!role) {
      setError('Please select whether you are a Teacher or Student');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    // Password validation for step 2
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    setError('');
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateStep2()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Send registration request to the backend
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, // Changed from username to name
          email,
          password,
          role, // Changed from userType to role
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store the JWT token in local storage
      localStorage.setItem('token', data.token);
      
      // Move to success step
      setStep(3);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicators
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    if (password.length < 6) {
      return { strength: 1, text: 'Weak', color: 'bg-red-500' };
    } else if (password.length < 10) {
      return { strength: 2, text: 'Medium', color: 'bg-yellow-500' };
    } else {
      return { strength: 3, text: 'Strong', color: 'bg-green-500' };
    }
  };

  const passwordStrength = getPasswordStrength();

  // Render different steps
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I am a
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'teacher' })}
            className={`relative rounded-lg border ${
              role === 'teacher'
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500'
                : 'border-gray-300 bg-white'
            } p-4 flex flex-col items-center hover:border-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            <div className={`rounded-full p-3 ${
              role === 'teacher' ? 'bg-indigo-100' : 'bg-gray-100'
            }`}>
              <BookOpen className={`h-6 w-6 ${
                role === 'teacher' ? 'text-indigo-600' : 'text-gray-500'
              }`} />
            </div>
            <span className={`mt-2 font-medium ${
              role === 'teacher' ? 'text-indigo-700' : 'text-gray-900'
            }`}>Teacher</span>
            {role === 'teacher' && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'student' })}
            className={`relative rounded-lg border ${
              role === 'student'
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500'
                : 'border-gray-300 bg-white'
            } p-4 flex flex-col items-center hover:border-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            <div className={`rounded-full p-3 ${
              role === 'student' ? 'bg-indigo-100' : 'bg-gray-100'
            }`}>
              <GraduationCap className={`h-6 w-6 ${
                role === 'student' ? 'text-indigo-600' : 'text-gray-500'
              }`} />
            </div>
            <span className={`mt-2 font-medium ${
              role === 'student' ? 'text-indigo-700' : 'text-gray-900'
            }`}>Student</span>
            {role === 'student' && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>
            )}
          </button>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleNextStep}
          className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={password}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder="••••••••"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Password strength indicator */}
        {password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Password strength:</span>
              <span className={`text-xs ${
                passwordStrength.strength === 3 ? 'text-green-500' : 
                passwordStrength.strength === 2 ? 'text-yellow-500' : 'text-red-500'
              }`}>{passwordStrength.text}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${passwordStrength.color}`} 
                style={{ width: `${passwordStrength.strength * 33.3}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder="••••••••"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 justify-center py-3 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : 'Create Account'}
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-6">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="mt-3 text-xl font-medium text-gray-900">Registration Successful!</h3>
      <p className="mt-2 text-sm text-gray-500">
        Your account has been created successfully as a{' '}
        <span className="font-medium text-indigo-600 capitalize">{role}</span>.
        You can now sign in to your account.
      </p>
      <div className="mt-6">
        <Link
          to="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {/* Progress indicator */}
          {step < 3 && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${step >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  Account Details
                </span>
                <span className={`text-sm ${step >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  Security
                </span>
              </div>
              <div className="mt-2 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full h-0.5 bg-gray-200"></div>
                </div>
                <div className="relative flex justify-between">
                  <div 
                    className={`w-6 h-6 flex items-center justify-center ${
                      step >= 1 
                        ? 'bg-indigo-600 text-white' 
                        : 'border-2 border-gray-300 bg-white'
                    } rounded-full`}
                  >
                    {step > 1 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">1</span>
                    )}
                  </div>
                  <div 
                    className={`w-6 h-6 flex items-center justify-center ${
                      step >= 2 
                        ? 'bg-indigo-600 text-white' 
                        : 'border-2 border-gray-300 bg-white'
                    } rounded-full`}
                  >
                    {step > 2 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">2</span>
                    )}
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
            <p className="text-xs text-center text-gray-500 mt-6">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          )}
        </div>
      </div>
    </div>
  );
}