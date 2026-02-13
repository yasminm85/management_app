import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "@/context/AppContext";

export function ProtectedRoute({ children }) {
  const { isLoggedin, loading } = useContext(AppContent);

  if (loading) {
    return <div>Loading Halaman, Masuk ke Login untuk Masuk Kembali...</div>; 
  }

  if (!isLoggedin) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;