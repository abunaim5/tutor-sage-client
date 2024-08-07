import { Box, Button, Card, CardBody, CardFooter, Divider, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { RiAttachmentLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const ClassCard = ({ cls }) => {
    const { _id, title, posted_by, image_url, price, short_description, total_enrolment } = cls;

    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    return (
        <Card borderRadius='none' shadow='none' data-aos='fade-up'>
            <CardBody p={0}>
                <Image
                    h='252px'
                    w='100%'
                    src={image_url}
                    alt={`image of ${title}`}
                    borderRadius='none'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md' fontFamily='body'>{title}</Heading>
                    <Text>{posted_by}</Text>
                    <Text fontSize='sm' h='50px'>
                        {short_description}
                    </Text>
                    <Box display='flex' alignItems='center' justifyContent='space-between' mb={5}>
                        <Box display='flex' gap={4}>
                            <Text fontSize='sm' display='flex' alignItems='center' gap={2}><Icon as={RiAttachmentLine} />{total_enrolment} Enrolled</Text>
                            <Text fontSize='sm' display='flex' alignItems='center' gap={2}><Icon as={FaRegStar} />0 Ratings</Text>
                        </Box>
                        <Text color='primary.500' fontSize={{ base: 'md', md: 'xl' }}>
                            ${price}
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter px={0} py={5}>
                <Button as={Link} to={`/class-details/${_id}`} variant='solid' colorScheme='primary' borderRadius='none' w='full'>
                    Enroll Now
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ClassCard;