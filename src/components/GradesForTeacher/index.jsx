// main component for the Grades page
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Header } from "./Header";
import { FileUpload } from "./FileUpload";
import { StudentsTable } from "./StudentsTable";
import { StudentDetail } from "./StudentDetail";
import { EmptyState } from "./EmptyState";
import { ExamSelector } from "./ExamSelector";
import { StudentSelector } from "./StudentSelector";

export default function Grades() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [studentsData, setStudentsData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isLoadingExams, setIsLoadingExams] = useState(false);
  const [selectedStudentForGrading, setSelectedStudentForGrading] =
    useState(null);
  // Helper function to safely get current user
  const getCurrentUser = useCallback(() => {
    try {
      return currentUser || JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }, [currentUser]);

  const fetchTeacherExams = useCallback(async () => {
    setIsLoadingExams(true);
    setError(null);

    try {
      const user = getCurrentUser();

      if (!user || !user.id || !user.token) {
        throw new Error("User not authenticated. Please log in again.");
      }

      const response = await fetch(
        `http://localhost:5000/teachers/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to fetch exams: ${response.status}`);
      }

      const data = await response.json();
      console.log("Teacher exams data:", data);

      setExams(data.exams || []);
    } catch (err) {
      console.error("Error fetching exams:", err);

      // Handle authentication errors
      if (
        err.message.includes("not authenticated") ||
        err.message.includes("Authentication failed")
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setError("Failed to load exams. Please try again.");
    } finally {
      setIsLoadingExams(false);
    }
  }, [getCurrentUser, navigate]);

  // Check authentication on component mount
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.id || !user.token) {
      setError("Authentication required. Please log in again.");
      navigate("/login");
      return;
    }
    fetchTeacherExams();
  }, [getCurrentUser, navigate, fetchTeacherExams]);
  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    // Reset other states when selecting a new exam
    setFiles([]);
    setStudentsData(null);
    setSelectedStudent(null);
    setSelectedStudentForGrading(null);
    setError(null);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudentForGrading(student);
    setError(null);
  };
  const handleEvaluate = async () => {
    if (!selectedExam) {
      setError("Please select an exam first");
      return;
    }

    if (!selectedStudentForGrading) {
      setError("Please select a student first");
      return;
    }

    if (files.length === 0) {
      setError("Please upload answer sheet photos");
      return;
    }

    // Validate that the number of uploaded photos matches the number of questions
    if (files.length !== selectedExam.num_of_questions) {
      setError(
        `This exam has ${selectedExam.num_of_questions} questions. Please upload exactly ${selectedExam.num_of_questions} photos (one photo per question).`
      );
      return;
    }

    setIsEvaluating(true);
    setError(null);
    setStudentsData(null);
    setSelectedStudent(null);

    try {
      const user = getCurrentUser();

      if (!user || !user.id || !user.token) {
        throw new Error("User not authenticated. Please log in again.");
      }

      const studentId =
        selectedStudentForGrading.id || selectedStudentForGrading._id;

      // Create FormData for all the question photos
      const formData = new FormData();
      // Add all photos to the form data - each photo represents one question answer
      files.forEach((file) => {
        formData.append("images", file);
      });

      console.log(
        `Uploading ${files.length} photos for ${
          selectedExam.num_of_questions
        } questions for student: ${
          selectedStudentForGrading.name || selectedStudentForGrading.firstName
        } (ID: ${studentId})`
      );

      // Call the grading endpoint with all photos at once
      const response = await fetch(
        `http://localhost:5000/teachers/${user.id}/exams/${selectedExam._id}/grade/${studentId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        let errorMessage = "Failed to grade exam";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const gradingData = await response.json();
      console.log("Grading result:", gradingData); // Process the single student's grading result
      const studentResult = {
        id: studentId,
        name:
          selectedStudentForGrading.name ||
          selectedStudentForGrading.firstName +
            " " +
            (selectedStudentForGrading.lastName || ""),
        totalGrade: gradingData.total_grade,
        maxTotalGrade: gradingData.max_total_grade,
        percentage: (
          (gradingData.total_grade / gradingData.max_total_grade) *
          100
        ).toFixed(1),
        questionDetails: gradingData.question_details || [],
        examTitle: selectedExam.title,
      };

      // Set the processed student data as an array with one student
      setStudentsData([studentResult]);
    } catch (err) {
      console.error("Error during evaluation:", err);

      // Handle authentication errors
      if (
        err.message.includes("not authenticated") ||
        err.message.includes("Authentication failed")
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setError(err.message || "Failed to evaluate exam. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleStudentClick = async (studentId) => {
    try {
      setError(null);

      // Find the student data
      const studentData = studentsData.find((s) => s.id === studentId);
      if (!studentData) {
        setError("Student data not found");
        return;
      }

      // Use the detailed question information already available from the grading response
      const detailedQuestions = studentData.questionDetails.map(
        (detail, index) => ({
          questionId: detail.question_id,
          questionText: detail.question_text,
          grade: detail.grade,
          maxGrade: detail.max_grade,
          explanation: detail.explanation,
          questionNumber: index + 1,
        })
      );

      setSelectedStudent({
        studentId: studentId,
        studentName: studentData.name,
        fileName: studentData.fileName,
        totalGrade: studentData.totalGrade,
        maxTotalGrade: studentData.maxTotalGrade,
        percentage: studentData.percentage,
        questions: detailedQuestions,
      });
    } catch (err) {
      console.error("Error processing student details:", err);
      setError("Failed to load student details");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 flex-1 mt-8">
      <Header selectedExam={selectedExam} />
      {/* Exam Selection Section */}
      <div className="mb-8">
        <ExamSelector
          exams={exams}
          selectedExam={selectedExam}
          onExamSelect={handleExamSelect}
          isLoading={isLoadingExams}
          error={error}
        />
      </div>{" "}
      {/* Only show file upload and grading if an exam is selected */}
      {selectedExam && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {/* Student Selection */}
            <StudentSelector
              teacherId={getCurrentUser()?.id}
              selectedStudent={selectedStudentForGrading}
              onStudentSelect={handleStudentSelect}
              error={null}
            />

            <FileUpload
              files={files}
              setFiles={setFiles}
              handleEvaluate={handleEvaluate}
              isEvaluating={isEvaluating}
              selectedExam={selectedExam}
            />
          </div>

          <div className="lg:col-span-2">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}            {studentsData ? (
              <StudentsTable
                studentsData={studentsData}
                handleStudentClick={handleStudentClick}
                selectedExam={selectedExam}
              />
            ) : (
              <EmptyState />
            )}            {selectedStudent && (
              <StudentDetail 
                selectedStudent={selectedStudent} 
                selectedExam={selectedExam}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
