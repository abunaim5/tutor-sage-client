import { Box, Heading, Icon, Image, Text } from "@chakra-ui/react";
import img from '../../../assets/images/banner2.png'
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
    console.log(totalUsers);

    const totalEnrollments = classes.reduce((total, cls) => total + parseInt(cls.total_enrolment), 0);

    if (isLoading) {
        return;
    }

    return (
        <Box display='flex'>
            <Box w='50%' bg='primary.500' display='flex' alignItems='center' justifyContent='space-between' px={10} textColor='white'>
                <Box textAlign='center'>
                    <Icon as={PiUsersThree} fontSize='4xl' />
                    <Heading size='lg' fontFamily='body' my={3}>Users</Heading>
                    <Text fontSize='2xl'>{totalUsers?.usersCount}</Text>
                </Box>
                <Box textAlign='center'>
                    <Icon as={MdOutlineClass} fontSize='3xl' />
                    <Heading size='lg' fontFamily='body' my={3}>Classes</Heading>
                    <Text fontSize='2xl'>{classes?.length}</Text>
                </Box>
                <Box textAlign='center'>
                    <Icon as={RiAttachmentLine} fontSize='3xl' />
                    <Heading size='lg' fontFamily='body' my={3}>Enrollments</Heading>
                    <Text fontSize='2xl'>{totalEnrollments}</Text>
                </Box>
            </Box>
            <Box w='50%'>
                <Image src={img} />
            </Box>
        </Box>
    );
};

export default InfoCount;