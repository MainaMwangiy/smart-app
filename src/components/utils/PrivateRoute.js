import React from "react";
import { Navigate } from "react-router-dom";

// create a context for the login status
export const LoginContext = React.createContext(false);

// create a HOC to check the login status before rendering a protected route
export default function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem("token");

  return (
    isAuthenticated ? <Component /> : <Navigate to="/Login" />
  );
}
