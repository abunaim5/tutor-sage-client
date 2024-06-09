import { Box } from "@chakra-ui/react";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import InfoCount from "../InfoCount/InfoCount";
import Feedbacks from "../Feedbacks/Feedbacks";
import BecomeInstructor from "../BecomeInstructor/BecomeInstructor";

const Home = () => {
    return (
        <Box>
            <Banner />
            <PopularClasses />
            <BecomeInstructor />
            <Feedbacks />
            <InfoCount />
        </Box>
    );
};

export default Home;