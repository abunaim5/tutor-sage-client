import { EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const ProfileCard = ({ userInfo }) => {
    const { name, email, photo, role } = userInfo;

    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    return (
        <Box>
            <Heading mb={6} fontSize='2xl' fontFamily='body'>My Profile</Heading>
            <Card data-aos='fade-up'>
                <CardBody display='flex' flexDir={{base: 'column', md: 'row'}} gap={{base: 6, md: 0}} justifyContent='space-between'>
                    <Box display='flex' flexDir={{base: 'column', md: 'row'}} alignItems={{base: 'flex-start', md: 'center'}} gap={6}>
                        <Avatar size={{base: 'lg', md: 'xl'}} name={name} src={photo} />
                        <Box>
                            <Heading fontSize='2xl' fontFamily='body'>{name}</Heading>
                            <Text my={1} fontWeight={600} textColor='gray'>{role}</Text>
                            <Text fontWeight={600} textColor='gray'>Los Angeles, California, USA</Text>
                        </Box>
                    </Box>
                    <Button><EditIcon mr={2} />Edit</Button>
                </CardBody>
            </Card>
            <Card mt={6} data-aos='fade-up'>
                <CardBody display='flex' flexDir={{base: 'column', md: 'row'}} gap={{base: 6, md: 0}} justifyContent='space-between'>
                    <Box textColor='gray'>
                        <Heading fontSize='2xl' fontFamily='body' textColor='black'>Personal information</Heading>
                        <Text mt={7} fontWeight={600}>Email: {email}</Text>
                        <Text my={1} fontWeight={600}>Phone: (123) 456-7890</Text>
                        <Text fontWeight={600}>Bio: {role === 'Admin' ? 'CEO. TutorSage' : role}</Text>
                    </Box>
                    <Button><EditIcon mr={2} />Edit</Button>
                </CardBody>
            </Card>
            <Card mt={6} data-aos='fade-up'>
                <CardBody display='flex' flexDir={{base: 'column', md: 'row'}} gap={{base: 6, md: 0}} justifyContent='space-between'>
                    <Box textColor='gray'>
                        <Heading fontSize='2xl' fontFamily='body' textColor='black'>Address</Heading>
                        <Text mt={7} fontWeight={600}>Country: United States of America</Text>
                        <Text my={1} fontWeight={600}>City/State: California, USA</Text>
                        <Text fontWeight={600}>Postal Code: ERT 63456</Text>
                        <Text fontWeight={600} mt={1}>TAX ID: AS56871968</Text>
                    </Box>
                    <Button><EditIcon mr={2} />Edit</Button>
                </CardBody>
            </Card>
        </Box>
    );
};

export default ProfileCard;