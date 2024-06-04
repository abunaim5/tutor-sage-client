import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
// import useAuth from "../Hooks/useAuth";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [isAdmin, setIsAdmin] = useState(true);
    const [isTeacher, setIsTeacher] = useState(false);
    // const { user } = useAuth();


    return (
        <Box display='flex' flexDir='column'>
            <Box display='flex'>
                <Button colorScheme='primary' ref={btnRef} onClick={onOpen} borderRadius='none' p={8}>
                    <HamburgerIcon fontSize='4xl' />
                </Button>
                <Heading as={Button} textAlign='center' w='100%' py={8} cursor='default' fontFamily='body' borderRadius='none'>{isAdmin ? 'Admin' : isTeacher ? 'Teacher' : 'Student'} Dashboard</Heading>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Dashboard Menu</DrawerHeader>

                    <DrawerBody maxH='50%'>
                        {
                            isAdmin ? <>
                                <Button as={NavLink} to='/dashboard/admin' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>Admin Home</Button>
                                <Button as={NavLink} to='/dashboard/profile' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose} my={4}>Profile</Button>
                                <Button as={NavLink} to='/dashboard/users' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>Users</Button>
                                <Button as={NavLink} to='/dashboard/classes' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose} my={4}>Classes</Button>
                                <Button as={NavLink} to='/dashboard/teacher-requests' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>Teacher Requests</Button>
                            </> : isTeacher ? <>
                                <Button as={NavLink} to='/dashboard' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>Teacher Home</Button>
                                <Button as={NavLink} to='/dashboard/profile' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose} my={4}>Profile</Button>
                                <Button as={NavLink} to='/dashboard/users' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>My Class</Button>
                                <Button as={NavLink} to='/dashboard/classes' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose} my={4}>Add Class</Button>
                            </> : <>
                                <Button as={NavLink} to='/dashboard' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>User Home</Button>
                                <Button as={NavLink} to='/dashboard/profile' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose} my={4}>Profile</Button>
                                <Button as={NavLink} to='/dashboard/my-enroll-class' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>My Enroll Class</Button>
                            </>
                        }

                    </DrawerBody>
                    <Divider />
                    <DrawerFooter flexDir='column'>
                        <Button as={NavLink} to='/' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose} mt={2}>Home</Button>
                        <Button as={NavLink} to='/' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose} my={4}>Contact</Button>
                        <Button as={NavLink} to='/' _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' borderRadius='none' onClick={onClose}>Blogs</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Box w='100%' className="lg:px-24 md:px-4 px-2">
                <Outlet />
            </Box>
        </Box>
    );
};

export default Dashboard;