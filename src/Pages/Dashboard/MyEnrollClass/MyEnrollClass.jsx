import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Box } from "@chakra-ui/react";
import MyEnrollClassCard from "./MyEnrollClassCard";
import useAuth from "../../../Hooks/useAuth";

const MyEnrollClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { isLoading, data: enrollClasses = [] } = useQuery({
        queryKey: ['enrollClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollClasses/${user?.email}`);
            return res.data;
        }
    });
    console.log(enrollClasses, user?.email);

    if (isLoading || loading) {
        return;
    }

    return (
        <Box my={10} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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