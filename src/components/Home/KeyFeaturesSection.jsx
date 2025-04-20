import { useState, useEffect, useRef } from 'react';
import { GraduationCap, ClipboardCheck, BarChart3, LayoutGrid, FileText, UserCheck } from 'lucide-react';

const KeyFeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Features data
  const features = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Smart Exam Creation",
      description: "Create professional exams with our intuitive tools and templates. Generate custom questions based on your course materials instantly.",
      color: "bg-blue-500",
      benefits: ["30% faster exam creation", "Customizable templates", "Question variety"]
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Automated Grading",
      description: "Save time with our automated grading system and instant feedback. Our AI recognizes and evaluates both multiple choice and written answers.",
      color: "bg-purple-500",
      benefits: ["70% reduction in grading time", "Detailed feedback generation", "Bias reduction"]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Detailed Analytics",
      description: "Get comprehensive insights into student performance and trends. Identify knowledge gaps and adjust your teaching strategies accordingly.",
      color: "bg-emerald-500",
      benefits: ["Performance tracking", "Visual data reports", "Personalized insights"]
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Question Bank",
      description: "Build a comprehensive question bank organized by topics, difficulty levels, and question types for quick exam assembly.",
      color: "bg-amber-500",
      benefits: ["Centralized repository", "Easy categorization", "Content reusability"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Digital Assessment",
      description: "Move beyond paper with digital assessments that support various question formats and media integration.",
      color: "bg-rose-500",
      benefits: ["Eco-friendly solution", "Rich media support", "Immediate delivery"]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Learning Insights",
      description: "Transform assessment data into actionable learning insights with our powerful analytics engine.",
      color: "bg-cyan-500",
      benefits: ["Learning gap analysis", "Progress monitoring", "Adaptive recommendations"]
    }
  ];
  
  // Auto-rotate features
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length, isVisible]);
  
  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
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

  return (
    <div ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-4">Key Features</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Discover how SALMA transforms the assessment process from start to finish
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Feature Selection Column */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? `${feature.color.replace('bg-', 'bg-')} text-white shadow-md` 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className={`p-2 rounded-lg mr-3 ${
                    activeFeature === index 
                      ? 'bg-white bg-opacity-20' 
                      : feature.color + ' text-white'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
          
          {/* Feature Showcase Column */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 h-full ${
                    activeFeature === index 
                      ? 'opacity-100 visible' 
                      : 'opacity-0 absolute -left-full invisible'
                  }`}
                >
                  <div className={`${feature.color} h-2 w-full`}></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`${feature.color} p-3 rounded-lg mr-4`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-8">{feature.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {feature.benefits.map((benefit, i) => (
                        <div 
                          key={i}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                          style={{
                            animation: 'fadeInUp 0.5s ease-out forwards',
                            animationDelay: `${i * 150}ms`,
                            opacity: 0
                          }}
                        >
                          <span className="font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 transition-all ${
                activeFeature === index 
                  ? features[activeFeature].color.replace('bg-', 'bg-')
                  : 'bg-gray-300'
              }`}
              onClick={() => setActiveFeature(index)}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default KeyFeaturesSection;