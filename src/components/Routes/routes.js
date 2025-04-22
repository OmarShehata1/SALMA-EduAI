// routes.js - Example of secure routing setup
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import StudentGrades from '../components/StudentGrades/StudentGrades';
import TeacherGrades from '../pages/Grades'; // Your existing teacher component
import Login from '../pages/Login';

// Protected route component that checks user role
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) {
    return <div>Loading authentication status...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}

// Example routes configuration
const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/student/grades',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <StudentGrades />
      </ProtectedRoute>
    )
  },
  {
    path: '/teacher/grades',
    element: (
      <ProtectedRoute allowedRoles={['teacher']}>
        <TeacherGrades />
      </ProtectedRoute>
    )
  }
];

export default routes;