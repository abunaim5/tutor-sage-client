import { Box } from "@chakra-ui/react";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import InfoCount from "../InfoCount/InfoCount";
import Feedbacks from "../Feedbacks/Feedbacks";
import BecomeInstructor from "../BecomeInstructor/BecomeInstructor";
import Partners from "./Partners/Partners";
import MeetProfessionals from "../MeetProfessionals/MeetProfessionals";
import FAQuestion from "../FAQuestion/FAQuestion";

const Home = () => {
    return (
        <Box>
            <Banner />
            <PopularClasses />
            <Feedbacks />
            <BecomeInstructor />
            <MeetProfessionals />
            <InfoCount />
            <Partners />
            <FAQuestion />
        </Box>
    );
};

export default Home;