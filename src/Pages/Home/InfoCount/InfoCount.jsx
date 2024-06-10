import { Box, Heading, Icon, Image, Text } from "@chakra-ui/react";
import students from '../../../assets/images/students.png'
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { RiAttachmentLine } from "react-icons/ri";
import useClasses from "../../../Hooks/useClasses";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const InfoCount = () => {
    const axiosPublic = useAxiosPublic();
    const [classes] = useClasses();

    const { isLoading, data: totalUsers = {} } = useQuery({
        queryKey: ['totalUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/usersCount');
            console.log(res.data);
            return res.data;
        }
    });

    const totalEnrollments = classes.reduce((total, cls) => total + parseInt(cls.total_enrolment), 0);

    if (isLoading) {
        return;
    }

    return (
        <Box className="flex flex-col-reverse lg:flex-row">
            <Box className="w-full lg:w-1/2 flex flex-wrap  md:flex-row gap-10 md:gap-4 items-center justify-center md:justify-between" bg='primary.500' p={16} textColor='white'>
                <Box display='flex' alignItems='center' gap={4}>
                    <Icon as={PiUsersThree} fontSize='5xl' />
                    <Box>
                        <Heading size='lg' fontFamily='body' mb={1}>{totalUsers?.usersCount}</Heading>
                        <Text fontSize='xl'>Users</Text>
                    </Box>
                </Box>
                <Box display='flex' alignItems='center' gap={4}>
                    <Icon as={MdOutlineClass} fontSize='5xl' />
                    <Box>
                        <Heading size='lg' fontFamily='body' mb={1}>{classes?.length}</Heading>
                        <Text fontSize='xl'>Classes</Text>
                    </Box>
                </Box>
                <Box display='flex' alignItems='center' gap={4}>
                    <Icon as={RiAttachmentLine} fontSize='5xl' />
                    <Box>
                        <Heading size='lg' fontFamily='body' mb={1}>{totalEnrollments}</Heading>
                        <Text fontSize='xl'>Enrollments</Text>
                    </Box>
                </Box>
            </Box>
            <Box className="w-full lg:w-1/2">
                <Image src={students} />
            </Box>
        </Box>
    );
};

export default InfoCount;