import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const LogIn = () => {
    return (
        <Box h='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center' >
            <Card minW='lg' p={6} rounded='none'>
                <Heading textAlign='center' textColor='#252525'>Sign In</Heading>
                <form className="mt-8">
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder='Email' borderRadius='none' focusBorderColor="primary.300" />
                    </FormControl>
                    <FormControl isRequired mt={6}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type="password" placeholder='Password' borderRadius='none' focusBorderColor="primary.300" />
                            <InputRightElement>
                                <ViewIcon fontSize='18px' color='gray' />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button type="submit" colorScheme="primary" borderRadius='none' mt={6} w='100%'>Log In</Button>
                </form>
                <Box mt={6}>
                    <Text textAlign='center'>Login with social accounts</Text>
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