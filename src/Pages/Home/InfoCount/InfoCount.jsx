import { Box, Heading, Icon, Image, Text } from "@chakra-ui/react";
import img from '../../../assets/images/banner2.png'
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { RiAttachmentLine } from "react-icons/ri";

const InfoCount = () => {
    return (
        <Box display='flex'>
            <Box w='50%' bg='primary.500' display='flex' alignItems='center' justifyContent='space-between' px={10} textColor='white'>
                <Box textAlign='center'>
                    <Icon as={PiUsersThree} fontSize='3xl' />
                    <Heading size='lg' fontFamily='body' my={3}>Users</Heading>
                    <Text fontSize='2xl'>100</Text>
                </Box>
                <Box textAlign='center'>
                    <Icon as={MdOutlineClass} fontSize='3xl' />
                    <Heading size='lg' fontFamily='body' my={3}>Classes</Heading>
                    <Text fontSize='2xl'>10</Text>
                </Box>
                <Box textAlign='center'>
                    <Icon as={RiAttachmentLine} fontSize='3xl' />
                    <Heading size='lg' fontFamily='body' my={3}>Enrollments</Heading>
                    <Text fontSize='2xl'>79</Text>
                </Box>
            </Box>
            <Box w='50%'>
                <Image src={img}></Image>
            </Box>
        </Box>
    );
};

export default InfoCount;