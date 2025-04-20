import { useState, useEffect, useRef } from 'react';
import { Upload, Search, CheckSquare, FileText, Bot, BarChart3, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [visibleItems, setVisibleItems] = useState({});
  const sectionRef = useRef(null);

  // Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start staggered animations when section comes into view
          setTimeout(() => setVisibleItems(prev => ({ ...prev, title: true })), 100);
          setTimeout(() => setVisibleItems(prev => ({ ...prev, tabs: true })), 300);
          setTimeout(() => setVisibleItems(prev => ({ ...prev, steps: true })), 500);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const createExamSteps = [
    {
      icon: <Upload className="w-8 h-8 text-blue-500" />,
      title: "Upload Subject PDFs",
      description: "Upload PDFs for subjects you need to create exams for.",
      color: "bg-blue-50"
    },
    {
      icon: <Search className="w-8 h-8 text-indigo-500" />,
      title: "Highlight Questions",
      description: "Highlight sections you want to generate questions from.",
      color: "bg-indigo-50"
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-purple-500" />,
      title: "Select and Add Questions",
      description: "Choose from AI-generated questions to build your exam.",
      color: "bg-purple-50"
    }
  ];

  const evaluateExamSteps = [
    {
      icon: <FileText className="w-8 h-8 text-green-500" />,
      title: "Upload Exam PDFs",
      description: "Upload completed exams that need evaluation.",
      color: "bg-green-50"
    },
    {
      icon: <Bot className="w-8 h-8 text-teal-500" />,
      title: "AI Processing",
      description: "Our AI agents evaluate answers with human-like accuracy.",
      color: "bg-teal-50"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
      title: "Review Results",
      description: "Get comprehensive evaluation reports and insights.",
      color: "bg-cyan-50"
    }
  ];

  const activeSteps = activeTab === 'create' ? createExamSteps : evaluateExamSteps;

  return (
    <div ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          className={`transition-all duration-700 transform ${
            visibleItems.title ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our intelligent system simplifies both exam creation and evaluation
          </p>
        </div>

        <div 
          className={`flex justify-center mb-12 transition-all duration-700 transform ${
            visibleItems.tabs ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'create'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Create Your Exam
            </button>
            <button
              onClick={() => setActiveTab('evaluate')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'evaluate'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Evaluate Exams
            </button>
          </div>
        </div>

        <div 
          className={`transition-all duration-700 transform ${
            visibleItems.steps ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Timeline Steps */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="relative"
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    animationDelay: `${index * 150}ms`,
                    opacity: 0
                  }}
                >
                  {/* Numbered Circle (for mobile) */}
                  <div className="md:hidden absolute -left-4 top-0 flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                    {/* Icon Circle */}
                    <div className={`${step.color} p-4 rounded-lg mb-4 inline-flex relative`}>
                      {/* Number Badge (for desktop) */}
                      <span className="hidden md:flex absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      {step.icon}
                    </div>
                    
                    <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {/* Added space at bottom with a "ghost" element for consistent card heights */}
                    <div className="mt-auto">
                      {index !== activeSteps.length - 1 && (
                        <div className="flex justify-end text-blue-600 hidden md:block">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center">
            {activeTab === 'create' ? 'Start Creating Exams' : 'Start Evaluating'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HowItWorksSection;