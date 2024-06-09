import { Avatar, Box, Heading, Text } from "@chakra-ui/react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay} from 'swiper/modules';
import { Rating } from "react-simple-star-rating";

const Feedbacks = () => {
    const axiosPublic = useAxiosPublic();

    const { isLoading, data: feedbacks = [] } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedbacks');
            return res.data;
        }
    });
    console.log(feedbacks);

    if (isLoading) {
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={20} px={7}>
            <Heading fontFamily='body'>Feedbacks</Heading>
            <Box h={1} bg='primary.500' w={14} mt={6} mb={16} />
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    feedbacks.map(feedback => <SwiperSlide key={feedback._id}>
                        <Box w='100%' h='xs'>
                            <Avatar size='xl' name={feedback.user_name} src={feedback.user_photo} />
                            <Text fontWeight={600} fontSize='3xl' my={2}>{feedback.user_name}</Text>
                            <Text fontWeight={600} fontSize='xl'>{feedback.title}</Text>
                            <Text mt={2} maxW='3xl' >{feedback.description}</Text>
                            <Box display='flex' alignItems='center' gap={3} mt={4}>
                                <Text fontWeight={600}>Rating:</Text>
                                <Rating
                                    readonly
                                    initialValue={feedback.rating}
                                    size={24}
                                    SVGstyle={{ display: 'inline' }}
                                />
                            </Box>
                        </Box>
                    </SwiperSlide>)
                }
            </Swiper>
        </Box>
    );
};

export default Feedbacks;