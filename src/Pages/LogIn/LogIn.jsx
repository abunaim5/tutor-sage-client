import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import IconBtn from "../../Components/IconBtn/IconBtn";
import AOS from 'aos';
import 'aos/dist/aos.css';

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { logInUser, logInUserWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { isSuccess, mutate } = useMutation({
        mutationFn: async (userInfo) => {
            const res = await axiosPublic.post('/users', userInfo);
            return res;
        }
    });

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const { email, password } = data;
        console.log(data)
        logInUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully logged in",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            }).catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error.message === 'Firebase: Error (auth/invalid-credential).' ? 'Invalid email or password' : error.message}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                console.log(error.message);
            })
    };

    const handleLogInWithGoogle = () => {
        logInUserWithGoogle()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photo: res.user.photoURL,
                    role: 'Student'
                }
                mutate(userInfo);
            }).catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error?.message}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                console.log(error.message);
            })
    };

    const loginButtons = [
        {
            icon: <FaGoogle />,
            handleLogin: handleLogInWithGoogle
        },
        {
            icon: <FaTwitter />,
            handleLogin: null
        },
        {
            icon: <FaFacebookF />,
            handleLogin: null
        },
    ];

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully logged in",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
        }
    }, [from, isSuccess, navigate]);

    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    return (
        <Box minH='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center' my={{ base: 10, md: 20 }} px={2}>
            <Card w={{ base: 'full', md: 'lg' }} p={6} rounded='none' data-aos='fade-up'>
                <Heading textAlign='center' textColor='#252525'>Sign In</Heading>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <FormControl isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input {...register("email", { required: 'Email address is required.' })} type="email" placeholder='Email' borderRadius='none' focusBorderColor="primary.300" autoComplete="email" />
                        <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl mt={6} isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input {...register("password", { required: 'Password is required.' })} type={showPassword ? 'text' : 'password'} placeholder='Password' borderRadius='none' focusBorderColor="primary.300" autoComplete="pass" />
                            <InputRightElement onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <ViewOffIcon fontSize='18px' color='gray' /> : <ViewIcon fontSize='18px' color='gray' />}
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password && errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="primary" borderRadius='none' mt={6} w='100%'>Log In</Button>
                </form>
                <Box mt={6}>
                    <Text textAlign='center'>Login with social accounts</Text>
                    <ButtonGroup justifyContent='center' w='full' mt={3}>
                        {
                            loginButtons.map((button, idx) => <IconBtn key={idx} button={button} />)
                        }
                    </ButtonGroup>
                </Box>
                <Text textAlign='center' mt={6}>
                    New Here?{' '}
                    <Link to='/register'>
                        Create an account!
                    </Link>
                </Text>
            </Card>
        </Box>
    );
};

export default LogIn;