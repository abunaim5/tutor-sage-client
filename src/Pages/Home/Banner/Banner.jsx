import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/images/banner1.png'
import banner2 from '../../../assets/images/banner2.png'
import banner3 from '../../../assets/images/banner3.png'
import { Box, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";

const Banner = () => {
    return (
        <Box>
            <Carousel showThumbs={false} interval={3000} transitionTime={2000} infiniteLoop={true}>
                <Box bgImg={`url(${banner1})`} h='calc(100vh - 96px)' bgPos='top' bgAttachment='fixed' bgSize='cover' bgRepeat='no-repeat'>
                    <Box h='100%' className="bg-black/20" textColor='white' display='flex' alignItems='center' >
                        <Box textAlign='left' w='8xl' mx='auto' px={2}>
                            <Heading size='4xl' fontFamily='body'>Empower Your Learning</Heading>
                            <Box h={1} bg='white' w={16} my={6} />
                            <Text fontSize='lg'>Discover expert tutors and streamline your classes with TutorSage. <br /> Where wisdom meets convenience.</Text>
                            <ButtonGroup mt={10} gap={6}>
                                <Button variant='outline' borderRadius='none' px={10} py={8}>Read More</Button>
                                <Button colorScheme="primary" borderRadius='none' px={10} py={8}>Apply Now</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Box>
                <Box bgImg={`url(${banner2})`} h='calc(100vh - 96px)' bgPos='center' bgAttachment='fixed' bgSize='cover' bgRepeat='no-repeat'>
                    <Box h='100%' className="bg-black/20" textColor='white' display='flex' alignItems='center'>
                        <Box textAlign='left' w='8xl' mx='auto' px={2}>
                            <Heading size='4xl' fontFamily='body'>Connect, Learn, Succeed</Heading>
                            <Box h={1} bg='white' w={16} my={6} />
                            <Text fontSize='lg'>Enhance your skills with personalized tutoring and efficient class management. <br /> Experience the TutorSage difference.</Text>
                            <ButtonGroup mt={10} gap={6}>
                                <Button variant='outline' borderRadius='none' px={10} py={8}>Read More</Button>
                                <Button colorScheme="primary" borderRadius='none' px={10} py={8}>Apply Now</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Box>
                <Box bgImg={`url(${banner3})`} h='calc(100vh - 96px)' bgPos='center' bgAttachment='fixed' bgSize='cover' bgRepeat='no-repeat'>
                    <Box h='100%' className="bg-black/20" textColor='white' display='flex' alignItems='center'>
                        <Box textAlign='left' w='8xl' mx='auto' px={2}>
                            <Heading size='4xl' fontFamily='body'>Revolutionize Your Education</Heading>
                            <Box h={1} bg='white' w={16} my={6} />
                            <Text fontSize='lg'>Simplify learning and teaching with TutorSage. The smart way to <br /> manage classes and master new skills.</Text>
                            <ButtonGroup mt={10} gap={6}>
                                <Button variant='outline' borderRadius='none' px={10} py={8}>Read More</Button>
                                <Button colorScheme="primary" borderRadius='none' px={10} py={8}>Apply Now</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Box>
            </Carousel>
        </Box>
    );
};

export default Banner;