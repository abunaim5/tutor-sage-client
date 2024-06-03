import { Box, Heading } from "@chakra-ui/react";
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
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosPublic.get('/classes');
      return res.data;
    }
  });

  if(isLoading){
    return;
  }

  return (
    <Box maxW='8xl' mx='auto' my={20} px={7}>
      <Heading fontFamily='body'>Popular Classes</Heading>
      <Box h={1} bg='primary.500' w={14} mt={6} mb={16} />
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
          classes.map((cls, idx) => <SwiperSlide key={idx}>
            <ClassCard cls={cls} />
          </SwiperSlide>)
        }
      </Swiper>
    </Box>
  );
};

export default PopularClasses;