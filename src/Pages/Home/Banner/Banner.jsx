import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/images/banner1.png'
import banner2 from '../../../assets/images/banner2.png'
import banner3 from '../../../assets/images/banner3.png'
import { Box, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";

const bannerInfo = [
    {
        image: banner1,
        heading: 'Empower Your Learning',
        bgPos: 'top',
        description: `Discover expert tutors and streamline your classes with TutorSage. Where wisdom meets convenience.`
    },
    {
        image: banner2,
        heading: 'Connect, Learn, Succeed',
        bgPos: 'center',
        description: `Enhance your skills with personalized tutoring and efficient class management. Experience the TutorSage difference.`
    },
    {
        image: banner3,
        heading: 'Revolutionize Your Education',
        bgPos: 'center',
        description: `Simplify learning and teaching with TutorSage. The smart way to manage classes and master new skills.`
    }
];

const Banner = () => {
    return (
        <Box>
            <Carousel showThumbs={false} interval={4000} transitionTime={2000} infiniteLoop={true} emulateTouch={true} swipeScrollTolerance={30} swipeable={false} autoPlay>
                {
                    bannerInfo.map((info, idx) => <Box key={idx} bgImg={`url(${info.image})`} h='calc(100vh - 104px)' bgPos={info.bgPos} bgAttachment='fixed' bgSize='cover' bgRepeat='no-repeat' >
                        <Box h='100%' className="bg-black/20" textColor='white' display='flex' alignItems='center' >
                            <Box textAlign='left' w='8xl' mx='auto' px={7}>
                                <Heading size={{base: 'xl', lg: '3xl', xl: '4xl'}} fontFamily='body'>{info.heading}</Heading>
                                <Box h={1} bg='white' w={16} my={6} />
                                <Text fontSize={{base: 'sm', md: 'lg'}} maxW='800px'>{info.description}</Text>
                                <ButtonGroup mt={10} gap={{base: 3, md: 6}}>
                                    <Button variant='outline' borderRadius='none' px={{base: 3, md: 8, lg: 10}} py={{base: 2, md: 6, lg: 8}}>Read More</Button>
                                    <Button colorScheme="primary" borderRadius='none' px={{base: 3, md: 8, lg: 10}} py={{base: 2, md: 6, lg: 8}}>Apply Now</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>)
                }
            </Carousel>
        </Box>
    );
};

export default Banner;