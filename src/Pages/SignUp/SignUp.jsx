import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import IconBtn from "../../Components/IconBtn/IconBtn";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateUserProfile, logInUserWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { mutate } = useMutation({
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
        const { name, email, password, photo } = data;
        createUser(email, password)
            .then(res => {
                updateUserProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            photo: photo,
                            role: 'Student'
                        }
                        mutate(userInfo);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: 'Sign up successfully',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/')
                    }).catch(error => {
                        console.log(error);
                    })
                console.log(res.user)
            }).catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error.message === 'Firebase: Error (auth/email-already-in-use).' ? 'Email address already exist' : error.message}`,
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
                    name: res?.user?.displayName,
                    email: res?.user?.email,
                    photo: res?.user?.photoURL,
                    role: 'Student'
                }
                mutate(userInfo);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'User logged in successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/')
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

    return (
        <Box minH='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center' >
            <Card minW='lg' p={6} rounded='none'>
                <Heading textAlign='center' textColor='#252525'>Sign Up</Heading>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <FormControl isInvalid={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input {...register("name", { required: 'Name is required.' })} type="text" placeholder='Name' borderRadius='none' focusBorderColor="primary.300" autoComplete="name" />
                        <FormErrorMessage>{errors.name && errors.name?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl my={6} isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input {...register("email", { required: 'Email address is required.' })} type="email" placeholder='Email' borderRadius='none' focusBorderColor="primary.300" autoComplete="email" />
                        <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input {...register("password", { required: 'Password is required.', minLength: { value: 6, message: 'Password should be 6 character or more.' } })} type={showPassword ? 'text' : 'password'} placeholder='Password' borderRadius='none' focusBorderColor="primary.300" autoComplete="pass" />
                            <InputRightElement onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <ViewOffIcon fontSize='18px' color='gray' /> : <ViewIcon fontSize='18px' color='gray' />}
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password && errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl mt={6} isInvalid={errors.photo}>
                        <FormLabel>Your Photo</FormLabel>
                        <Input {...register("photo", { required: 'Photo is required.' })} type='text' placeholder='https://' borderRadius='none' focusBorderColor="primary.300" autoComplete="photo" />
                        <FormErrorMessage>{errors.photo && errors.photo?.message}</FormErrorMessage>
                    </FormControl>
                    {/* TODO: Implement choose file */}
                    {/* <FormControl isRequired mt={6}>
                        <FormLabel>Your Photo</FormLabel>
                        <Input type='file' borderRadius='none' border='none' px={0} />
                    </FormControl> */}
                    <Button type="submit" colorScheme="primary" borderRadius='none' mt={6} w='100%'>Register</Button>
                </form>
                <Box mt={6}>
                    <Text textAlign='center'>SignUp with social accounts</Text>
                    <ButtonGroup justifyContent='center' w='100%' mt={3}>
                        {
                            loginButtons.map((button, idx) => <IconBtn key={idx} button={button} />)
                        }
                    </ButtonGroup>
                </Box>
                <Text textAlign='center' mt={6}>
                    Already have an account?{' '}
                    <Link to='/login'>
                        Sign In
                    </Link>
                </Text>
            </Card>
        </Box>
    );
};

export default SignUp;