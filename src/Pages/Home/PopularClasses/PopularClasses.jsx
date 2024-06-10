import { Box, Heading, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import ClassCard from "../../../Components/ClassCard/ClassCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PopularClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { isLoading, data: classes = [] } = useQuery({
    queryKey: ['popular-classes'],
    queryFn: async () => {
      const res = await axiosPublic.get('/popularClasses');
      return res.data;
    }
  });

  if (isLoading) {
    return;
  }

  return (
    <Box maxW='8xl' mx='auto' my={20} px={7}>
      <Heading fontFamily='body'>Popular Classes</Heading>
      <Box h={1} bg='primary.500' w={14} mt={6} mb={4} />
      <Text mb={16} maxW='4xl'>Explore our most popular classes, curated to provide exceptional learning experiences. These courses have been highly rated by students for their engaging content and expert instruction.</Text>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {
          classes.map(cls => <SwiperSlide key={cls._id}>
            <Box my={5}>
              <ClassCard cls={cls} />
            </Box>
          </SwiperSlide>)
        }
      </Swiper>
    </Box>
  );
};

export default PopularClasses;