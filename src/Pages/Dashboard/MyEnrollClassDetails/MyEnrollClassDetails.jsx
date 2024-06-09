import { Box, Button, Card, FormControl, FormErrorMessage, FormLabel, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdOutlineFeedback } from "react-icons/md";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { Rating } from "react-simple-star-rating";
import useAuth from "../../../Hooks/useAuth";

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true
    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true,

    },
    {
        name: 'Deadline',
        selector: row => row.deadline,
        sortable: true
    },
    {
        name: 'Action',
        selector: row => row.submit,
    },
]


const MyEnrollClassDetails = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { isLoading, data: enrollClass = {} } = useQuery({
        queryKey: ['enrollClass'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollClasses/${id}`);
            return res?.data;
        },
        enabled: true
    });

    const { isPending, data: cls = {} } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${enrollClass?.class_id}`);
            return res?.data;
        },
        enabled: !!enrollClass?.class_id,
    });

    const handleSubmitAssignment = async (submitCount) => {
        const res = await axiosSecure.patch(`/classAssignment/${enrollClass?.class_id}`, { submitCount });
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assignment submitted successfully",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    const assignmentsData = cls?.assignments?.map(assignment => {
        return {
            title: assignment.title,
            description: assignment.description,
            deadline: assignment.deadline,
            submit: <Button onClick={() => handleSubmitAssignment(cls?.assignment_submitted > 0 && parseInt(cls?.assignment_submitted) + 1 || 1)} colorScheme='primary' borderRadius='none' my={2}>Submit</Button>
        }
    });

    const {
        control,
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            rating: 0
        }
    })
    const onSubmit = async (data) => {
        const feedback = {
            ...data,
            class_id: cls._id,
            title: cls.title,
            user_name: user?.displayName,
            user_photo: user?.photoURL
        }
        console.log(feedback)
        const res = await axiosSecure.post('/terFeedbacks', feedback);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Your feedback added successfully',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };


    if (isLoading || isPending) {
        return;
    }

    return (
        <Box>
            <Box>
                <Button onClick={onOpen} colorScheme='green' borderRadius='none' px={8} py={6} fontSize='xl'><Icon as={MdOutlineFeedback} mr={2} fontSize='2xl' />TER</Button>
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
                        <ModalHeader>Give Feedback</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody pb={6}>
                                <FormControl isInvalid={errors.description}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea {...register("description", { required: 'Description is required.' })} type="text" autoComplete="description" borderRadius='none' focusBorderColor="primary.500" placeholder='Description' />
                                    <FormErrorMessage>{errors.description && errors.description?.message}</FormErrorMessage>
                                </FormControl>
                            </ModalBody>
                            <ModalBody pb={6}>
                                <FormControl isInvalid={errors.rating}>
                                    <FormLabel>Rating</FormLabel>
                                    <Controller
                                        name='rating'
                                        control={control}
                                        rules={{ required: 'Rating is required' }}
                                        render={({ field }) => (
                                            <Rating
                                                onClick={field.onChange}
                                                ratingValue={field.value}
                                                transition
                                                SVGstyle={{ display: "inline" }}
                                            // size={24}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>{errors.rating && errors.rating?.message}</FormErrorMessage>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button type="submit" borderRadius='none' colorScheme='green' mr={3}>
                                    Send
                                </Button>
                                <Button borderRadius='none' onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Box>
            <Box mt={10}>
                <Card style={{ height: '100%' }} pt={2} borderRadius='none'>
                    <DataTable
                        title={`Assignments (${cls?.assignments ? cls.assignments.length : 0})`}
                        columns={columns}
                        data={assignmentsData}
                        pagination
                        highlightOnHover
                    />
                </Card>
            </Box>
        </Box>
    );
};

export default MyEnrollClassDetails;