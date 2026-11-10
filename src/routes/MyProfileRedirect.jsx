import { useAuth } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

const MyProfileRedirect = () => {
    const { user } = useAuth();
    return <Navigate to={`/profile/${encodeURIComponent(user.nickname)}`} replace />;
};

export default MyProfileRedirect;