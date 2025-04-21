import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionsDisplay/QuestionCard";
import QuestionEditor from "../components/QuestionGenerator/QuestionEditor";

export default function QuestionsDisplay() {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentExamId, setCurrentExamId] = useState(null);
  const [isCreatingExam, setIsCreatingExam] = useState(false);
  const [isSubmittingExam, setIsSubmittingExam] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Load questions from sessionStorage
    const savedQuestions = sessionStorage.getItem("selectedQuestions");
    const initialQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];
    
    // Check if we're coming from the generator with new questions
    if (location.state?.newQuestions) {
      // Combine existing questions with new ones, avoiding duplicates by ID
      const combinedQuestions = [
        ...initialQuestions,
        ...location.state.newQuestions.filter(
          newQ => !initialQuestions.some(existingQ => existingQ.id === newQ.id)
        )
      ];
      setQuestions(combinedQuestions);
      sessionStorage.setItem("selectedQuestions", JSON.stringify(combinedQuestions));
      
      // Clear location state to prevent reappending on refresh
      window.history.replaceState({}, document.title);
    } else {
      setQuestions(initialQuestions);
    }

    // Check if there's a current exam ID in sessionStorage
    const savedExamId = sessionStorage.getItem("currentExamId");
    if (savedExamId) {
      setCurrentExamId(savedExamId);
    }
  }, [location.state]);

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleSaveEdit = (editedQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q.id === editedQuestion.id ? editedQuestion : q
    );
    setQuestions(updatedQuestions);
    sessionStorage.setItem("selectedQuestions", JSON.stringify(updatedQuestions));
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((q) => q.id !== questionId);
      setQuestions(updatedQuestions);
      sessionStorage.setItem(
        "selectedQuestions",
        JSON.stringify(updatedQuestions)
      );
    }
  };

  const createEmptyExam = async () => {
    try {
      setIsCreatingExam(true);
      
      // Call the API to create an empty exam
      const response = await fetch('https://localhost:7102/api/exams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Exam',
          description: 'Generated exam',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create exam');
      }
      
      const examData = await response.json();
      
      // Save the exam ID
      setCurrentExamId(examData.id);
      sessionStorage.setItem("currentExamId", examData.id);
      
      // Show success message
      alert('Empty exam created successfully!');
    } catch (error) {
      console.error('Error creating exam:', error);
      alert(`Failed to create exam: ${error.message}`);
    } finally {
      setIsCreatingExam(false);
    }
  };

  const submitExamWithQuestions = async () => {
    if (!currentExamId || filteredQuestions.length === 0) {
      alert('No exam or questions available to submit');
      return;
    }
    
    try {
      setIsSubmittingExam(true);
      
      // Transform questions to match the backend format if needed
      const questionsToSubmit = filteredQuestions.map(q => ({
        id: q.id,
        questionText: q.question, // Map frontend "question" to backend "questionText"
        answer: q.answer,
        difficulty: q.difficulty,
        source: q.source,
        isSelected: true
      }));
      
      // Call the API to add questions to the exam
      const response = await fetch(`https://localhost:7102/api/exams/${currentExamId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: currentExamId,
          questions: questionsToSubmit
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add questions to exam');
      }
      
      const examData = await response.json();
      
      // Clear the exam ID and questions after successful submission
      setCurrentExamId(null);
      sessionStorage.removeItem("currentExamId");
      setQuestions([]);
      sessionStorage.removeItem("selectedQuestions");
      
      // Show success message
      alert(`Exam submitted successfully! Exam ID: ${examData.id}`);
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert(`Failed to submit exam: ${error.message}`);
    } finally {
      setIsSubmittingExam(false);
    }
  };

  const filteredQuestions =
    filter === "all"
      ? questions
      : questions.filter((q) => q.difficulty === filter);

  return (
    <div className="container mx-auto px-4 py-8 mt-12 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Your Questions</h1>
        
        <Link
          to="/create"
          state={{ existingQuestions: questions }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
        >
          Generate More Questions
        </Link>
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

      <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={createEmptyExam}
          disabled={isCreatingExam || currentExamId !== null}
          className={`py-2 px-4 rounded-md font-medium ${
            currentExamId !== null || isCreatingExam
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-800 hover:bg-indigo-700 text-white"
          }`}
        >
          {isCreatingExam ? "Creating..." : "Create Empty Exam"}
        </button>
        
        <button
          onClick={submitExamWithQuestions}
          disabled={!currentExamId || isSubmittingExam || filteredQuestions.length === 0}
          className={`py-2 px-4 rounded-md font-medium ${
            !currentExamId || isSubmittingExam || filteredQuestions.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 text-white"
          }`}
        >
          {isSubmittingExam ? "Submitting..." : "Submit Exam"}
        </button>
      </div>
      
      {currentExamId && (
        <div className="mt-2 text-right text-sm text-gray-600">
          Current Exam ID: {currentExamId}
        </div>
      )}
    </div>
  );
}