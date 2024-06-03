import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { logInUser, logInUserWithGoogle } = useAuth();

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
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully logged in",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(res.user)
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
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully logged in",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(res.user)
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

    return (
        <Box minH='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center' >
            <Card minW='lg' p={6} rounded='none'>
                <Heading textAlign='center' textColor='#252525'>Sign In</Heading>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <FormControl isRequired isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input {...register("email", { required: 'Email address is required.' })} type="email" placeholder='Email' borderRadius='none' focusBorderColor="primary.300" autoComplete="email" />
                        <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired mt={6} isInvalid={errors.password}>
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
                    <ButtonGroup justifyContent='center' w='100%' mt={3}>
                        <IconButton
                            onClick={handleLogInWithGoogle}
                            isRound
                            variant='outline'
                            colorScheme='primary'
                            aria-label='Call Sage'
                            fontSize='20px'
                            icon={<FaGoogle />}
                        />
                        <IconButton
                            isRound
                            variant='outline'
                            colorScheme='primary'
                            aria-label='Call Sage'
                            fontSize='20px'
                            icon={<FaTwitter />}
                        />
                        <IconButton
                            isRound
                            variant='outline'
                            colorScheme='primary'
                            aria-label='Call Sage'
                            fontSize='20px'
                            icon={<FaFacebookF />}
                        />
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