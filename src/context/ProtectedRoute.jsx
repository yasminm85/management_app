import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "@/context/AppContext";
import { Spinner } from "@material-tailwind/react";

export function ProtectedRoute({ children }) {
  const { isLoggedin, loading } = useContext(AppContent);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner className="h-12 w-12 mx-auto mb-4" color="blue" />
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedin) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;