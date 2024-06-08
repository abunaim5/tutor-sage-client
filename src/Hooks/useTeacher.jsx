import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isLoading: isTeacherLoading, data: isTeacher } = useQuery({
        enabled: !loading,
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
            return res.data.teacher;
        }
    })


    return [isTeacher, isTeacherLoading]
};

export default useTeacher;