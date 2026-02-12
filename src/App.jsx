import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer, toast } from 'react-toastify';
import { ProtectedRoute } from "@/context/ProtectedRoute";
import { useContext } from "react";
import { AppContent } from "@/context/AppContext";
import { Spinner } from "@material-tailwind/react";


function App() {

  const { loading } = useContext(AppContent);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner className="h-12 w-12 mx-auto mb-4" color="blue" />
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
    <Routes>
      <Route path="/dashboard/*" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/review/:reviewId" element={<Navigate to="/dashboard/ReviewTable" replace />} />
    </Routes>
    </div>
  );
}

export default App;
