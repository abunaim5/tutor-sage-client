import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Box } from "@chakra-ui/react";
import ClassCard from "../../Components/ClassCard/ClassCard";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { isLoading, data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/classes');
            return res.data;
        }
    });

    if (isLoading) {
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={20} px={7}>
            <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={6}>
                {
                    classes.map(cls => <ClassCard key={cls._id} cls={cls} />)
                }
            </Box>
        </Box>
    );
};

export default AllClasses;