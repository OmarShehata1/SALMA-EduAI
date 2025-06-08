import { useState, useEffect, useRef } from "react";
import {
  Upload,
  FileText,
  Wand2,
  Brain,
  CheckCircle,
  BarChart3,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const HowItWorksSection = () => {
  const [activeProcess, setActiveProcess] = useState("create");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleElements, setVisibleElements] = useState([]);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  // Process data with enhanced visuals
  const processes = {
    create: {
      title: "Create Smart Exams",
      subtitle: "Transform your materials into professional assessments",
      color: "from-blue-500 to-indigo-600",
      bgPattern: "bg-gradient-to-br from-blue-50 to-indigo-50",
      steps: [
        {
          icon: <Upload className="w-6 h-6" />,
          title: "Upload Content",
          description:
            "Drop your PDFs, documents, or type your course materials",
          detail:
            "Support for multiple formats: PDF, DOCX, TXT, and direct text input",
          visual: "📚",
          duration: 2000,
        },
        {
          icon: <Wand2 className="w-6 h-6" />,
          title: "AI Analysis",
          description: "Our AI extracts key concepts and learning objectives",
          detail:
            "Advanced NLP identifies important topics, definitions, and relationships",
          visual: "🔍",
          duration: 3000,
        },
        {
          icon: <Brain className="w-6 h-6" />,
          title: "Question Generation",
          description: "Generate diverse questions across difficulty levels",
          detail:
            "Multiple choice, short answer, and essay questions tailored to your content",
          visual: "❓",
          duration: 2500,
        },
        {
          icon: <CheckCircle className="w-6 h-6" />,
          title: "Review & Customize",
          description: "Fine-tune questions and build your perfect exam",
          detail:
            "Edit, reorganize, and add custom questions with our intuitive editor",
          visual: "✅",
          duration: 2000,
        },
      ],
    },
    evaluate: {
      title: "Intelligent Grading",
      subtitle: "Automate evaluation with human-like accuracy",
      color: "from-emerald-500 to-teal-600",
      bgPattern: "bg-gradient-to-br from-emerald-50 to-teal-50",
      steps: [
        {
          icon: <FileText className="w-6 h-6" />,
          title: "Submit Exams",
          description: "Upload completed exams in any format",
          detail:
            "Supports scanned papers, PDFs, images, and digital submissions",
          visual: "📄",
          duration: 1500,
        },
        {
          icon: <Brain className="w-6 h-6" />,
          title: "OCR Processing",
          description: "Extract text from handwritten and printed answers",
          detail: "Advanced OCR for Arabic and English with 95%+ accuracy",
          visual: "👁️",
          duration: 3000,
        },
        {
          icon: <Wand2 className="w-6 h-6" />,
          title: "Multi-Agent Grading",
          description: "AI agents collaborate to evaluate responses",
          detail:
            "Multiple perspectives ensure fair and comprehensive assessment",
          visual: "🤖",
          duration: 4000,
        },
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "Results & Analytics",
          description: "Detailed feedback and performance insights",
          detail:
            "Individual reports, class analytics, and improvement recommendations",
          visual: "📊",
          duration: 2000,
        },
      ],
    },
  };

  const activeProcessData = processes[activeProcess];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && visibleElements.includes("process")) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % activeProcessData.steps.length;
          return nextStep;
        });
      }, activeProcessData.steps[currentStep]?.duration || 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isPlaying,
    currentStep,
    activeProcess,
    activeProcessData.steps,
    visibleElements,
  ]);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(
            () => setVisibleElements((prev) => [...prev, "title"]),
            100
          );
          setTimeout(
            () => setVisibleElements((prev) => [...prev, "tabs"]),
            300
          );
          setTimeout(
            () => setVisibleElements((prev) => [...prev, "process"]),
            500
          );
        }
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const handleProcessChange = (process) => {
    setActiveProcess(process);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetProcess = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${
            visibleElements.includes("title")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent"
            style={{ fontFamily: "Patrick Hand, cursive" }}
          >
            How SALMA Works
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Patrick Hand, cursive" }}
          >
            Experience the intelligent workflow that transforms education
          </p>
        </div>

        {/* Process Tabs */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 transform ${
            visibleElements.includes("tabs")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100 inline-flex">
            {Object.entries(processes).map(([key, process]) => (
              <button
                key={key}
                onClick={() => handleProcessChange(key)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                  activeProcess === key
                    ? `bg-gradient-to-r ${process.color} text-white shadow-lg transform scale-105`
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span>{process.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Process Visualization */}
        <div
          className={`transition-all duration-700 transform ${
            visibleElements.includes("process")
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Process Header */}
          <div className="text-center mb-12">
            <h3
              className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${activeProcessData.color} bg-clip-text text-transparent`}
            >
              {activeProcessData.title}
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              {activeProcessData.subtitle}
            </p>

            {/* Playback Controls */}
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={togglePlayback}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all bg-gradient-to-r ${activeProcessData.color} text-white hover:shadow-lg transform hover:scale-105`}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                <span>{isPlaying ? "Pause" : "Play"} Demo</span>
              </button>
              <button
                onClick={resetProcess}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Interactive Process Flow */}
          <div
            className={`${activeProcessData.bgPattern} rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden`}
          >
            {/* Current Step Highlight */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${activeProcessData.color} opacity-30`}
              ></div>
              <div
                className={`absolute top-0 left-0 h-2 bg-gradient-to-r ${activeProcessData.color} transition-all duration-1000`}
                style={{
                  width: `${
                    ((currentStep + 1) / activeProcessData.steps.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {activeProcessData.steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-500 transform ${
                    index === currentStep
                      ? "scale-110 z-10"
                      : index < currentStep
                      ? "scale-100 opacity-75"
                      : "scale-95 opacity-50"
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {/* Step Card */}
                  <div
                    className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300 border-2 ${
                      index === currentStep
                        ? `border-current bg-gradient-to-br from-white to-gray-50 shadow-2xl`
                        : "border-transparent hover:border-gray-200 hover:shadow-xl"
                    }`}
                  >
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${activeProcessData.color} text-white shadow-md`}
                      >
                        {step.icon}
                      </div>
                      <div className="text-3xl">{step.visual}</div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-bold px-2 py-1 rounded-full bg-gradient-to-r ${activeProcessData.color} text-white`}
                        >
                          {index + 1}
                        </span>
                        <h4 className="font-bold text-gray-800">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      {/* Expanded Detail (when active) */}
                      {index === currentStep && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-current animate-fadeIn">
                          <p className="text-xs text-gray-700 font-medium">
                            {step.detail}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress Indicator */}
                    {index === currentStep && isPlaying && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full bg-gradient-to-r ${activeProcessData.color} animate-pulse`}
                            style={{
                              width: "100%",
                              animation: `progress ${step.duration}ms linear infinite`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connection Line */}
                  {index < activeProcessData.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                      <ArrowRight
                        className={`w-6 h-6 text-gray-300 ${
                          index < currentStep ? `text-current` : ""
                        } transition-colors duration-500`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Action */}
            <div className="text-center mt-12">
              <button
                onClick={() =>
                  (window.location.href =
                    activeProcess === "create" ? "/create" : "/grades")
                }
                className={`bg-gradient-to-r ${activeProcessData.color} text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2`}
              >
                <span>Try {activeProcessData.title}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HowItWorksSection;
