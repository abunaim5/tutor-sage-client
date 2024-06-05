import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react";
// import { BiChat, BiLike, BiShare } from "react-icons/bi";
// import { BsThreeDotsVertical } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";

const MyClassCard = ({ cls, user }) => {
    const { posted_by, email, title, image_url, price, short_description, long_description, status } = cls;
    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={posted_by} src={user?.photoURL} />
                        <Box>
                            <Heading size='sm'>{posted_by}</Heading>
                            <Text>{email}</Text>
                        </Box>
                    </Flex>
                    <Text textColor='primary.500' fontSize='2xl'>${price}</Text>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text fontWeight={600} mb={2}>{short_description}</Text>
                <Text>{long_description}</Text>
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
                        minW: '136px',
                    },
                }}
            >
                <Button flex='1' variant='ghost' leftIcon={<TbListDetails />} isDisabled={status !== 'Accepted' && true}>
                    Details
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<EditIcon />}>
                    Update
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};

export default MyClassCard;