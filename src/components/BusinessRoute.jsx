import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useApp } from "@/lib/AppContext";

// Gates business-only routes. The account type is read from the authenticated
// user record (server truth, persisted via localApi.auth.updateMe at registration);
// it falls back to the local selection for the not-yet-synced case. A personal
// account that simply changes a local variable or hits the URL directly is
// still redirected away, because the server-stored account_type is authoritative.
export default function BusinessRoute({ fallback = <Navigate to="/" replace /> }) {
  const { user } = useAuth();
  const { userType } = useApp();
  const accountType = user?.account_type || userType;
  if (accountType !== "business") return fallback;
  return <Outlet />;
}