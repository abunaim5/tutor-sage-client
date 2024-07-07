import { Box, Heading, Text } from "@chakra-ui/react";

const SectionHeadDes = ({heading, description}) => {
    return (
        <>
            <Heading fontFamily='body' size={{ base: 'lg', md: 'xl' }}>{heading}</Heading>
            <Box h={1} bg='primary.500' w={14} mt={6} mb={4} />
            <Text mb={16} maxW='4xl' fontSize={{ base: 'sm', md: 'md' }}>{description}</Text>
        </>
    );
};

export default SectionHeadDes;