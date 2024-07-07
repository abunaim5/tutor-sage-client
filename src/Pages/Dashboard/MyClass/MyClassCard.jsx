import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react";
// import { BiChat, BiLike, BiShare } from "react-icons/bi";
// import { BsThreeDotsVertical } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

const MyClassCard = ({ cls, user, handleDeleteClass }) => {
    const { _id, posted_by, email, title, image_url, price, short_description, long_description, status } = cls;
    return (
        <Card w='100%'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={posted_by} src={user?.photoURL} />
                        <Box>
                            <Heading size='sm'>{posted_by}</Heading>
                            <Text>{email}</Text>
                        </Box>
                    </Flex>
                    <Text textColor='primary.500' fontSize={{base: 'lg', md: 'xl'}}>${price}</Text>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text mb={4} fontWeight={600}>Class Status: {status}</Text>
                <Text fontWeight={600} mb={2}>{short_description}</Text>
                <Text fontSize={{base: 'sm', md: 'md'}}>{long_description}</Text>
            </CardBody>
            <Image
                objectFit='cover'
                src={image_url}
                alt={title}
            />

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        w: 'full',
                    },
                }}
                gap={2}
            >
                <Button as={Link} to={`/dashboard/my-class/${_id}`} flex='1' variant='ghost' leftIcon={<TbListDetails />} isDisabled={status !== 'Accepted' && true}>
                    Details
                </Button>
                <Button as={Link} to={`/dashboard/update-class/${_id}`} flex='1' variant='ghost' leftIcon={<EditIcon />}>
                    Update
                </Button>
                <Button onClick={()=> handleDeleteClass(_id)} flex='1' variant='ghost' leftIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};

export default MyClassCard;