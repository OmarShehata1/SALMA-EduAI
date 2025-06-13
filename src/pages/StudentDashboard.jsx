import { useState } from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import TeacherList from "../components/StudentDashboard/TeacherList";
import ExamsOverview from "../components/StudentDashboard/ExamsOverview";
import ExamDetails from "../components/StudentDashboard/ExamDetails";
import SubmitAppeal from "../components/StudentDashboard/SubmitAppeal";
import StudentProfile from "../components/StudentDashboard/StudentProfile";

export default function StudentDashboard() {
  const [currentPage, setCurrentPage] = useState("teachers");
  const [selectedExam, setSelectedExam] = useState(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "teachers":
        return <TeacherList />;
      case "exams":
        return (
          <ExamsOverview
            onExamSelect={(exam) => {
              setSelectedExam(exam);
              setCurrentPage("exam-details");
            }}
          />
        );
      case "exam-details":
        return (
          <ExamDetails
            exam={selectedExam}
            onBack={() => setCurrentPage("exams")}
            onAppeal={(examId, questionNumber) => {
              setSelectedExam({ ...selectedExam, appealQuestionNumber: questionNumber });
              setCurrentPage("appeal");
            }}
          />
        );
      case "appeal":
        return (
          <SubmitAppeal
            preSelectedExam={selectedExam}
            onBack={() => setCurrentPage("exams")}
          />
        );
      case "profile":
        return <StudentProfile />;
      default:
        return <TeacherList />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white mt-16">
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderCurrentPage()}
          </div>
        </div>
      </div>
    </div>
  );
}
