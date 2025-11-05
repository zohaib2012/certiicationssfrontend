// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('Token'); // Check if user is logged in
  if (!token) {
    return <Navigate to="/" replace />; // redirect to login if not
  }
  return children; // render the component if logged in
};

export default ProtectedRoute;
