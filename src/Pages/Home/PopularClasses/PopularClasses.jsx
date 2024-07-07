import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import ClassCard from "../../../Components/ClassCard/ClassCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionHeadDes from "../../../Components/SectionHeadDes/SectionHeadDes";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const PopularClasses = () => {
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    AOS.init({
        duration: 2000,
        delay: 200,
    });
    AOS.refresh();
}, []);

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
    <Box maxW='8xl' mx='auto' my={20} px={{base: 2, md: 7}}>
      <SectionHeadDes
        heading='Popular Classes'
        description='Explore our most popular classes, curated to provide exceptional learning experiences. These courses have been highly rated by students for their engaging content and expert instruction.'
      />
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
            <Box my={5} data-aos='fade-up'>
              <ClassCard cls={cls} />
            </Box>
          </SwiperSlide>)
        }
      </Swiper>
    </Box>
  );
};

export default PopularClasses;