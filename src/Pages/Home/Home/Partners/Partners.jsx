import { Box, Image } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import partner1 from '../../../../assets/logos/1.png'
import partner3 from '../../../../assets/logos/3.png'
import partner4 from '../../../../assets/logos/4.png'
import partner5 from '../../../../assets/logos/5.png'
import partner6 from '../../../../assets/logos/6.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const Partners = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    return (
        <Box data-aos='fade-right'>
            <Marquee
                gradient
                pauseOnHover
            >
                <Image w='450px' h='350px' objectFit='contain' src={partner1} alt='education partners logo' />
                <Image w='450px' h='350px' objectFit='contain' src={partner3} alt='education partners logo' />
                <Image w='450px' h='350px' objectFit='contain' src={partner4} alt='education partners logo' />
                <Image w='450px' h='350px' objectFit='contain' src={partner5} alt='education partners logo' />
                <Image w='450px' h='350px' objectFit='contain' src={partner6} alt='education partners logo' />
            </Marquee>
        </Box>
    );
};

export default Partners;