import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateExam from './pages/CreateExam';
import Grades from './pages/Grades';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateExam />} />
          <Route path="/grades" element={<Grades />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}