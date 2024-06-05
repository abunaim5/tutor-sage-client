import { Box } from "@chakra-ui/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import MyClassCard from "./MyClassCard";

const MyClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { isPending, data: myClasses = [] } = useQuery({
        queryKey: ['myClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClasses/${user?.email}`);
            return res.data;
        }
    });
    console.log(myClasses);

    if (isPending) {
        return;
    }

    if(loading){
        return;
    }

    return (
        <Box my={10} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                myClasses.map(cls => <MyClassCard key={cls._id} cls={cls} user={user} />)
            }
        </Box>
    );
};

export default MyClass;