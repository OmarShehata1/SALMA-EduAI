import { useState } from "react";
import axios from "axios";

const ExamManagement = () => {
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [examId, setExamId] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const url = "http://localhost:5000";
  // Form state for generate/save exam
  const [examData, setExamData] = useState({
    exam_name: "",
    full_mark: 0,
    questions: [],
    students: [],
  });

  // State for temporary question being added
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
    grade: 0,
  });

  // Handle input changes for exam details
  const handleExamInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({
      ...examData,
      [name]: name === "full_mark" ? Number(value) : value,
    });
  };

  // Handle input changes for current question
  const handleQuestionInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({
      ...currentQuestion,
      [name]: name === "grade" ? Number(value) : value,
    });
  };

  // Add question to the list
  const addQuestion = () => {
    if (
      !currentQuestion.question ||
      !currentQuestion.answer ||
      currentQuestion.grade <= 0
    ) {
      setError(
        "All question fields are required and grade must be greater than 0"
      );
      return;
    }

    setExamData({
      ...examData,
      questions: [...examData.questions, { ...currentQuestion }],
    });

    // Reset current question form
    setCurrentQuestion({
      question: "",
      answer: "",
      grade: 0,
    });

    setError(null);
  };

  // Remove question from the list
  const removeQuestion = (index) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions.splice(index, 1);
    setExamData({
      ...examData,
      questions: updatedQuestions,
    });
  };

  // Create empty exam
  const createEmptyExam = async () => {
    if (!teacherId) {
      setError("Teacher ID is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${url}/teachers/${teacherId}/exams/create`
      );
      setExamId(response.data.examId);
      setPdfPreview(`data:application/pdf;base64,${response.data.base64Pdf}`);
      setSuccess("Empty exam created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  // Save generated exam
  const saveGeneratedExam = async () => {
    if (!teacherId) {
      setError("Teacher ID is required");
      return;
    }

    if (!examData.exam_name) {
      setError("Exam name is required");
      return;
    }

    if (examData.questions.length === 0) {
      setError("At least one question is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${url}/teachers/${teacherId}/exams/generate/save`,
        {
          ...examData,
          num_of_questions: examData.questions.length,
        }
      );

      setExamId(response.data.exam._id);
      setSuccess("Exam saved successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save exam");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total marks
  const totalMarks = examData.questions.reduce((sum, q) => sum + q.grade, 0);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Exam Management</h1>

      {/* Teacher ID Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Teacher ID
        </label>
        <input
          type="text"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter teacher ID"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <button
          onClick={createEmptyExam}
          disabled={loading || !teacherId}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 mr-4"
        >
          Create Empty Exam
        </button>

        {examId && (
          <p className="mt-2 text-sm text-gray-600">
            Created Exam ID: <span className="font-medium">{examId}</span>
          </p>
        )}

        {pdfPreview && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">PDF Preview</h3>
            <iframe
              src={pdfPreview}
              className="w-full h-96 border border-gray-300 rounded"
              title="PDF Preview"
            />
          </div>
        )}
      </div>

      {/* Generate and Save Exam Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Generate and Save Exam</h2>

        {/* Exam Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exam Name
            </label>
            <input
              type="text"
              name="exam_name"
              value={examData.exam_name}
              onChange={handleExamInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter exam name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Mark
            </label>
            <input
              type="number"
              name="full_mark"
              value={examData.full_mark}
              onChange={handleExamInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter maximum mark"
              min="0"
            />
          </div>
        </div>

        {/* Add Question Form */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Add Question</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <textarea
                name="question"
                value={currentQuestion.question}
                onChange={handleQuestionInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question text"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer
              </label>
              <textarea
                name="answer"
                value={currentQuestion.answer}
                onChange={handleQuestionInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter answer text"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade (Points)
              </label>
              <input
                type="number"
                name="grade"
                value={currentQuestion.grade}
                onChange={handleQuestionInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter points for question"
                min="0"
              />
            </div>
            <div>
              <button
                onClick={addQuestion}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Question List */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">
            Questions ({examData.questions.length})
            {totalMarks > 0 && (
              <span className="text-sm text-gray-600 ml-2">
                Total: {totalMarks} points
              </span>
            )}
          </h3>

          {examData.questions.length === 0 ? (
            <p className="text-gray-500 italic">No questions added yet.</p>
          ) : (
            <div className="space-y-4">
              {examData.questions.map((q, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-md bg-gray-50"
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <span className="text-blue-600 font-medium">
                      {q.grade} points
                    </span>
                  </div>
                  <p className="mt-2">{q.question}</p>
                  <p className="mt-2 text-sm text-gray-700">
                    <span className="font-medium">Answer:</span> {q.answer}
                  </p>
                  <button
                    onClick={() => removeQuestion(index)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={saveGeneratedExam}
            disabled={loading || !teacherId || examData.questions.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Generated Exam"}
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamManagement;
