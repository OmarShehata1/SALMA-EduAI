import { useState } from "react";
import Sidebar from "../components/InstructorDashboard/Sidebar";
import GroupOverview from "../components/InstructorDashboard/GroupOverview";
import GroupDetails from "../components/InstructorDashboard/GroupDetails";
import StudentDetails from "../components/InstructorDashboard/StudentDetails";
import SubjectStudents from "../components/InstructorDashboard/SubjectStudents";
import StudentExams from "../components/InstructorDashboard/StudentExams";
import CreateExam from "../components/InstructorDashboard/CreateExam";
import CorrectExam from "../components/InstructorDashboard/CorrectExam";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Appeals from "../components/InstructorDashboard/Appeals";

export default function InstructorDashboard() {
  const [currentPage, setCurrentPage] = useState("overview");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "overview":
        return (
          <GroupOverview
            onGroupSelect={(group) => {
              // Group is actually a subject with the new structure
              setSelectedSubject(group);
              setCurrentPage("subject-students");
            }}
          />
        );
      case "subject-students":
        return (
          <SubjectStudents
            subject={selectedSubject}
            onBack={() => setCurrentPage("overview")}
            onStudentSelect={(student, subject) => {
              setSelectedStudent(student);
              setSelectedSubject(subject);
              setCurrentPage("student-exams");
            }}
          />
        );
      case "student-exams":
        return (
          <StudentExams
            student={selectedStudent}
            subject={selectedSubject}
            onBack={() => setCurrentPage("subject-students")}
          />
        );
      case "group-details":
        return (
          <GroupDetails
            group={selectedGroup}
            onStudentSelect={(student) => {
              setSelectedStudent(student);
              setCurrentPage("student-details");
            }}
            onBack={() => setCurrentPage("overview")}
          />
        );
      case "student-details":
        return (
          <StudentDetails
            student={selectedStudent}
            group={selectedGroup}
            onBack={() => setCurrentPage("group-details")}
          />
        );
      case "create-exam":
        return <CreateExam />;
      case "correct-exam":
        return <CorrectExam />;
      case "profile":
        return <InstructorProfile />;
      case "appeals":
        return <Appeals />;
      default:
        return <GroupOverview onGroupSelect={(group) => {
          setSelectedSubject(group);
          setCurrentPage("subject-students");
        }} />;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-100">
      <div className="flex">
        {" "}
        <div className="fixed left-0 top-20 bottom-0 w-80 z-20">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>{" "}
        <div className="flex-1 ml-80 p-6 pb-12">
          <div className="max-w-7xl mx-auto">{renderCurrentPage()}</div>
        </div>
      </div>
    </div>
  );
}
