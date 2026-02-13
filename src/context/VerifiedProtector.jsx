import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "@/context/AppContext";

export function VerifiedProtector({ children }) {
  const { userData, loading } = useContext(AppContent);

  if (loading) return <div>Loading...</div>;

  if (userData && !userData.isAccountVerified) {
    return <Navigate to="/auth/verify-otp" replace />;
  }

  return children;
}
