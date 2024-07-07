import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Flex, Heading, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Portal, Show, Spacer, useDisclosure } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { HamburgerIcon } from "@chakra-ui/icons";

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logOutUser } = useAuth();

    const handleLogOutUser = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch(error => {
                console.error(error);
            })
    }

    return (
        <Box px={{base: 2, md: 7}} py={7} w='full'>
            <Flex maxW='8xl' mx='auto' alignItems='center' gap={{base: 1, md: 2}}>
                <Box display='flex' alignItems='center' gap={{base: 2, md: 4}}>
                    <Show below="md">
                        <Menu>
                            <MenuButton
                                size={{base: 'sm', md: 'md'}}
                                borderRadius='none'
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon />}
                                variant='outline'
                            />
                            <MenuList borderRadius='none' mt={5}>
                                <MenuItem as={Link} to='/'>
                                    Home
                                </MenuItem>
                                <MenuItem as={Link} to='/classes'>
                                    Classes
                                </MenuItem>
                                <MenuItem as={Link} to='/become-an-instructor'>
                                    Teach on TutorSage
                                </MenuItem>
                                <MenuItem>
                                    About Us
                                </MenuItem>
                                <MenuItem>
                                    Blog
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Show>
                    <Heading size={{base: 'sm', md: 'lg'}} as={Link} to='/' textColor='#252525' fontFamily='logo.croissant' >TutorSa<span className="text-[#FF1949]">g</span>e</Heading>
                </Box>
                <Spacer />
                <Show above="lg">
                    <Box>
                        <Breadcrumb separator=''>
                            <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                                <BreadcrumbLink as={NavLink} to='/' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem _hover={{ color: '#FF1949' }} mx={5}>
                                <BreadcrumbLink as={NavLink} to='/classes' _activeLink={{ color: '#FF1949', fontWeight: 'semibold' }}>Classes</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                                <Menu isOpen={isOpen} onClose={onClose} isLazy placement="auto">
                                    <MenuButton onMouseEnter={onOpen} transition='all 0.001s'>Pages</MenuButton>
                                    <Portal>
                                        <MenuList onMouseLeave={onClose} mt={8} borderRadius='none'>
                                            <MenuItem as={NavLink} to='/become-an-instructor'>Teach on TutorSage</MenuItem>
                                            <MenuItem>Events</MenuItem>
                                        </MenuList>
                                    </Portal>
                                </Menu>
                            </BreadcrumbItem>
                            <BreadcrumbItem _hover={{ color: '#FF1949' }} mx={5}>
                                <BreadcrumbLink>About Us</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem _hover={{ color: '#FF1949' }}>
                                <BreadcrumbLink>Blog</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Box>
                </Show>
                <Spacer />
                <Box display='flex' alignItems='center'>
                    {
                        user ? <Box>
                            <Menu placement="bottom-end" isLazy>
                                <MenuButton as={Avatar} src={user?.photoURL} cursor='pointer' />
                                <MenuList borderRadius='none' mt={5}>
                                    <MenuGroup title={user?.displayName || 'Unknown User'}>
                                        <MenuItem as={Link} to='/dashboard/profile'>Dashboard</MenuItem>
                                        <MenuItem>FAQ</MenuItem>
                                        <MenuItem textColor='primary.500' onClick={handleLogOutUser}>Logout</MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                        </Box> : <ButtonGroup gap={{base: 1, md: 2}}>
                            <Button as={Link} to='/login' colorScheme='primary' variant='outline' borderRadius='none' size={{base: 'sm', md: 'md'}}>Log In</Button>
                            <Button as={Link} to='/register' colorScheme='primary' borderRadius='none' size={{base: 'sm', md: 'md'}}>Sign Up</Button>
                        </ButtonGroup>
                    }
                </Box>
            </Flex>
        </Box>
    );
};

export default NavBar;