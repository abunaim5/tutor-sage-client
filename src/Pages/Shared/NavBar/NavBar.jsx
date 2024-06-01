import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <Box p={7} w='full'>
            <Flex maxW='8xl' mx='auto' alignItems='center' gap='2' px={2}>
                <Box>
                    <Heading size='lg' as={Link} to='/' textColor='#252525' fontFamily='logo.croissant' >TutorSa<span className="text-[#FF1949]">g</span>e</Heading>
                </Box>
                <Spacer />
                <Box>
                    <Breadcrumb separator=''>
                        <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                            <BreadcrumbLink as={NavLink} to='/' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem _hover={{ color: '#FF1949' }} mx={5}>
                            <BreadcrumbLink as={NavLink} to='/f' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Classes</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                            <BreadcrumbLink as={NavLink} to='/p' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Pages</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem _hover={{ color: '#FF1949' }} mx={5}>
                            <BreadcrumbLink as={NavLink} to='/a' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>About Us</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                            <BreadcrumbLink as={NavLink} to='/c' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Blogs</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Button colorScheme='primary' variant='outline' borderRadius='none'>Log In</Button>
                    <Button colorScheme='primary' borderRadius='none'>Sign Up</Button>
                </ButtonGroup>
            </Flex>
        </Box>
    );
};

export default NavBar;