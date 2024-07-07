import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const MyEnrollClassCard = ({ enrollClass }) => {
    const { _id, title, posted_by, email, image_url, } = enrollClass;

    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            borderRadius='none'
            data-aos='fade-up'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={image_url}
                alt={`Image of ${title}`}
            />

            <Stack>
                <CardBody>
                    <Heading size={{base: 'sm', md: 'md'}} fontFamily='body'>{title}</Heading>
                    <Text fontWeight={500} py='2'>{posted_by}</Text>
                    <Text fontWeight={500}>{email}</Text>
                    
                </CardBody>

                <CardFooter>
                    <Button as={Link} to={`/dashboard/my-enroll-class/${_id}`} borderRadius='none' colorScheme='primary'>
                        Continue
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default MyEnrollClassCard;