import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Box } from "@chakra-ui/react";
import MyEnrollClassCard from "./MyEnrollClassCard";
import useAuth from "../../../Hooks/useAuth";

const MyEnrollClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { isPending, data: enrollClasses = [] } = useQuery({
        queryKey: ['enrollClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollClass/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });
    // console.log(enrollClasses, user?.email);

    if (isPending || loading) {
        return;
    }

    return (
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {
                enrollClasses.map(enrollClass => <MyEnrollClassCard
                    key={enrollClass._id}
                    enrollClass={enrollClass}
                />)
            }
        </Box>
    );
};

export default MyEnrollClass;