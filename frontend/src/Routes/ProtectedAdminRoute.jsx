import { Navigate } from "react-router-dom";
import { useAuth } from "../components/admin/UseAuth.jsx";

export default function ProtectedRoute({ children }) {
  // const { user, loading } = useAuth();
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Checking auth...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
