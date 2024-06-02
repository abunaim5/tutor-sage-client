import { Box } from "@chakra-ui/react";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import InfoCount from "../InfoCount/InfoCount";

const Home = () => {
    return (
        <Box>
            <Banner />
            <PopularClasses />
            <InfoCount />
        </Box>
    );
};

export default Home;