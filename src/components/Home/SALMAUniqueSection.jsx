import { useState, useEffect, useRef } from 'react';
import { Scan, BrainCircuit, WandSparkles, Trophy, Zap } from 'lucide-react';

const SALMAUniqueSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisibleCards(['title']), 100);
          setTimeout(() => setVisibleCards(prev => [...prev, 'card-0']), 300);
          setTimeout(() => setVisibleCards(prev => [...prev, 'card-1']), 500);
          setTimeout(() => setVisibleCards(prev => [...prev, 'card-2']), 700);
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

  const features = [
    {
      icon: <Scan className="w-12 h-12 text-white" />,
      title: "Advanced OCR for Arabic & English",
      description: "Our intelligent OCR system accurately processes exam papers in both Arabic and English, recognizing handwritten and printed text with high precision.",
      color: "from-blue-600 to-blue-400",
      accent: "blue"
    },
    {
      icon: <BrainCircuit className="w-12 h-12 text-white" />,
      title: "Multi-Agent AI Grading",
      description: "Multiple AI agents collaborate to evaluate answers, providing human-like grading accuracy and detailed feedback for every student submission.",
      color: "from-purple-600 to-indigo-400",
      accent: "purple"
    },
    {
      icon: <WandSparkles className="w-12 h-12 text-white" />,
      title: "Dynamic Exam Generation",
      description: "Create customized, varied tests tailored to specific learning objectives, ensuring each student faces unique challenges adapted to their educational needs.",
      color: "from-emerald-600 to-teal-400",
      accent: "emerald"
    }
  ];

  return (
    <div ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-700 transform ${
          visibleCards.includes('title') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-4">What Makes SALMA Unique?</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Combining cutting-edge AI with automation to revolutionize educational assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200 hidden md:block"></div>
          
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 transform ${
                visibleCards.includes(`card-${index}`) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                {/* Top colored section with icon */}
                <div className={`bg-gradient-to-r ${feature.color} p-8 relative`}>
                  <div className="absolute -bottom-6 left-6 bg-white p-3 rounded-lg shadow-md">
                    <div className={`bg-${feature.accent}-500 p-2 rounded-lg`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Animated bubbles in background */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white opacity-10 animate-pulse"></div>
                  <div className="absolute bottom-10 right-8 w-12 h-12 rounded-full bg-white opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-12 flex-grow">
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                
                {/* Bottom accent */}
                <div className={`h-1 bg-gradient-to-r ${feature.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial or highlight */}
        <div className={`mt-12 bg-gray-50 p-6 rounded-xl border border-gray-100 max-w-3xl mx-auto transition-all duration-1000 transform ${
          visibleCards.includes('card-2') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{transitionDelay: '900ms'}}>
          <div className="flex items-center">
            <Trophy className="text-yellow-500 w-10 h-10 mr-4" />
            <p className="text-lg font-medium text-gray-700">
              "SALMA delivers a 70% reduction in grading time while maintaining assessment quality."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SALMAUniqueSection;