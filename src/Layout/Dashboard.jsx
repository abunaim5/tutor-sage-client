import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading, Icon, Show, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useTeacher from "../Hooks/useTeacher";
import { MdClass, MdDashboard } from "react-icons/md";
import { FaBookMedical, FaChalkboardTeacher, FaHome, FaUser, FaUsers } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { IoLogOut } from "react-icons/io5";
import { IoMdHelpCircle, IoMdSettings } from "react-icons/io";
import Swal from "sweetalert2";
import { FaCartFlatbed } from "react-icons/fa6";

const Dashboard = () => {
    const { user, logOutUser } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();

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

    const navLinks = <>
        {
            isAdmin ? <>
                <Button as={NavLink} to='/dashboard/admin' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose}><Icon as={MdDashboard} /> Dashboard</Button>

                <Button as={NavLink} to='/dashboard/profile' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} my={4}><Icon as={FaUser} />Profile</Button>

                <Button as={NavLink} to='/dashboard/users' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose}><Icon as={FaUsers} />Users</Button>

                <Button as={NavLink} to='/dashboard/class-requests' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} my={4}><Icon as={MdClass} />Classes</Button>

                <Button as={NavLink} to='/dashboard/teacher-requests' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose}><Icon as={FaChalkboardTeacher} />Teacher Request</Button>
            </> : isTeacher ? <>
                <Button as={NavLink} to='/dashboard/teacher' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose}><Icon as={MdDashboard} />Dashboard</Button>

                <Button as={NavLink} to='/dashboard/profile' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} my={4}><Icon as={FaUser} />Profile</Button>

                <Button as={NavLink} to='/dashboard/add-class' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose}><Icon as={FaBookMedical} />Add Class</Button>

                <Button as={NavLink} to='/dashboard/my-class' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} my={4}><Icon as={MdClass} />My Class</Button>
            </> : <>
                <Button as={NavLink} to='/dashboard/student' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose}><Icon as={MdDashboard} />Dashboard</Button>

                <Button as={NavLink} to='/dashboard/profile' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} my={4}><Icon as={FaUser} />Profile</Button>

                <Button as={NavLink} to='/dashboard/my-order' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} mb={4}><Icon as={FaCartFlatbed} />My Order</Button>

                <Button as={NavLink} to='/dashboard/my-enroll-class' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose}><Icon as={MdClass} />My Enroll Class</Button>
            </>

        }
        <Divider mb={4} mt={6} />
        <Button as={NavLink} to='/' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} mt={2}><Icon as={FaHome} />Home</Button>
        <Button as={NavLink} to='/' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} my={4}><Icon as={IoMdSettings} />Settings</Button>
        <Button justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={handleLogOutUser}><Icon as={IoLogOut} />Logout</Button>
        <Button as={NavLink} to='/' justifyContent='left' gap={2} _activeLink={{ bg: 'primary.500', textColor: 'white' }} w='100%' onClick={onClose} mt={20}><Icon as={IoMdHelpCircle} />Help</Button>
    </>



    return (
        <Box display='flex' minH='100%'>
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

                    <DrawerBody>
                        {navLinks}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Show above="lg">
                <Box w='25%' px={6} py={6} shadow='md' minH='100%'>
                    <Heading size='lg' as={Link} to='/' textColor='#252525' fontFamily='logo.croissant' >TutorSa<span className="text-[#FF1949]">g</span>e</Heading>
                    <Box mt={20}>
                        {navLinks}
                    </Box>
                </Box>
            </Show>
            <Box display='flex' flexDir='column' gap={6} className="w-full lg:w-[75%]">
                <Box shadow='sm' p={6} display='flex' alignItems='center' gap={6}>
                    <Show below="md">
                        <Button colorScheme='primary' ref={btnRef} onClick={onOpen} borderRadius='none' p={7}>
                            <HamburgerIcon fontSize='2xl' />
                        </Button>
                    </Show>
                    <Box>
                        <Heading fontFamily='body' fontSize='3xl' fontWeight={600}>Dashboard</Heading>
                        <Text fontWeight={600} mt={1}>Welcome!, {user?.displayName}</Text>
                    </Box>
                </Box>
                <Box w='100%' px={6} pb={6}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;