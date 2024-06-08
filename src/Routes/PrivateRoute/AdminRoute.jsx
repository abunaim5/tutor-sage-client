import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <h1>Loading...</h1>
    }

    if (user, isAdmin) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace />
};

export default AdminRoute;