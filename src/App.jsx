import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateExam from './pages/CreateExam';
import Grades from './pages/Grades';
import Login from './components/Login';
import Register from './components/Register';
import QuestionGenerator from './pages/GenerateQuestion';
import QuestionsDisplay from './pages/DisplayQuestions';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateExam />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/generate" element={<QuestionGenerator />} />
          <Route path="/questions" element={<QuestionsDisplay />} />
          {/* <Route path="/" element={<Navigate to="/generate" />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}