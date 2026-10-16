import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap a page in this to keep logged out users (or non-admins) away from it
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-3">Access denied</h2>
        <p className="text-gray-600 mb-5">This area is only for blog admins.</p>
        <Link to="/home" className="button-style">Back to Home</Link>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
