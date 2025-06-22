// main component for the Grades page
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { FileUpload } from "./FileUpload";
import { StudentsTable } from "./StudentsTable";
import { StudentDetail } from "./StudentDetail";
import { EmptyState } from "./EmptyState";
import { ExamSelector } from "./ExamSelector";

export default function Grades() {
  const [files, setFiles] = useState([]);
  const [studentsData, setStudentsData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isLoadingExams, setIsLoadingExams] = useState(false);

  // You'll need to replace this with actual teacher ID from your app
  const teacherId = "6857e47770f7a073fd047d19"; // Replace with actual teacher ID

  // Fetch teacher's exams on component mount
  useEffect(() => {
    fetchTeacherExams();
  }, []);

  const fetchTeacherExams = async () => {
    setIsLoadingExams(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/teachers/${teacherId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch exams: ${response.status}`);
      }

      const data = await response.json();
      console.log("Teacher exams data:", data);

      setExams(data.exams || []);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("Failed to load exams. Please try again.");
    } finally {
      setIsLoadingExams(false);
    }
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    // Reset other states when selecting a new exam
    setFiles([]);
    setStudentsData(null);
    setSelectedStudent(null);
    setError(null);
  };

  const handleEvaluate = async () => {
    if (!selectedExam) {
      setError("Please select an exam first");
      return;
    }

    if (files.length === 0) {
      setError("Please upload at least one answer sheet");
      return;
    }

    setIsEvaluating(true);
    setError(null);
    setStudentsData(null);
    setSelectedStudent(null);

    try {
      // Process each uploaded file as a different student's exam
      const gradingResults = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Generate a temporary student ID or use actual student ID
        const studentId = `671aef5055912c5627ef8d10`; // You might want to make this dynamic

        // Create FormData for the grading endpoint
        const formData = new FormData();
        formData.append("images", file);

        // Call the grading endpoint with the selected exam ID
        const response = await fetch(
          `http://localhost:5000/teachers/${teacherId}/exams/${selectedExam._id}/grade/${studentId}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Failed to grade exam for student ${i + 1}`
          );
        }

        const gradingData = await response.json();
        console.log("Grading result:", gradingData);

        // Handle the new response structure
        gradingResults.push({
          id: `${studentId}_${i}`, // Make unique ID for multiple files
          name: `Student ${i + 1}`,
          totalGrade: gradingData.total_grade,
          maxTotalGrade: gradingData.max_total_grade,
          percentage: (
            (gradingData.total_grade / gradingData.max_total_grade) *
            100
          ).toFixed(1),
          questionDetails: gradingData.question_details || [],
          fileName: file.name, // Store original file name
        });
      }

      // Set the processed student data
      setStudentsData(gradingResults);
    } catch (err) {
      console.error("Error during evaluation:", err);
      setError(
        err.message || "Failed to evaluate submissions. Please try again."
      );
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
      <Header />

      {/* Exam Selection Section */}
      <div className="mb-8">
        <ExamSelector
          exams={exams}
          selectedExam={selectedExam}
          onExamSelect={handleExamSelect}
          isLoading={isLoadingExams}
          error={error}
        />
      </div>

      {/* Only show file upload and grading if an exam is selected */}
      {selectedExam && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
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
            )}

            {studentsData ? (
              <StudentsTable
                studentsData={studentsData}
                handleStudentClick={handleStudentClick}
              />
            ) : (
              <EmptyState />
            )}

            {selectedStudent && (
              <StudentDetail selectedStudent={selectedStudent} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
