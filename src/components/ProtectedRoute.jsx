import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

// Component that requires authentication to access
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Component that requires NOT being authenticated
export function GuestRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    // Redirect to home if already authenticated
    return <Navigate to="/" replace />;
  }
  
  return children;
}