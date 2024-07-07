import { EmailIcon, Icon, PhoneIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Input, InputGroup, InputRightAddon, Text } from "@chakra-ui/react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box bg='#252525'>
            <Box maxW='8xl' mx='auto' textColor='white' py={20} px={7} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Box>
                    <Box>
                        <Heading size='lg' as={Link} to='/' fontFamily='logo.croissant' >TutorSa<span className="text-[#FF1949]">g</span>e</Heading>
                        <Text mt={3}>TutorSage is dedicated to constant learning & knowledge sharing.</Text>
                    </Box>
                    <Box mt={8}>
                        <Heading size='md'>Contact Us</Heading>
                        <Box mt={6}>
                            <Text><PhoneIcon mr={2} /> (123) 456-7890</Text>
                            <Text my={2}><EmailIcon mr={2} /> contact@tutorsage.com</Text>
                            <Text><Icon as={FaLocationDot} mr={2} /> 123 Main Street, New York City.</Text>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Heading size='md'>Popular Courses</Heading>
                    <Box display='flex' flexDir='column' gap={2} mt={6}>
                        <Link to='/'>Introduction to Programming</Link>
                        <Link to='/'>Cybersecurity Fundamentals</Link>
                        <Link to='/'>Data Science and Analytics</Link>
                        <Link to='/'>Business Communication</Link>
                        <Link to='/'>Digital Marketing</Link>
                    </Box>
                </Box>
                <Box>
                    <Heading size='md'>Support</Heading>
                    <Box display='flex' flexDir='column' gap={2} mt={6}>
                        <Link to='/about'>About Us</Link>
                        <Link to='/about'>Registration</Link>
                        <Link to='/about'>Available Courses</Link>
                        <Link to='/about'>Become A Tutor</Link>
                        <Link to='/about'>Events</Link>
                    </Box>
                </Box>
                <Box>
                    <Heading size='md'>Newsletter</Heading>
                    <Text mt={3}>Subscribe to our newsletter for the latest news, updates, and special offers delivered straight to your inbox!</Text>
                    <Box mt={6}>
                        <InputGroup>
                            <Input type='email' name="email" autoComplete="email" placeholder='Email' borderRadius='none' focusBorderColor="primary.500" />
                            <InputRightAddon as={Button} borderRadius='none'>Subscribe</InputRightAddon>
                        </InputGroup>
                    </Box>
                </Box>
            </Box>
            <Box textColor='white' bg='#1D1D1D' py={10}>
                <Box maxW='8xl' mx='auto' px={7} className="flex justify-between flex-col-reverse md:flex-row gap-4">
                    <Text>&copy; {currentYear} TutorSage. All Rights Reserved.</Text>
                    <Box textColor='lightgrey' display='flex' gap={4} flexDir={{base: 'column', md: 'row'}}>
                        <Text>Call: (123) 456-7890</Text>
                        <Text>Follow Us
                            <Link><Icon ml={2} as={FaLinkedinIn} /></Link>
                            <Link><Icon mx={2} as={FaTwitter} /></Link>
                            <Link><Icon as={FaFacebookF} /></Link>
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;