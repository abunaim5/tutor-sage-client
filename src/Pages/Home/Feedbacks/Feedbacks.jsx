import { Avatar, Box, Text } from "@chakra-ui/react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay} from 'swiper/modules';
import { Rating } from "react-simple-star-rating";
import SectionHeadDes from "../../../Components/SectionHeadDes/SectionHeadDes";

const Feedbacks = () => {
    const axiosPublic = useAxiosPublic();

    const { isLoading, data: feedbacks = [] } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedbacks');
            return res.data;
        }
    });

    if (isLoading) {
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={20} px={{base: 2, md: 7}}>
            <SectionHeadDes
                heading='Student Feedback'
                description='Hear from our students about their learning experiences! Our feedback section features authentic testimonials and ratings from learners who have completed various courses.'
            />
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
                        <Box w='100%' my={5}>
                            <Avatar size='xl' name={feedback.user_name} src={feedback.user_photo} />
                            <Text fontWeight={600} fontSize={{base: '2xl', md: '3xl'}} my={2}>{feedback.user_name}</Text>
                            <Text fontWeight={600} fontSize={{base: 'md', md: 'xl'}}>{feedback.title}</Text>
                            <Text mt={2} maxW='3xl' fontSize={{base: 'sm', md: 'md'}} >{feedback.description}</Text>
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