import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const [, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-2 `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center">
            <div className="bg-blue-600 text-white font-bold p-2 rounded mr-2">
              S
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SALMA
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links - Center (hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-1">
              <NavLink to="/" label="Home" />
              <NavLink to="/create" label="Create Exam" />
              <NavLink to="/grades" label="Grades" />
            </div>
          </div>

          {/* Auth Buttons - Right (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/login" 
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <LogIn className="w-4 h-4 mr-1" />
              Login
            </Link>
            <Link 
              to="/register" 
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Menu (shown when menu button is clicked) */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              <MobileNavLink to="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/create" label="Create Exam" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/grades" label="Grades" onClick={() => setIsMobileMenuOpen(false)} />
              <div className="border-t border-gray-200 my-2 pt-2"></div>
              <MobileNavLink to="/login" label="Login" onClick={() => setIsMobileMenuOpen(false)} icon={<LogIn className="w-4 h-4" />} />
              <MobileNavLink to="/register" label="Register" onClick={() => setIsMobileMenuOpen(false)} icon={<UserPlus className="w-4 h-4" />} isButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Desktop Navigation Link
const NavLink = ({ to, label }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Check if current path matches this link
    setIsActive(window.location.pathname === to);
  }, [to]);
  
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      {label}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, label, onClick, icon, isButton = false }) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-lg font-medium ${
        isButton 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
};