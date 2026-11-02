import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return null;
    }

    if (user) {
        return <Navigate to="/home?error=already_logged_in" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PublicOnlyRoute;