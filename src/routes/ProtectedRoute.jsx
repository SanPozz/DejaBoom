import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {

    const { user, loading, hasRole } = useAuth();

    const location = useLocation();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-label="Cargando">
            <div className="size-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
    )

    if (!user) return <Navigate to="/login" state={{from: location}} replace />

    if (allowedRoles && !hasRole(allowedRoles)) return <Navigate to='403' replace />




    return <Outlet />;
}

export default ProtectedRoute;