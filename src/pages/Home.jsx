
import { ArrowRightIcon, AcademicCapIcon, ClipboardDocumentCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">System for Automated Learning and Multi-Agent Assessment</h1>
            <h3 className='text-3xl mb-8'>An Intelligent Approach to Exam Generation and Evaluation</h3>
            <p className="text-xl mb-8">Streamline exam creation, grading, and analysis with our powerful platform.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center">
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>


      
      {/* What Makes SALMA Unique Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">From AI to Automation: What Makes SALMA Unique?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">OCR for Arabic and English Text Recognition</h3>
              <p className="text-gray-600">Optical Character Recognition (OCR) capability to scan and process exam papers or documents in both Arabic and English.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Automated Multi-Agent Grading</h3>
              <p className="text-gray-600">Uses AI to grade student exams based on predefined answers, utilizing multi-agent techniques to improve grading accuracy.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Dynamic Exam Generation</h3>
              <p className="text-gray-600">Automatic creation of exam papers based on predefined questions, templates, or learning material. This ensures customized and varied tests for each student or group.</p>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <AcademicCapIcon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Exam Creation</h3>
              <p className="text-gray-600">Create professional exams with our intuitive tools and templates.</p>
            </div>
            <div className="text-center p-6">
              <ClipboardDocumentCheckIcon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automated Grading</h3>
              <p className="text-gray-600">Save time with our automated grading system and instant feedback.</p>
            </div>
            <div className="text-center p-6">
              <ChartBarIcon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">Get comprehensive insights into student performance and trends.</p>
            </div>
          </div>
        </div>
      </div>

     
       {/* How It Works Section */}
       <div className="bg-gray-50 py-20">
         <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
           {/* Part 1: Create Your Exam */}
           <div className="mb-12">
             <h3 className="text-2xl font-semibold text-center mb-8">Create Your Exam</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="relative">
                 <div className="bg-white rounded-lg p-6 shadow-sm">
                   <span className="absolute -top-4 left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                   <h4 className="text-xl font-semibold mb-2 mt-2">Upload Subject PDFs</h4>
                   <p className="text-gray-600">Uploads PDFs for subject you need to make exam in it.</p>
                 </div>
               </div>
               <div className="relative">
                 <div className="bg-white rounded-lg p-6 shadow-sm">
                   <span className="absolute -top-4 left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                   <h4 className="text-xl font-semibold mb-2 mt-2">Highlight Questions</h4>
                   <p className="text-gray-600">Highlight part you need to make questions.</p>
                 </div>
               </div>
               <div className="relative">
                 <div className="bg-white rounded-lg p-6 shadow-sm">
                   <span className="absolute -top-4 left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                   <h4 className="text-xl font-semibold mb-2 mt-2">Select and Add Questions</h4>
                   <p className="text-gray-600">Once your questions appear you can select questions you need and add it in your exam.</p>
                 </div>
               </div>
             </div>
           </div>

           {/* Part 2: Evaluate Exams */}
           <div>
             <h3 className="text-2xl font-semibold text-center mb-8">Evaluate Exams</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="relative">
                 <div className="bg-white rounded-lg p-6 shadow-sm">
                   <span className="absolute -top-4 left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                   <h4 className="text-xl font-semibold mb-2 mt-2">Upload Exam PDFs</h4>
                   <p className="text-gray-600">Uploads PDF of completed exams for evaluation.</p>
                 </div>
               </div>
               <div className="relative">
                 <div className="bg-white rounded-lg p-6 shadow-sm">
                   <span className="absolute -top-4 left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                   <h4 className="text-xl font-semibold mb-2 mt-2">Send to AI Agent</h4>
                   <p className="text-gray-600">Press button to send it to AI agent to evaluate it.</p>
                 </div>
               </div>
               <div className="relative">
                 <div className="bg-white rounded-lg p-6 shadow-sm">
                   <span className="absolute -top-4 left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                   <h4 className="text-xl font-semibold mb-2 mt-2">Review Results</h4>
                   <p className="text-gray-600">Review the AI-generated evaluation results and insights.</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>


      {/* Footer */}
      {/* <footer className="bg-gray-800 border-t  text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy;   2025 SALMA. All rights reserved.</p>
        </div>
      </footer> */}
      
    </div>
  );
}