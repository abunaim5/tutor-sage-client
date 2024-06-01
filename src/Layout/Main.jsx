import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import { Box } from "@chakra-ui/react";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <Box >
            <NavBar />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default Main;