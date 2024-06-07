import { Box, Button } from "@chakra-ui/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyEnrollClassDetails = () => {
    const axiosSecure = useAxiosSecure();

    // const {} = useQuery({

    // });

    return (
        <Box my={10}>
            <Button colorScheme='green' borderRadius='none' px={8}>TER</Button>
            
        </Box>
    );
};

export default MyEnrollClassDetails;