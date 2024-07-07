import { Card, CardBody, CardFooter, Heading, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const ProfessionalsCard = ({professional}) => {
    const {name, photo, role} = professional;

    useEffect(() => {
        AOS.init({
            duration: 2000,
            delay: 200,
        });
        AOS.refresh();
    }, []);


    return (
        <Card
            borderRadius='none'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            data-aos='fade-up'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px', lg: '40%', xl: '50%' }}
                src={photo}
                alt={`photo of ${name}`}
            />

            <Stack>
                <CardBody pb={0}>
                    <Heading size='lg'>{name}</Heading>

                    <Text py='2' fontSize='xl'>
                        {role}
                    </Text>
                </CardBody>

                <CardFooter pt={0} gap={2}>
                    <IconButton
                        variant='outline'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={<FaLinkedinIn />}
                    />
                    <IconButton
                        variant='outline'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={<FaTwitter />}
                    />
                    <IconButton
                        variant='outline'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={<FaFacebookF />}
                    />
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ProfessionalsCard;