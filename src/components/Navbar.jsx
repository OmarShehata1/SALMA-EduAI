import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">SALMA</Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">Home</Link>
            <Link to="/create" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">Create Exam</Link>
            <Link to="/grades" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">Grades</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}