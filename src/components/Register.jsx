import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep1 = () => {
    // Basic validation for step 1
    if (!name.trim()) {
      setError('Name is required');
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
    
    return true;
  };

  const validateStep2 = () => {
    // Password validation for step 2
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
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
      // Here you would add your actual registration logic
      // For example:
      // await registerUser(name, email, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move to success step
      setStep(3);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
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
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
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
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleNextStep}
          className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-3"
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
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-3"
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
          className="flex-1 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="mt-2 text-xl font-medium text-gray-900">Registration Successful!</h3>
      <p className="mt-2 text-sm text-gray-500">
        Your account has been created successfully. You can now sign in to your account.
      </p>
      <div className="mt-6">
        <Link
          to="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white font-bold p-3 rounded-lg mb-2">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          {/* Progress indicator */}
          {step < 3 && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  Account Details
                </span>
                <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
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
                        ? 'bg-blue-600 text-white' 
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
                        ? 'bg-blue-600 text-white' 
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
        </div>
      </div>
    </div>
  );
};

export default Register;