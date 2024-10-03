import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/sign-in" />;
  }
  return children;
};