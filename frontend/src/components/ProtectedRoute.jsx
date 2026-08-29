import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // =========================
  // Authentication Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center px-6">

        <div className="text-center">

          {/* Logo */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-xl font-bold text-white shadow-lg shadow-indigo-200 animate-pulse">
            B
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold text-slate-950">
            BlogSpace
          </h2>

          <div className="mt-4 flex items-center justify-center gap-2">

            <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></span>

            <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]"></span>

            <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></span>

          </div>

          <p className="mt-3 text-sm text-slate-400">
            Checking your account...
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // Not Authenticated
  // =========================
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // =========================
  // Authenticated
  // =========================
  return children;
}

export default ProtectedRoute;