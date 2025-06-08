import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Facebook,
  ChevronRight,
  MessageSquare,
  BookOpen,
  BarChart2,
  GraduationCap,
  Sparkles,
  Heart,
  Globe,
  Shield,
  Users,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-sky-50 via-sky-25 to-white border-t border-sky-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="footer-grid"
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
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center group">
              <div className="relative">
                <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-3 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <div className="ml-4">
                <span
                  className="text-3xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  SALMA
                </span>
                <div className="text-sm text-gray-500 font-medium">
                  AI Assessment Platform
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-md">
              System for Automated Learning and Multi-Agent Assessment.
              Revolutionizing education through intelligent exam creation and
              evaluation.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-sky-100 shadow-sm">
                <div className="text-2xl font-bold text-sky-600">70%</div>
                <div className="text-xs text-gray-600">Time Saved</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-sky-100 shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">95%</div>
                <div className="text-xs text-gray-600">OCR Accuracy</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <SocialLink
                href="#"
                icon={<Twitter className="w-5 h-5" />}
                label="Twitter"
              />
              <SocialLink
                href="#"
                icon={<Linkedin className="w-5 h-5" />}
                label="LinkedIn"
              />
              <SocialLink
                href="#"
                icon={<Facebook className="w-5 h-5" />}
                label="Facebook"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Platform */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-lg mr-3">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                Platform
              </h3>
              <ul className="space-y-4">
                <FooterLink
                  to="/"
                  icon={<ChevronRight className="w-4 h-4" />}
                  text="Home"
                />
                <FooterLink
                  to="/create"
                  icon={<GraduationCap className="w-4 h-4" />}
                  text="Create Exam"
                />
                <FooterLink
                  to="/grades"
                  icon={<BarChart2 className="w-4 h-4" />}
                  text="Analytics"
                />
                <FooterLink
                  to="/student"
                  icon={<Users className="w-4 h-4" />}
                  text="Student Portal"
                />
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-2 rounded-lg mr-3">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                Support
              </h3>
              <ul className="space-y-4">
                <FooterLink
                  to="/help"
                  icon={<MessageSquare className="w-4 h-4" />}
                  text="Help Center"
                />
                <FooterLink
                  to="/tutorials"
                  icon={<BookOpen className="w-4 h-4" />}
                  text="Tutorials"
                />
                <FooterLink
                  to="/faq"
                  icon={<ChevronRight className="w-4 h-4" />}
                  text="FAQ"
                />
                <FooterLink
                  to="/contact"
                  icon={<ChevronRight className="w-4 h-4" />}
                  text="Contact Us"
                />
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-lg mr-3">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                Connect
              </h3>
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <a
                    href="mailto:contact@salma.ai"
                    className="flex items-center text-gray-600 hover:text-sky-600 transition-all duration-300 group"
                  >
                    <Mail className="w-4 h-4 mr-3 text-sky-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">contact@salma.ai</span>
                  </a>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-sky-500" />
                    <span className="text-sm">(555) 123-4567</span>
                  </div>
                </div>

                {/* Quick Legal Links */}
                <div className="pt-2 space-y-2">
                  <FooterLink
                    to="/privacy"
                    icon={<Shield className="w-4 h-4" />}
                    text="Privacy"
                  />
                  <FooterLink
                    to="/terms"
                    icon={<ChevronRight className="w-4 h-4" />}
                    text="Terms"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Enhanced Design */}
        <div className="border-t border-sky-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright with love */}
            <div className="flex items-center text-gray-600 text-sm">
              <span>© {currentYear} SALMA. Made with</span>
              <Heart className="w-4 h-4 mx-2 text-red-400 animate-pulse" />
              <span>for educators worldwide</span>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Multi-Language</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-sky-600 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-sky-600 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="text-gray-500 hover:text-sky-600 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-50"></div>
    </footer>
  );
}

// Enhanced Footer Link Component
const FooterLink = ({ to, icon, text }) => (
  <li className="list-none">
    <Link
      to={to}
      className="flex items-center text-gray-600 hover:text-sky-600 transition-all duration-300 group text-sm"
    >
      <span className="mr-3 text-sky-500 group-hover:scale-110 group-hover:text-sky-600 transition-all duration-300">
        {icon}
      </span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {text}
      </span>
    </Link>
  </li>
);

// Social Link Component
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    className="bg-white/60 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-sky-600 hover:text-sky-700 hover:scale-110 border border-sky-100 group"
    aria-label={label}
  >
    <div className="group-hover:rotate-12 transition-transform duration-300">
      {icon}
    </div>
  </a>
);
