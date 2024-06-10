import { Box, Button, Card, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import tutorImg from '../../assets/images/tutor.png'
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";

const BecomeATutor = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { isLoading, data: userInfo = {} } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
    });
    console.log(userInfo);

    const { isSuccess, mutate } = useMutation({
        mutationFn: async (requestData) => {
            const res = await axiosPublic.post('/teacherRequests', requestData);
            return res;
        }
    })

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const requestData = {
            ...data,
            user_id: userInfo._id
        }

        mutate(requestData);
    };

    if (isSuccess) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Please wait. Admin will review your data.",
            showConfirmButton: false,
            timer: 2000
        });
    }

    if (isLoading) {
        return;
    }

    return (
        <Box bg={`url(${tutorImg})`} bgPos='center' bgRepeat='no-repeat' bgSize='cover' bgAttachment='fixed' minH='calc(100vh - 104px)'>
            <Box className="bg-black/50" minH='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center'>
                {
                    userInfo?.role === 'Teacher' ? <Box textColor='white' textAlign='center'>
                        <Heading mb={2} fontFamily='body'>Congratulations!</Heading>
                        <Text fontSize='xl'>Your request to become a teacher has been approved! You can now access all teacher-related features and resources.</Text>
                    </Box> : <Card minW='4xl' mx='auto' p={6} rounded='none' bg='none' textColor='white'>
                        <Heading fontFamily='body' mb={10} textAlign='center'>Fill this form</Heading>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box display='flex' gap={6}>
                                <FormControl isRequired isInvalid={errors.name}>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...register("name", { required: 'Name is required.' })} type="text" defaultValue={user?.displayName} placeholder='Name' borderRadius='none' focusBorderColor="primary.500" autoComplete="name" />
                                    <FormErrorMessage>{errors.name && errors.name?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...register("email", { required: 'Email address is required.' })} type="email" defaultValue={user?.email} readOnly placeholder='Email' borderRadius='none' focusBorderColor="primary.500" autoComplete="email" />
                                    <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box display='flex' gap={6} my={6}>
                                <FormControl isRequired isInvalid={errors.photo}>
                                    <FormLabel>Your Photo</FormLabel>
                                    <Input {...register("photo", { required: 'Photo is required.' })} type="text" defaultValue={user?.photoURL} placeholder='https://' borderRadius='none' focusBorderColor="primary.500" autoComplete="photo" />
                                    <FormErrorMessage>{errors.photo && errors.photo?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={errors.title}>
                                    <FormLabel>Title</FormLabel>
                                    <Input {...register("title", { required: 'Title is required.' })} type="text" placeholder='Title' borderRadius='none' focusBorderColor="primary.500" autoComplete="name" />
                                    <FormErrorMessage>{errors.title && errors.title?.message}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box display='flex' gap={6}>
                                <FormControl isRequired isInvalid={errors.experience}>
                                    <FormLabel>Experience</FormLabel>
                                    <Select {...register("experience", { required: 'Experience is required.' })} placeholder='Select experience' borderRadius='none' focusBorderColor="primary.500" autoComplete="experience" sx={{ '> option': { color: 'black' } }}>
                                        <option value='Beginner'>Beginner</option>
                                        <option value='Experienced'>Experienced</option>
                                        <option value='Mid level'>Mid level</option>
                                    </Select>
                                    <FormErrorMessage>{errors.experience && errors.experience?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={errors.category}>
                                    <FormLabel>Category</FormLabel>
                                    <Select {...register("category", { required: 'Category is required.' })} placeholder='Select category' borderRadius='none' focusBorderColor="primary.500" autoComplete="category" sx={{ '> option': { color: 'black' } }}>
                                        <option value='Web development'>Web development</option>
                                        <option value='Digital marketing'>Digital marketing</option>
                                        <option value='Creative writing'>Creative writing</option>
                                        <option value='Graphic design'>Graphic design</option>
                                        <option value='Mathematics'>Mathematics</option>
                                        <option value='Psychology'>Psychology</option>
                                        <option value='Music'>Music</option>
                                    </Select>
                                    <FormErrorMessage>{errors.category && errors.category?.message}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Button type="submit" colorScheme="primary" borderRadius='none' mt={6} w='100%'>Submit for Review</Button>
                        </form>
                    </Card>
                }

            </Box>
        </Box>
    );
};

export default BecomeATutor;