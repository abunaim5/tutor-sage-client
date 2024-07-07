import { Box, Heading, Text } from "@chakra-ui/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const SectionHeadDes = ({ heading, description }) => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    return (
        <>
            <Heading fontFamily='body' size={{ base: 'lg', md: 'xl' }} data-aos='fade-right'>{heading}</Heading>
            <Box h={1} bg='primary.500' w={14} mt={6} mb={4} data-aos='fade-left' />
            <Text mb={16} maxW='4xl' fontSize={{ base: 'sm', md: 'md' }} data-aos='fade-up'>{description}</Text>
        </>
    );
};

export default SectionHeadDes;