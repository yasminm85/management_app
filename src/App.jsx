import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "@/context/ProtectedRoute";

function App() {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

        <Route path="/auth/*" element={<Auth />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review/:reviewId"
          element={<Navigate to="/dashboard/ReviewTable" replace />}
        />

        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </div>
  );
}

export default App;
