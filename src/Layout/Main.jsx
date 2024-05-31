import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import { Box } from "@chakra-ui/react";

const Main = () => {
    return (
        <Box >
            <NavBar />
            <Outlet />
        </Box>
    );
};

export default Main;