import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <p className="mt-2 text-gray-600">Email: contact@exampro.com</p>
            <p className="text-gray-600">Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link to="/create" className="text-gray-600 hover:text-gray-900">Create Exam</Link></li>
              <li><Link to="/grades" className="text-gray-600 hover:text-gray-900">Grades</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-gray-600">
          <p>© 2025 SALMA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}