// CreateFullExamPage.jsx - Main Component
import { useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FileUploadSection from "../components/fullExam/FileUploadSection";
import ExamSettingsForm from "../components/fullExam/ExamSettingsForm";
import GeneratedQuestions from "../components/fullExam/GeneratedQuestions";

export default function CreateFullExamPage() {
  const [files, setFiles] = useState([]);
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("Medium");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const navigate = useNavigate();

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

  // Generate questions based on selected files and settings
  const generateQuestions = () => {
    if (selectedFileIds.length === 0) return;

    setIsGenerating(true);

    // Simulate API call with selected files
    setTimeout(() => {
      // Mock data - in a real app, this would come from your backend
      const mockQuestions = Array.from({ length: numQuestions }, (_, i) => ({
        id: Math.random().toString(36).substring(2, 15), // Unique ID for each question
        question: `Sample ${difficulty.toLowerCase()} question about ${
          topic || "selected topic"
        } (#${i + 1})`,
        answer: `Sample answer for question #${i + 1} about ${
          topic || "this topic"
        }.`,
        difficulty: difficulty.toLowerCase(),
        isSelected: true, // Mark all new questions as selected by default
      }));

      setQuestions(mockQuestions);
      setIsGenerating(false);

      // Navigate to Questions page with the new questions
      navigate("/questions", {
        state: {
          newQuestions: mockQuestions, // Send the newly generated questions
          addToExisting: true, // Flag to indicate these should be added to existing questions
        },
      });
    }, 1500);
  };

  // Handle saving selected questions
  const saveSelectedQuestions = (selectedQuestions) => {
    // In a real app, you would save these to your backend
    console.log("Saving questions:", selectedQuestions);
    // Then navigate to a confirmation or next page
    navigate("/exam/preview", { state: { questions: selectedQuestions } });
  };

  // Toggle back to file selection view
  const goBackToFileSelection = () => {
    setShowQuestions(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Create Full Exam
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 mb-6">
          Upload PDF files or documents to generate a complete exam. Our AI will
          analyze your content and create questions based on your
          specifications. You can then review, edit, or delete questions before
          finalizing your exam.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="text-blue-500 w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Upload your content files in PDF format. Set the number of
              questions and difficulty level, then generate your exam. You can
              edit or remove questions as needed.
            </p>
          </div>
        </div>
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
                topic={topic}
                setTopic={setTopic}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                generateQuestions={generateQuestions}
                isGenerating={isGenerating}
                selectedFileIds={selectedFileIds}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">
              Question Generator
            </h1>
            <button
              onClick={goBackToFileSelection}
              className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to PDF
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
