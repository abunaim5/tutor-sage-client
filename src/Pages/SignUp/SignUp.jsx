import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <Box h='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center' >
            <Card minW='lg' p={6} rounded='none'>
                <Heading textAlign='center' textColor='#252525'>Sign Up</Heading>
                <form className="mt-8">
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder='Name' borderRadius='none' focusBorderColor="primary.300" />
                    </FormControl>
                    <FormControl isRequired my={6}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder='Email' borderRadius='none' focusBorderColor="primary.300" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type="password" placeholder='Password' borderRadius='none' focusBorderColor="primary.300" />
                            <InputRightElement>
                                <ViewIcon color='gray' />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired mt={6}>
                        <FormLabel>Your Photo</FormLabel>
                        <Input type='text' placeholder='https://' borderRadius='none' focusBorderColor="primary.300" />
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