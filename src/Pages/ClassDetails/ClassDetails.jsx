import { Avatar, Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const ClassDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    const { isLoading, data: cls = {} } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes/${id}`);
            return res.data;
        }
    });

    const { _id, title, posted_by, short_description, long_description, price, image_url } = cls;

    if (isLoading) {
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={20} px={7}>
            <Box display='flex' alignItems='baseline' gap={6}>
                <Heading fontFamily='body'>{title}</Heading>
                <Text textColor='primary.500' fontSize='3xl' fontWeight={600}>${price}</Text>
            </Box>
            <Box mt={12} mb={20} display='flex' alignItems='center' justifyContent='space-between'>
                <Box display='flex' alignItems='center' gap={6}>
                    <Avatar size='xl' name='Christian Nwamba' src='https://bit.ly/code-beast' />
                    <Box>
                        <Text fontSize='2xl' mt={4}>{posted_by}</Text>
                        <Text>{short_description}</Text>
                    </Box>
                </Box>
                <Box>
                    <Button as={Link} to={`/payment/${_id}`} colorScheme="primary" borderRadius='none' fontSize='xl' px={12} py={8}>Pay</Button>
                </Box>
            </Box>
            <Image src={image_url} alt={`Image of ${title}`} w='100%' />
            <Box mt={20}>
                <Text fontSize='2xl'>Description</Text>
                <Box h={1} bg='primary.500' w={12} mt={3} mb={10} />
                <Heading fontFamily='body' mb={4}>About this course</Heading>
                <Text maxW='7xl'>{long_description}</Text>
            </Box>
        </Box>
    );
};

export default ClassDetails;