import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import instructor from '../../../assets/images/instructor.png'
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const BecomeInstructor = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    return (
        <Box className="flex flex-col lg:flex-row">
            <Box className="w-full lg:w-1/2" data-aos='fade-right'>
                <Image h='100%' src={instructor} alt='instructor image' />
            </Box>
            <Box className="w-full lg:w-1/2" bg='primary.500' display='flex' alignItems='center' data-aos='fade-left'>
                <Box textColor='white' px={{base: 6, md: 10}} py={10}>
                    <Heading fontFamily='body' size={{base: 'lg', md: 'xl'}} data-aos='fade-right'>Become an instructor</Heading>
                    <Text mt={3} fontSize={{base: 'sm', md: 'md'}} data-aos='fade-left'>Inspire and educate the next generation by becoming an instructor. <br /> Create impactful courses and reach a global audience.</Text>
                    <Button as={Link} to='/become-an-instructor' colorScheme='blackAlpha' borderRadius='none' p={6} mt={8} data-aos='fade-up'>Start Teaching Today</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default BecomeInstructor;