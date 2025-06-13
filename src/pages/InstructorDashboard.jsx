import { useState } from "react";
import Sidebar from "../components/InstructorDashboard/Sidebar";
import GroupOverview from "../components/InstructorDashboard/GroupOverview";
import GroupDetails from "../components/InstructorDashboard/GroupDetails";
import StudentDetails from "../components/InstructorDashboard/StudentDetails";
import CreateExam from "../components/InstructorDashboard/CreateExam";
import CorrectExam from "../components/InstructorDashboard/CorrectExam";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Appeals from "../components/InstructorDashboard/Appeals";

export default function InstructorDashboard() {
  const [currentPage, setCurrentPage] = useState("overview");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "overview":
        return (
          <GroupOverview
            onGroupSelect={(group) => {
              setSelectedGroup(group);
              setCurrentPage("group-details");
            }}
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
        return <GroupOverview onGroupSelect={setSelectedGroup} />;
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
