import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useTeacher from "../../Hooks/useTeacher";

const TeacherRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isTeacher, isTeacherLoading] = useTeacher();
    const location = useLocation();

    if (loading || isTeacherLoading) {
        return <h1>Loading...</h1>
    }

    if (user && isTeacher) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace />
};

export default TeacherRoute;