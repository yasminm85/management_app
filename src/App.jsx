import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer, toast } from 'react-toastify';
import { ProtectedRoute } from "@/context/ProtectedRoute";
import { useContext } from "react";
import { AppContent } from "@/context/AppContext";
import { Spinner } from "@material-tailwind/react";


function App() {

  

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
