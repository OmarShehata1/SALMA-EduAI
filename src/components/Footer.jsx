import { Link } from 'react-router-dom';
import { Mail, Phone, Twitter, Linkedin, Facebook, ChevronRight, MessageSquare, BookOpen, BarChart2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Logo and description */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0 max-w-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white font-bold p-2 rounded mr-2">
                S
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontFamily: 'Patrick Hand, cursive' }}>
                SALMA
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              System for Automated Learning and Multi-Agent Assessment.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all text-blue-600 hover:text-blue-700"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all text-blue-600 hover:text-blue-700"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all text-blue-600 hover:text-blue-700"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          {/* Links sections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <FooterLink to="/" icon={<ChevronRight size={16} />} text="Home" />
                <FooterLink to="/create" icon={<BookOpen size={16} />} text="Create Exam" />
                <FooterLink to="/grades" icon={<BarChart2 size={16} />} text="Grades" />
                <FooterLink to="/about" icon={<ChevronRight size={16} />} text="About Us" />
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                <FooterLink to="/faq" icon={<MessageSquare size={16} />} text="FAQ" />
                <FooterLink to="/help" icon={<ChevronRight size={16} />} text="Help Center" />
                <FooterLink to="/tutorials" icon={<BookOpen size={16} />} text="Tutorials" />
                <FooterLink to="/contact" icon={<ChevronRight size={16} />} text="Contact Us" />
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail size={16} className="mr-2" />
                  <a href="mailto:contact@salma.ai">contact@salma.ai</a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-2" />
                  <span>(555) 123-4567</span>
                </div>
              
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} SALMA. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-blue-600 text-sm">Terms of Use</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-blue-600 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer link component
const FooterLink = ({ to, icon, text }) => (
  <li>
    <Link to={to} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
      <span className="mr-2 text-blue-500">{icon}</span>
      {text}
    </Link>
  </li>
);