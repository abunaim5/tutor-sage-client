import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import instructor from '../../../assets/images/instructor.png'
import { Link } from "react-router-dom";

const BecomeInstructor = () => {
    return (
        <Box className="flex flex-col lg:flex-row">
            <Box className="w-full lg:w-1/2">
                <Image h='100%' src={instructor} alt='instructor image' />
            </Box>
            <Box className="w-full lg:w-1/2" bg='primary.500' display='flex' alignItems='center'>
                <Box textColor='white' p={10}>
                    <Heading fontFamily='body'>Become an instructor</Heading>
                    <Text mt={3}>Inspire and educate the next generation by becoming an instructor. <br /> Create impactful courses and reach a global audience.</Text>
                    <Button as={Link} to='/become-an-instructor' colorScheme='blackAlpha' borderRadius='none' p={6} mt={8}>Start Teaching Today</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default BecomeInstructor;