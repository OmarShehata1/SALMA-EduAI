import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Check, Users } from 'lucide-react';

const AnimatedHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-indigo-700 to-blue-600 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-blue-300 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-indigo-200 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="bg-blue-500 bg-opacity-20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-sm font-medium">Intelligent Assessment System</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              System for Automated Learning and Assessment
            </h1>
            <h3 className="text-xl md:text-2xl mb-6 text-blue-100">
              Revolutionize exam creation and evaluation with AI-powered tools
            </h3>
            <p className="text-lg mb-8 text-blue-50 max-w-lg">
              Our multi-agent platform streamlines the entire assessment process from creation to analysis, saving educators valuable time.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center group">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl border border-white border-opacity-20 shadow-lg">
              <div className="grid gap-4 text-blue-600">
                {[
                  { 
                    icon: <BookOpen className="text-blue-200" />,
                    title: "Smart Exam Generation",
                    description: "AI-powered system creates custom exams based on your curriculum"
                  },
                  { 
                    icon: <Check className="text-blue-200" />,
                    title: "Automated Evaluation",
                    description: "Reduce grading time with intelligent assessment tools"
                  },
                  { 
                    icon: <Users className="text-blue-200" />,
                    title: "Multi-Agent Collaboration",
                    description: "Multiple AI agents work together to create fair assessments"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start p-3 rounded-lg bg-gradient-to-r from-white to-blue-200 bg-opacity-0 transition-all duration-500 transform hover:scale-105`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="bg-blue-600 p-2 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{feature.title}</h4>
                      <p className="text-blue-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeroSection;