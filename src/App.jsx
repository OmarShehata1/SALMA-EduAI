import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateExam from "./pages/CreateExam";
import Grades from "./pages/Grades";
import Login from "./components/Home/Login";
import Register from "./components/Home/Register";
import QuestionGenerator from "./pages/GenerateQuestion";
import QuestionsDisplay from "./pages/DisplayQuestions";
import { PDFProvider } from "./context/PDFContext";
import CreateFullExam from "./pages/CreateFullExam";
import ProtectedRoute, { GuestRoute } from "./components/ProtectedRoute";
import Student from "./pages/Student";
import MyExams from "./components/myExam";

export default function App() {
  return (
    <PDFProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateExam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create/full"
                element={
                  <ProtectedRoute>
                    <CreateFullExam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/grades"
                element={
                  <ProtectedRoute>
                    <Grades />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/generate"
                element={
                  <ProtectedRoute>
                    <QuestionGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/questions"
                element={
                  <ProtectedRoute>
                    <QuestionsDisplay />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student"
                element={
                  <ProtectedRoute>
                    <Student />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam"
                element={
                  <ProtectedRoute>
                    <MyExams />
                  </ProtectedRoute>
                }
              />
              {/* Catch-all route */}
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </PDFProvider>
  );
}
