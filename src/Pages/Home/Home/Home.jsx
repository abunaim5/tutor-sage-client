import { Box } from "@chakra-ui/react";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";

const Home = () => {
    return (
        <Box>
            <Banner />
            <PopularClasses />
        </Box>
    );
};

export default Home;