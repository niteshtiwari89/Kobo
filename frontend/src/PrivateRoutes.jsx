import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If there is no token, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the protected component
  return element;
};

export default PrivateRoute;
