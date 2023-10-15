import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children }) => {
  // Extract user and loading status from context
  const { user, loading } = useUser();

  // Display loading message while verifying user status
  if (loading) {
    return <p>Loading...</p>; 
  }

  // Check if user is authenticated
  return user && user.username ? (
    // If yes: Render child components, providing them the user data
    React.cloneElement(children, { user })
  ) : (
    // If no: Redirect to the login page
    <Navigate to="/login" />
  );
};

export default PrivateRoute;


