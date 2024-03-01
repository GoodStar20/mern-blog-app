import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector(state => state.user);
  return userInfo ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
