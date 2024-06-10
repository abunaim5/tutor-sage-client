import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {isLoading: isUserLoading, data: userInfo = {}} = useQuery({
        enabled: !loading,
        queryKey: ['userInfo', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/user/${user?.email}`);
            return res.data;
        }
    });

    return [userInfo, isUserLoading]
};

export default useUser;