// CreateFullExamPage.jsx - Main Component
import { useState } from "react";
import { ArrowLeft, AlertCircle, CheckCircle, Upload, Settings, List, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FileUploadSection from "../components/fullExam/FileUploadSection";
import ExamSettingsForm from "../components/fullExam/ExamSettingsForm";
import GeneratedQuestions from "../components/fullExam/GeneratedQuestions";
import QuickStartGuide from "../components/fullExam/QuickStartGuide";
import NotificationManager from "../components/Notification";

export default function CreateFullExam() {
  const [files, setFiles] = useState([]);
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const url = "http://localhost:5000";
  const navigate = useNavigate();

  // Initialize notification manager
  const { addNotification, NotificationList } = NotificationManager();

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: file,
      name: file.name,
    }));
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  // Remove a file from the list
  const removeFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
    setSelectedFileIds((prevIds) => prevIds.filter((id) => id !== fileId));
  };

  // Toggle file selection
  const toggleFileSelection = (fileId) => {
    setSelectedFileIds((prevIds) =>
      prevIds.includes(fileId)
        ? prevIds.filter((id) => id !== fileId)
        : [...prevIds, fileId]
    );
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  // Generate questions based on selected files and settings
  const generateQuestions = async () => {
    if (selectedFileIds.length === 0) {
      setError("Please select at least one file.");
      addNotification("Please select at least one PDF file", "warning");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setUploadProgress(0);
    setGenerationProgress(0);
    setCurrentStep(2); // Move to upload step

    try {
      // Get teacher ID from localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        throw new Error("Please log in again to continue.");
      }

      const user = JSON.parse(userStr);
      const teacherId = user.id || user._id || user.teacherId;
      if (!teacherId) {
        throw new Error("Teacher ID not found. Please log in again.");
      }

      // Get user token for authentication
      const userToken = user.token;

      console.log("Starting full exam generation...");
      console.log("Teacher ID:", teacherId);
      console.log("Selected files:", selectedFileIds.length);
      console.log("Selected language:", selectedLanguage);

      addNotification("Starting PDF upload...", "info");

      // Step 1: Upload selected PDFs to teacher's collection first
      const selectedFiles = files.filter((f) => selectedFileIds.includes(f.id));
      const formData = new FormData();
      
      selectedFiles.forEach((fileObj) => {
        formData.append("pdf", fileObj.file);
      });

      console.log("Uploading PDFs to teacher's collection...");
      setUploadProgress(30);
      
      const uploadResponse = await fetch(`${url}/teachers/${teacherId}/uploads`, {
        method: "POST",
        headers: {
          ...(userToken && { "Authorization": `Bearer ${userToken}` }),
        },
        body: formData,
      });

      console.log("Upload response status:", uploadResponse.status);
      setUploadProgress(100);

      if (!uploadResponse.ok) {
        let errorMessage = "Failed to upload PDFs to teacher's collection";
        try {
          const errorData = await uploadResponse.json();
          console.log("Upload error response:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.log("Could not parse upload error response:", parseError);
          errorMessage = `Upload error: ${uploadResponse.status} ${uploadResponse.statusText}`;
        }
        throw new Error(errorMessage);
      }

      console.log("PDFs uploaded successfully to teacher's collection");
      addNotification("PDFs uploaded successfully! Generating questions...", "success");
      setCurrentStep(3); // Move to generation step
      
      // Step 2: Now call the generation API with PDF names
      const pdfNames = selectedFiles.map((fileObj) => fileObj.name);
      console.log("Generating full exam from uploaded PDFs:", pdfNames);
      console.log("Number of PDFs:", pdfNames.length);

      const requestBody = { 
        pdfNames: pdfNames,
        lang: selectedLanguage 
      };
      console.log("Request body:", JSON.stringify(requestBody, null, 2));
      
      // Call the new full exam generation endpoint
      console.log("Making request to:", `${url}/teachers/${teacherId}/exams/genqa_full`);
      setGenerationProgress(20);
      
      const response = await fetch(`${url}/teachers/${teacherId}/exams/genqa_full`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userToken && { "Authorization": `Bearer ${userToken}` }),
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Question generation response status:", response.status);
      setGenerationProgress(80);

      if (!response.ok) {
        let errorMessage = `Server returned error status ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("Generation error response:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          const errorText = await response.text();
          console.log("Raw error response:", errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Question generation successful");
      setGenerationProgress(100);
      
      // Handle the response - it might be an array directly or an object with questions
      let questionsArray;
      
      if (Array.isArray(data)) {
        questionsArray = data;
        console.log("Backend returned questions as direct array");
      } else if (data.questions && Array.isArray(data.questions)) {
        questionsArray = data.questions;
        console.log("Backend returned questions in object wrapper");
      } else {
        console.error("Invalid response format - expected questions array");
        throw new Error("Invalid response format from server");
      }
      
      if (!questionsArray.length) {
        throw new Error("No questions were generated from the PDFs");
      }

      // Transform the backend data structure to match our frontend needs
      const formattedQuestions = questionsArray.map((q, index) => {
        console.log(`Processing question ${index + 1}:`, q);
        return {
          id: `full-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${index}`,
          question: q.question || q.questionText || q.text,
          answer: q.answer || q.correctAnswer || q.solution,
          isSelected: false, // Initially not selected - user will choose
          grade: q.grade || 10, // Use API grade or default
          source: q.source || `Generated from ${pdfNames.join(", ")}`,
        };
      });

      console.log(`Generated ${formattedQuestions.length} questions for selection`);
      setQuestions(formattedQuestions);
      setShowQuestions(true); // Show the questions for selection
      setCurrentStep(4); // Move to selection step
      setSuccessMessage(`Successfully generated ${formattedQuestions.length} questions! Review and select the ones you want to add to your collection.`);
      addNotification(`🎉 Generated ${formattedQuestions.length} questions successfully!`, "success");

    } catch (error) {
      console.error("Error generating questions:", error);
      setError(error.message || "Failed to generate questions. Please try again.");
      addNotification(`Error: ${error.message}`, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle saving selected questions - navigate to DisplayQuestions page
  const saveSelectedQuestions = (selectedQuestions) => {
    console.log("Adding selected questions to collection:", selectedQuestions);
    
    if (selectedQuestions.length === 0) {
      setError("Please select at least one question.");
      addNotification("Please select at least one question", "warning");
      return;
    }

    addNotification(`Adding ${selectedQuestions.length} questions to your collection...`, "info");

    // Navigate to DisplayQuestions page with the selected questions
    navigate("/questions", {
      state: {
        newQuestions: selectedQuestions,
        addToExisting: true,
        lang: selectedLanguage, // Pass the selected language
        successMessage: `🎉 Successfully added ${selectedQuestions.length} questions to your collection! You can now create an exam with them.`,
      },
    });
  };

  // Toggle back to file selection view
  const goBackToFileSelection = () => {
    setShowQuestions(false);
    setCurrentStep(1);
    setSuccessMessage("");
  };

  // Progress Steps Component
  const StepIndicator = () => {
    const steps = [
      { id: 1, title: "Upload PDFs", icon: Upload, description: "Select and upload your PDF files" },
      { id: 2, title: "Configure", icon: Settings, description: "Choose language and settings" },
      { id: 3, title: "Generate", icon: Plus, description: "AI generates questions" },
      { id: 4, title: "Review", icon: List, description: "Review and select questions" },
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-sm font-medium ${
                        isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 max-w-[120px]">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-colors ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Progress Bar Component
  const ProgressBar = ({ progress, label, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
    };

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${colorClasses[color]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification component */}
      <NotificationList />
      
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Generate Questions from PDFs
      </h1>

      {/* Step Indicator */}
      <StepIndicator />

      {/* Quick Start Guide */}
      {currentStep === 1 && <QuickStartGuide />}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 mb-6">
          Upload PDF files to generate a comprehensive set of questions with approximately 20-30 questions. 
          Our AI will analyze your content and create questions automatically. You can then 
          review, edit, select the questions you want, and add them to your questions collection.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="text-blue-500 w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              📚 <strong>Question Generation Workflow:</strong> Select your PDF files → Choose language → Generate ~20-30 questions → Review and select → Add to questions collection → Go to Questions page to create exam. Perfect for building comprehensive question banks from your course materials.
            </p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <CheckCircle className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <AlertCircle className="text-red-500 w-5 h-5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Progress Indicators */}
        {isGenerating && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Processing...</h3>
            {currentStep === 2 && (
              <ProgressBar 
                progress={uploadProgress} 
                label="Uploading PDFs to server" 
                color="blue" 
              />
            )}
            {currentStep === 3 && (
              <>
                <ProgressBar 
                  progress={100} 
                  label="Upload Complete" 
                  color="green" 
                />
                <ProgressBar 
                  progress={generationProgress} 
                  label="Generating questions with AI" 
                  color="orange" 
                />
              </>
            )}
          </div>
        )}
      </div>

      {!showQuestions ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 gap-8">
              <FileUploadSection
                files={files}
                selectedFileIds={selectedFileIds}
                handleFileUpload={handleFileUpload}
                removeFile={removeFile}
                toggleFileSelection={toggleFileSelection}
              />

              <ExamSettingsForm
                generateQuestions={generateQuestions}
                isGenerating={isGenerating}
                selectedFileIds={selectedFileIds}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">
                Generated Questions
              </h1>
              <p className="text-gray-600 mt-2">
                Review the generated questions and select the ones you want to add to your collection
              </p>
            </div>
            <button
              onClick={goBackToFileSelection}
              className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to PDF Selection
            </button>
          </div>

          <GeneratedQuestions
            questions={questions}
            saveSelectedQuestions={saveSelectedQuestions}
          />
        </>
      )}
    </div>
  );
}