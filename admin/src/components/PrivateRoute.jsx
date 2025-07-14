import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const tokenTime = localStorage.getItem("tokenTime");

  if (token && tokenTime) {
    const tokenAge = Date.now() - new Date(tokenTime).getTime();
    if (tokenAge < 3 * 60 * 60 * 1000) {
      // 3 hours
      return children;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTime");
    }
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
