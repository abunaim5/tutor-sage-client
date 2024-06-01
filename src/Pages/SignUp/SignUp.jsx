import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {createUser} = useAuth();

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const {email, password} = data;
        createUser(email, password)
        .then(res => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully register",
                showConfirmButton: false,
                timer: 1500
              });
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
    }

    return (
        <Box h='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center' >
            <Card minW='lg' p={6} rounded='none'>
                <Heading textAlign='center' textColor='#252525'>Sign Up</Heading>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <FormControl isRequired isInvalid={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input {...register("name", { required: 'Name is required.' })} type="text" placeholder='Name' borderRadius='none' focusBorderColor="primary.300" autoComplete="name" />
                        <FormErrorMessage>{errors.name && errors.name?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired my={6} isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input {...register("email", { required: 'Email address is required.' })} type="email" placeholder='Email' borderRadius='none' focusBorderColor="primary.300" autoComplete="email" />
                        <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input {...register("password", { required: 'Password is required.', minLength: {value: 6, message: 'Password should be 6 character or more.'} })} type={showPassword ? 'text' : 'password'} placeholder='Password' borderRadius='none' focusBorderColor="primary.300" autoComplete="pass" />
                            <InputRightElement onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <ViewOffIcon color='gray' /> : <ViewIcon color='gray' />}
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password && errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired mt={6} isInvalid={errors.photo}>
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
                        <IconButton
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