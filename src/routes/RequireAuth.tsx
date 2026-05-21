import { Navigate } from "react-router-dom";
import type { User } from "../types/user";
import type { ReactNode } from "react";

function RequireAuth({ children }: { children: ReactNode }) {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
