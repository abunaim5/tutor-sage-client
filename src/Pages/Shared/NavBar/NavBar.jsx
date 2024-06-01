import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Flex, Heading, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Portal, Spacer, useDisclosure } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, loading } = useAuth();

    if (loading) {
        return;
    }

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
                        {/* <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                            <BreadcrumbLink as={NavLink} to='/p' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Teach on TutorSage</BreadcrumbLink>
                        </BreadcrumbItem> */}
                        <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                            <Menu isOpen={isOpen} isLazy placement="auto">
                                <MenuButton onMouseEnter={onOpen} transition='all 0.001s'>Pages</MenuButton>
                                <Portal>
                                    <MenuList onMouseLeave={onClose} mt={8} borderRadius='none'>
                                        <MenuItem as={NavLink} to='/t'>Teach on TutorSage</MenuItem>
                                        <MenuItem>Events</MenuItem>
                                    </MenuList>
                                </Portal>
                            </Menu>
                            {/* <BreadcrumbLink as={NavLink} to='/p' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Teach on TutorSage</BreadcrumbLink> */}
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
                <Box display='flex' alignItems='center'>
                    {
                        user ? <Box>
                            <Menu placement="bottom-end" isLazy>
                                <MenuButton as={Avatar} src={user?.photoUrl} cursor='pointer' />
                                <MenuList borderRadius='none' mt={5}>
                                    <MenuGroup title={user?.displayName || 'Unknown User'}>
                                        <MenuItem>My Account</MenuItem>
                                        <MenuItem>Dashboard</MenuItem>
                                        <MenuItem textColor='primary.500'>Logout</MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                        </Box> : <ButtonGroup gap='2'>
                            <Button as={Link} to='/login' colorScheme='primary' variant='outline' borderRadius='none'>Log In</Button>
                            <Button as={Link} to='/register' colorScheme='primary' borderRadius='none'>Sign Up</Button>
                        </ButtonGroup>
                    }
                </Box>
            </Flex>
        </Box>
    );
};

export default NavBar;