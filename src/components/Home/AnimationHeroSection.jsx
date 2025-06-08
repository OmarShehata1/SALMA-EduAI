import { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Users,
  Sparkles,
  Zap,
  Brain,
  Eye,
  FileText,
  BarChart3,
} from "lucide-react";

const AnimatedHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const scrollToFeatures = () => {
    // Method 1: Using an event
    const event = new CustomEvent("scrollToFeatures");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate feature highlights
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Smart question generation",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "OCR Recognition",
      description: "Arabic & English text",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Agent",
      description: "Collaborative grading",
      color: "from-purple-400 to-pink-500",
    },
  ];

  const floatingCards = [
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Smart Exams",
      delay: "0s",
      position: "top-20 left-10",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Analytics",
      delay: "1s",
      position: "top-40 right-20",
    },
    {
      icon: <Check className="w-5 h-5" />,
      label: "Auto Grade",
      delay: "2s",
      position: "bottom-32 left-20",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Question Bank",
      delay: "0.5s",
      position: "bottom-20 right-10",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-white text-gray-800 min-h-screen pt-11">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      {floatingCards.map((card, index) => (
        <div
          key={index}
          className={`absolute ${card.position} opacity-80 animate-pulse hidden md:block`}
          style={{ animationDelay: card.delay, animationDuration: "4s" }}
        >
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white border-opacity-30 hover:scale-110 transition-all duration-300">
            <div className="flex items-center space-x-2">
              <div className="text-sky-600">{card.icon}</div>
              <span className="text-sm font-medium text-gray-700">
                {card.label}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Logo/Brand Animation */}
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-opacity-20 inline-block px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-sky-300 border-opacity-30">
                <div className="flex items-center space-x-3">
                  <Sparkles
                    className="w-6 h-6 text-sky-600 animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                  <span className="text-lg font-bold text-sky-800">SALMA</span>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div
            className={`transition-all duration-1000 delay-200 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto"
              style={{ fontFamily: "Patrick Hand, cursive" }}
            >
              <span className="bg-gradient-to-r from-gray-800 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                System for Automated
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Learning & Multi-Agent
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                Assessment
              </span>
            </h1>
          </div>

          {/* Dynamic Feature Showcase */}
          <div
            className={`transition-all duration-1000 delay-400 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="flex items-center justify-center space-x-8 md:space-x-12">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 transform ${
                      currentFeature === index
                        ? "scale-110"
                        : "scale-90 opacity-60"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl shadow-lg text-white`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        {feature.icon}
                        <div className="text-center">
                          <div className="font-bold text-sm">
                            {feature.title}
                          </div>
                          <div className="text-xs opacity-90">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-1000 delay-600 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: "Patrick Hand, cursive" }}
            >
              Revolutionize exam{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-lg font-semibold shadow-md">
                Generation
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-lg font-semibold shadow-md">
                Evaluation
              </span>{" "}
              with AI-powered automation that saves educators 70% of their time
            </p>
          </div>

          {/* Interactive Stats Cards */}
          <div
            className={`transition-all duration-1000 delay-800 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  number: "70%",
                  label: "Time Saved",
                  icon: <Zap className="w-5 h-5" />,
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  number: "95%",
                  label: "OCR Accuracy",
                  icon: <Eye className="w-5 h-5" />,
                  color: "from-green-400 to-emerald-500",
                },
                {
                  number: "∞",
                  label: "Question Types",
                  icon: <Brain className="w-5 h-5" />,
                  color: "from-purple-400 to-indigo-500",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-sky-200 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`bg-gradient-to-r ${stat.color} p-2 rounded-xl text-white`}
                    >
                      {stat.icon}
                    </div>
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.number}
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div
            className={`transition-all duration-1000 delay-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Creating Exams</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToFeatures}
                className="group border-2 border-sky-500 text-sky-600 px-8 py-4 rounded-2xl font-semibold hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>See How It Works</span>
                <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            className={`transition-all duration-1000 delay-1200 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  Trusted by educators worldwide
                </span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center space-x-8 opacity-60">
                {["Arabic", "English", "Multi-Format", "AI-Powered"].map(
                  (feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default AnimatedHeroSection;
