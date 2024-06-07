import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MyClassDetails = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { isLoading, data: cls = {}, refetch } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        }
    });

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        const assignment = {
            ...data,
        }

        const res = await axiosSecure.put(`/classes/${id}`, { ...assignment });
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Assignment added successfully',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    if (isLoading) {
        return;
    }


    return (
        <Box my={10}>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                <Card align='center' borderRadius='none' bg='primary.50'>
                    <CardHeader>
                        <Heading textAlign='center' fontFamily='body' size='md'>Total Enrolment</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text textAlign='center' fontSize='xl' fontWeight={600}>{cls.total_enrolment}</Text>
                    </CardBody>
                </Card>
                <Card align='center' borderRadius='none' bg='primary.50'>
                    <CardHeader>
                        <Heading textAlign='center' fontFamily='body' size='md'>Total Assignment</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text textAlign='center' fontSize='xl' fontWeight={600}>{cls?.assignments?.length > 0 ? cls.assignments.length : 0}</Text>
                    </CardBody>
                </Card>
                <Card align='center' borderRadius='none' bg='primary.50'>
                    <CardHeader>
                        <Heading textAlign='center' fontFamily='body' size='md'>Per Day Submitted</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text textAlign='center' fontSize='xl' fontWeight={600}>{cls?.assignment_submitted ? cls.assignment_submitted : 0}</Text>
                    </CardBody>
                </Card>
            </SimpleGrid>
            <Box textAlign='center' mt={10}>
                <Button onClick={onOpen} colorScheme='green' fontSize='xl' borderRadius='none' px={6} py={7}><AddIcon mr={2} />Create</Button>

                <Modal
                    isCentered
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    motionPreset='slideInBottom'
                >
                    <ModalOverlay />
                    <ModalContent borderRadius='none'>
                        <ModalHeader>Create Assignment</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody pb={6}>
                                <FormControl isRequired isInvalid={errors.title}>
                                    <FormLabel>Title</FormLabel>
                                    <Input {...register("title", { required: 'Title is required.' })} type="text" autoComplete="title" borderRadius='none' focusBorderColor="primary.500" placeholder='Title' />
                                    <FormErrorMessage>{errors.title && errors.title?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl my={4} isRequired isInvalid={errors.deadline}>
                                    <FormLabel>Deadline</FormLabel>
                                    <Input {...register("deadline", { required: 'Deadline is required.' })} type="date" autoComplete="deadline" borderRadius='none' focusBorderColor="primary.500" placeholder='Deadline' />
                                    <FormErrorMessage>{errors.deadline && errors.deadline?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={errors.description}>
                                    <FormLabel>Description</FormLabel>
                                    <Input {...register("description", { required: 'Description is required.' })} type="text" autoComplete="description" borderRadius='none' focusBorderColor="primary.500" placeholder='Description' />
                                    <FormErrorMessage>{errors.description && errors.description?.message}</FormErrorMessage>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button type="submit" borderRadius='none' colorScheme='green' mr={3}>
                                    Create
                                </Button>
                                <Button borderRadius='none' onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
};

export default MyClassDetails;