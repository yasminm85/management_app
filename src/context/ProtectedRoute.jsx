import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "@/context/AppContext";

export function ProtectedRoute({ children }) {
  const { isLoggedin } = useContext(AppContent);

  if (!isLoggedin) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;