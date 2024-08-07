import { Box } from "@chakra-ui/react";
import ProfessionalsCard from "./ProfessionalsCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionHeadDes from "../../../Components/SectionHeadDes/SectionHeadDes";

const MeetProfessionals = () => {
    const axiosPublic = useAxiosPublic();

    const {isLoading, data: professionals = []} = useQuery({
        queryKey: ['professionals'],
        queryFn: async() => {
            const res = await axiosPublic.get('/professionals');
            return res.data;
        }
    });

    if(isLoading){
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={20} px={{base: 2, md: 7}}>
            <SectionHeadDes
                heading='Meet Professionals'
                description='Connect with industry experts and seasoned educators who bring real-world experience to our platform. Our Meet Professionals section introduces you to the talented instructors behind our courses.'
            />
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    professionals.map(professional => <ProfessionalsCard key={professional._id} professional={professional} />)
                }
            </Box>
        </Box>
    );
};

export default MeetProfessionals;