import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QuestionEditor from "../components/QuestionGenerator/QuestionEditor";
import GeneratedQuestion from "../components/QuestionGenerator/GeneratedQuestion";
import { usePDFContext } from "../context/PDFContext";

export default function QuestionGenerator() {
  const { selectedText, currentPdf } = usePDFContext();

  const [topic, setTopic] = useState(selectedText || "");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const topicInputRef = useRef(null);
  const url = "https://localhost:7102";
  useEffect(() => {
    if (selectedText && topicInputRef.current) {
      topicInputRef.current.focus();
    }
  }, [selectedText]);

  const generateQuestions = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Updated API endpoint to match our backend
      const response = await fetch(
        `${url}/api/QuestionGenerator/generate-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfName: currentPdf ? currentPdf.name : null,
            selectedText: topic,
            difficulty: difficulty,
            numQuestions: numQuestions,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Process the returned questions
      // The API now returns questions with questionText property
      const formattedQuestions = data.questions.map((q) => ({
        id: q.id,
        question: q.questionText, // Map backend "questionText" to frontend "question"
        answer: q.answer,
        isSelected: true,
        difficulty: q.difficulty,
        source: q.source || (currentPdf ? currentPdf.name : "Unknown source"),
      }));

      setGeneratedQuestions(formattedQuestions);
    } catch (err) {
      console.error("Error generating questions:", err);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setGeneratedQuestions(
      generatedQuestions.map((q) =>
        q.id === id ? { ...q, isSelected: !q.isSelected } : q
      )
    );
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleSaveEdit = (editedQuestion) => {
    setGeneratedQuestions(
      generatedQuestions.map((q) =>
        q.id === editedQuestion.id ? editedQuestion : q
      )
    );
    setEditingQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleSaveQuestions = () => {
    const selectedQuestions = generatedQuestions.filter((q) => q.isSelected);
    navigate("/questions", {
      state: {
        newQuestions: selectedQuestions,
      },
    });
  };

  const handleBackToPDF = () => {
    navigate("/create");
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Question Generator</h1>
        <button
          onClick={handleBackToPDF}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to PDF
        </button>
      </div>

      {currentPdf && (
        <div className="mb-4 text-sm text-gray-600">
          <p>Source: {currentPdf.name}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <textarea
              ref={topicInputRef}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for the questions"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={generateQuestions}
          disabled={!topic || isGenerating}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            !topic || isGenerating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isGenerating ? "Generating..." : "Generate Questions"}
        </button>

        {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
      </div>

      {generatedQuestions.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Questions</h2>
            <button
              onClick={handleSaveQuestions}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium"
            >
              Save Selected Questions
            </button>
          </div>

          <div className="space-y-4">
            {generatedQuestions.map((question) => (
              <GeneratedQuestion
                key={question.id}
                question={question}
                onCheckboxChange={handleCheckboxChange}
                onEdit={handleEditQuestion}
              />
            ))}
          </div>
        </div>
      )}

      {editingQuestion && (
        <QuestionEditor
          question={editingQuestion}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}
