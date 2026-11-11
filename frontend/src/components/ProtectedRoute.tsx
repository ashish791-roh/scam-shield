
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until the saved token has been checked with the backend.
  if (loading) {
    return (
      <div className="container">
        <p>Checking your session...</p>
      </div>
    );
  }

  // If the user is not logged in, redirect them to Login.
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // The user is authenticated, so render the protected route.
  return <Outlet />;
}
