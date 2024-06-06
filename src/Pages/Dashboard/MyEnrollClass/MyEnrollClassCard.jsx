import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";

const MyEnrollClassCard = ({ enrollClass }) => {
    const { title, posted_by, email, image_url, } = enrollClass;

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            borderRadius='none'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={image_url}
                alt={`Image of ${title}`}
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{title}</Heading>
                    <Text py='2'>{posted_by}</Text>
                    <Text>{email}</Text>
                    
                </CardBody>

                <CardFooter>
                    <Button borderRadius='none' colorScheme='primary'>
                        Continue
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default MyEnrollClassCard;