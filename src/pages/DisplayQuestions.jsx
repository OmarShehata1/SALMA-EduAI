import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionsDisplay/QuestionCard";
import QuestionEditor from "../components/QuestionGenerator/QuestionEditor";
import NotificationManager from "../components/Notification";

export default function QuestionsDisplay() {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [filter, setFilter] = useState("all");
  const [examName, setExamName] = useState("");
  const [fullMark, setFullMark] = useState(100);
  const [showExamForm, setShowExamForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const location = useLocation();
  const apiUrl = "http://localhost:5000";

  // Initialize notification manager
  const { addNotification, NotificationList } = NotificationManager();

  useEffect(() => {
    // Load user information and extract teacher ID
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Check different possible ID fields
        const id = user.id || user._id || user.teacherId;
        if (id) {
          setTeacherId(id);
        } else {
          console.warn("Could not find teacher ID in user object");
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }

    // Load questions from sessionStorage
    const savedQuestions = sessionStorage.getItem("selectedQuestions");
    const initialQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];

    // Check if we're coming from the generator with new questions
    if (location.state?.newQuestions) {
      // Combine existing questions with new ones, avoiding duplicates by ID
      const combinedQuestions = [
        ...initialQuestions,
        ...location.state.newQuestions.filter(
          (newQ) =>
            !initialQuestions.some((existingQ) => existingQ.id === newQ.id)
        ),
      ];
      setQuestions(combinedQuestions);
      sessionStorage.setItem(
        "selectedQuestions",
        JSON.stringify(combinedQuestions)
      );

      // Clear location state to prevent reappending on refresh
      window.history.replaceState({}, document.title);
    } else {
      setQuestions(initialQuestions);
    }
  }, [location.state]);

  // Get current teacher ID - with fallback
  const getCurrentTeacherId = () => {
    if (teacherId) return teacherId;

    // If teacherId state is not set, try to get it directly from localStorage
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.id || user._id || user.teacherId || "fallback-teacher-id";
      }
    } catch (error) {
      console.error("Error accessing teacher ID:", error);
    }

    // If all else fails, return a fallback ID or show an error
    addNotification(
      "Could not determine teacher ID. Please login again.",
      "error"
    );
    return "fallback-teacher-id";
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleSaveEdit = (editedQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q.id === editedQuestion.id ? editedQuestion : q
    );
    setQuestions(updatedQuestions);
    sessionStorage.setItem(
      "selectedQuestions",
      JSON.stringify(updatedQuestions)
    );
    setEditingQuestion(null);
    addNotification("Question updated successfully", "success");
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((q) => q.id !== questionId);
      setQuestions(updatedQuestions);
      sessionStorage.setItem(
        "selectedQuestions",
        JSON.stringify(updatedQuestions)
      );
      addNotification("Question deleted successfully", "info");
    }
  };

  const createAndSaveExam = async () => {
    if (!showExamForm) {
      console.log("DEBUG: First click - showing exam form modal");
      // First click - show the form modal
      setShowExamForm(true);
      return;
    }
  
    console.log("DEBUG: Form submitted with values:", { examName, fullMark });
    console.log("DEBUG: Available questions:", filteredQuestions.length);
  
    // Form submit handler
    if (filteredQuestions.length === 0) {
      console.log("DEBUG: No questions available - showing warning");
      addNotification("No questions available to save", "warning");
      return;
    }
  
    if (!examName.trim()) {
      console.log("DEBUG: Empty exam name - showing warning");
      addNotification("Please enter an exam name", "warning");
      return;
    }
  
    try {
      console.log("DEBUG: Starting exam creation process");
      setIsLoading(true);
      const currentTeacherId = getCurrentTeacherId();
      console.log("DEBUG: Using teacher ID:", currentTeacherId);
  
      // Step 1: Create an empty exam with the name and full mark from the modal
      console.log("DEBUG: Creating empty exam with name:", examName, "and full mark:", fullMark);
      const createExamEndpoint = `${apiUrl}/teachers/${currentTeacherId}/exams/create`;
      console.log("DEBUG: Calling endpoint:", createExamEndpoint);
      
      const createExamResponse = await fetch(createExamEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: examName,
          full_mark: fullMark
        }),
      });
  
      console.log("DEBUG: Create exam response status:", createExamResponse.status);
      
      if (!createExamResponse.ok) {
        const errorData = await createExamResponse.json();
        console.error("DEBUG: Failed to create exam. Error:", errorData);
        throw new Error(errorData.message || "Failed to create empty exam");
      }
  
      const createExamData = await createExamResponse.json();
      console.log("DEBUG: Create exam response data:", createExamData);
      
      const examId = createExamData.examId;
      
      if (!examId) {
        console.error("DEBUG: No exam ID in response:", createExamData);
        throw new Error("Failed to retrieve exam ID from response");
      }
      
      console.log("DEBUG: Successfully created exam with ID:", examId);
      
      // Store the exam ID for future reference
      localStorage.setItem("examId", examId);
      console.log("DEBUG: Stored exam ID in localStorage");
      
      // Step 2: Add each question to the exam one by one
      let finalBase64Pdf = null;
      
      console.log("DEBUG: Adding", filteredQuestions.length, "questions to exam");
      
      for (let i = 0; i < filteredQuestions.length; i++) {
        const question = filteredQuestions[i];
        console.log(`DEBUG: Adding question ${i+1}/${filteredQuestions.length}:`, question.id);
        
        // Map difficulty to grade
        let grade;
        switch (question.difficulty) {
          case "easy": grade = 1; break;
          case "medium": grade = 2; break;
          case "hard": grade = 3; break;
          default: grade = 1;
        }
        
        console.log("DEBUG: Mapped difficulty", question.difficulty, "to grade", grade);
        
        const addQuestionEndpoint = `${apiUrl}/teachers/${currentTeacherId}/exams/${examId}/genqa/save`;
        console.log("DEBUG: Calling endpoint:", addQuestionEndpoint);
        
        const addQuestionResponse = await fetch(addQuestionEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question.question,
            answer: question.answer,
            grade: question.grade || grade,
          }),
        });
        
        console.log("DEBUG: Add question response status:", addQuestionResponse.status);
        
        if (!addQuestionResponse.ok) {
          const errorData = await addQuestionResponse.json();
          console.error(`DEBUG: Failed to add question ${i+1}. Error:`, errorData);
          // Continue with other questions even if one fails
          continue;
        }
        
        const questionData = await addQuestionResponse.json();
        console.log(`DEBUG: Successfully added question ${i+1}. Response:`, 
          questionData.question ? questionData.question._id : "No question data");
        
        // Keep the latest PDF data from the response
        if (questionData.base64Pdf) {
          console.log("DEBUG: Received updated PDF data");
          finalBase64Pdf = questionData.base64Pdf;
        } else {
          console.log("DEBUG: No PDF data in response for this question");
        }
      }
      
      console.log("DEBUG: All questions processed");
      
      // Clear questions after successful submission
      console.log("DEBUG: Clearing questions from state and session storage");
      setQuestions([]);
      sessionStorage.removeItem("selectedQuestions");
  
      // Reset form and close it
      console.log("DEBUG: Resetting form and closing modal");
      setExamName("");
      setFullMark(100);
      setShowExamForm(false);
  
      // Show success notification
      console.log("DEBUG: Showing success notification");
      addNotification(
        `Exam "${examName}" created and questions added successfully!`,
        "success"
      );
  
      // Display PDF if available
      if (finalBase64Pdf) {
        console.log("DEBUG: Processing final PDF data for display and download");
        // Convert Base64 to Blob
        const byteCharacters = atob(finalBase64Pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
  
        // Create Object URL and Open in New Tab
        const blobUrl = URL.createObjectURL(blob);
        console.log("DEBUG: Created blob URL for PDF:", blobUrl);
        window.open(blobUrl, "_blank"); // Open PDF in a new tab
        console.log("DEBUG: Opened PDF in new tab");
  
        // Create and trigger download
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = `${examName}.pdf`;
        console.log("DEBUG: Triggering PDF download with filename:", `${examName}.pdf`);
        downloadLink.click();
      } else {
        console.log("DEBUG: No final PDF data available");
        addNotification(
          "Exam saved but PDF not returned. Please check with administrator.",
          "warning"
        );
      }
    } catch (error) {
      console.error("DEBUG: Error in createAndSaveExam:", error);
      addNotification(`Failed to create exam: ${error.message}`, "error");
      setError(error.message);
    } finally {
      console.log("DEBUG: Exam creation process finished");
      setIsLoading(false);
    }
  };

  const filteredQuestions =
    filter === "all"
      ? questions
      : questions.filter((q) => q.difficulty === filter);

  return (
    <div className="container mx-auto px-4 py-8 mt-12 mb-10">
      {/* Notification component */}
      <NotificationList />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Your Questions</h1>

        <div className="flex space-x-4">
          <Link
            to="/create"
            state={{ existingQuestions: questions }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
          >
            Generate More Questions
          </Link>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center">
          <span className="text-gray-700 font-medium mr-3">
            Filter by difficulty:
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("easy")}
              className={`px-3 py-1 rounded-md ${
                filter === "easy"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setFilter("medium")}
              className={`px-3 py-1 rounded-md ${
                filter === "medium"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilter("hard")}
              className={`px-3 py-1 rounded-md ${
                filter === "hard"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      {/* Teacher ID warning if not found */}
      {!teacherId && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Teacher ID not found. Some features may not work properly.
                Please log in again.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      {filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onEdit={handleEditQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            No questions found
          </h2>
          <p className="mt-1 text-gray-500">
            {filter === "all"
              ? "You haven't created any questions yet."
              : `No ${filter} questions available.`}
          </p>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
            >
              Show all questions
            </button>
          )}
        </div>
      )}

      {/* Question Editor Modal */}
      {editingQuestion && (
        <QuestionEditor
          question={editingQuestion}
          onSave={handleSaveEdit}
          onCancel={() => setEditingQuestion(null)}
        />
      )}

      {/* Create and Save Exam Form */}
      {showExamForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Exam</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createAndSaveExam();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="examName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Exam Name
                </label>
                <input
                  type="text"
                  id="examName"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fullMark"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Full Mark
                </label>
                <input
                  type="number"
                  id="fullMark"
                  value={fullMark}
                  onChange={(e) => setFullMark(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowExamForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !examName ||
                    filteredQuestions.length === 0 ||
                    !teacherId
                  }
                  className={`px-4 py-2 rounded-md font-medium ${
                    isLoading ||
                    !examName ||
                    filteredQuestions.length === 0 ||
                    !teacherId
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500 text-white"
                  }`}
                >
                  {isLoading ? "Creating..." : "Create & Save Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={createAndSaveExam}
          disabled={filteredQuestions.length === 0 || !teacherId || isLoading}
          className={`py-2 px-4 rounded-md font-medium ${
            filteredQuestions.length === 0 || !teacherId || isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 text-white"
          }`}
        >
          {isLoading ? "Processing..." : "Create & Save Exam"}
        </button>
      </div>
    </div>
  );
}
