import { useState } from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import TeacherList from "../components/StudentDashboard/TeacherList";
import TeacherSubjects from "../components/StudentDashboard/TeacherSubjects";
import SubjectExams from "../components/StudentDashboard/SubjectExams";
import ExamDetailsView from "../components/StudentDashboard/ExamDetailsView";
import ExamsOverview from "../components/StudentDashboard/ExamsOverview";
import ExamDetails from "../components/StudentDashboard/ExamDetails";
import SubmitAppeal from "../components/StudentDashboard/SubmitAppeal";
import StudentProfile from "../components/StudentDashboard/StudentProfile";

export default function StudentDashboard() {
  const [currentPage, setCurrentPage] = useState("teachers");
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "teachers":
        return (
          <TeacherList 
            onViewTeacherSubjects={(teacher) => {
              setSelectedTeacher(teacher);
              setCurrentPage("teacher-subjects");
            }}
          />
        );
      case "teacher-subjects":
        return (
          <TeacherSubjects
            teacher={selectedTeacher}
            onBack={() => setCurrentPage("teachers")}
            onViewExams={(subject, teacher) => {
              setSelectedSubject(subject);
              setSelectedTeacher(teacher); // Update teacher with full details from API
              setCurrentPage("subject-exams");
            }}
          />
        );
      case "subject-exams":
        return (
          <SubjectExams
            teacher={selectedTeacher}
            subject={selectedSubject}
            onBack={() => setCurrentPage("teacher-subjects")}
            onViewExamDetails={(exam) => {
              setSelectedExam(exam);
              setCurrentPage("exam-details-view");
            }}
          />
        );
      case "exam-details-view":
        return (
          <ExamDetailsView
            teacher={selectedTeacher}
            exam={selectedExam}
            subject={selectedSubject}
            onBack={() => setCurrentPage("subject-exams")}
            onAppeal={(examId, questionNumber, question) => {
              setSelectedExam({
                ...selectedExam,
                appealQuestionNumber: questionNumber,
                appealQuestion: question
              });
              setCurrentPage("appeal");
            }}
          />
        );
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
              setSelectedExam({
                ...selectedExam,
                appealQuestionNumber: questionNumber,
              });
              setCurrentPage("appeal");
            }}
          />
        );
      case "appeal":
        return (
          <SubmitAppeal
            preSelectedExam={selectedExam}
            onBack={() => {
              // Go back to the appropriate page based on where we came from
              if (selectedExam?.appealQuestion) {
                setCurrentPage("exam-details-view");
              } else {
                setCurrentPage("exams");
              }
            }}
          />
        );
      case "profile":
        return <StudentProfile />;
      default:
        return (
          <TeacherList 
            onViewTeacherSubjects={(teacher) => {
              setSelectedTeacher(teacher);
              setCurrentPage("teacher-subjects");
            }}
          />
        );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white">
      <div className="flex">
        <div className="fixed left-0 top-20 bottom-0 w-80 z-20">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
        <div className="flex-1 ml-80 p-6 pb-12">
          <div className="max-w-7xl mx-auto">{renderCurrentPage()}</div>
        </div>
      </div>
    </div>
  );
}
