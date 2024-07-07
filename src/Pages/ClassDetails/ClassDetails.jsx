import { Avatar, Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

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

    const { isPending, data: feedbacks = [] } = useQuery({
        queryKey: ['classFeedbacks'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/feedbacks/${id}`);
            return res.data;
        }
    });

    const { _id, title, posted_by, short_description, long_description, price, image_url, photo } = cls;

    if (isLoading || isPending) {
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={{base: 10, md: 20}} px={{base: 2, md: 7}}>
            <Box display='flex' alignItems='center' gap={6}>
                <Heading fontFamily='body' size={{base: 'md', md: 'xl'}}>{title}</Heading>
                <Text textColor='primary.500' fontSize={{base: '2xl', md: '3xl'}} fontWeight={600}>${price}</Text>
            </Box>
            <Box mt={12} mb={20} display='flex' flexDir={{base: 'column', md: 'row'}} alignItems={{base:'flex-start', md: 'center'}} justifyContent='space-between' gap={6}>
                <Box display='flex' flexDir={{base: 'column', md: 'row'}} alignItems={{base: 'flex-start', md: 'center'}} gap={6}>
                    <Avatar size='xl' name={posted_by} src={photo} />
                    <Box>
                        <Text fontSize='2xl' mt={4}>{posted_by}</Text>
                        <Text fontWeight={500}>{short_description}</Text>
                    </Box>
                </Box>
                <Box>
                    <Button as={Link} to={`/payment/${_id}`} colorScheme="primary" borderRadius='none' size={{base: 'md', md: 'lg'}}>Pay</Button>
                </Box>
            </Box>
            <Image src={image_url} alt={`Image of ${title}`} w='100%' />
            <Box mt={20}>
                <Text fontSize='2xl'>Description</Text>
                <Box h={1} bg='primary.500' w={12} mt={3} mb={10} />
                <Heading fontFamily='body' mb={4} size={{base: 'lg', md: 'xl'}}>About this course</Heading>
                <Text maxW='7xl' fontSize={{base: 'sm', md: 'md'}}>{long_description}</Text>
            </Box>
            <Box mt={{base: 10, md: 20}}>
                <Text fontSize='2xl'>Feedbacks</Text>
                <Box h={1} bg='primary.500' w={12} mt={3} mb={10} />
                <Heading fontFamily='body' mb={10} fontSize='2xl'>Students feedback</Heading>
                <Box>
                    {
                        feedbacks.length > 0 ? feedbacks.map(feedback => <Box key={feedback._id} mt={6}>
                            <Avatar name={feedback.user_name} src={feedback.user_photo} />
                            <Text fontWeight={600} fontSize='xl' mt={2}>{feedback.user_name}</Text>
                            <Text mt={2} maxW='3xl'>{feedback.description}</Text>
                            <Box display='flex' alignItems='center' gap={3} mt={4}>
                                <Text fontWeight={600}>Rating:</Text>
                                <Rating
                                    readonly
                                    initialValue={feedback.rating}
                                    size={24}
                                    SVGstyle={{ display: 'inline' }}
                                />
                            </Box>
                        </Box>) : <Text textColor='red'>There is no feedback yet.</Text>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default ClassDetails;