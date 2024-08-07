import { Box, Button, Card, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import tutorImg from '../../assets/images/tutor.png'
import { useMutation,  } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const BecomeATutor = () => {
    const axiosSecure = useAxiosSecure();
    const [userInfo, isUserLoading] = useUser();

    const { isSuccess, mutate } = useMutation({
        mutationFn: async (requestData) => {
            const res = await axiosSecure.post('/teacherRequests', requestData);
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

    useEffect(() => {
        AOS.init({
            duration: 1500,
            delay: 200,
        });
        AOS.refresh();
    }, []);

    if (isSuccess) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Please wait. Admin will review your data.",
            showConfirmButton: false,
            timer: 2000
        });
    }

    if (isUserLoading) {
        return;
    }

    return (
        <Box bg={`url(${tutorImg})`} bgPos='center' bgRepeat='no-repeat' bgSize='cover' bgAttachment='fixed' minH='calc(100vh - 104px)'>
            <Box className="bg-black/50" minH='calc(100vh - 104px)' display='flex' justifyContent='center' alignItems='center'>
                {
                    userInfo?.role === 'Teacher' ? <Box textColor='white' textAlign='center' px={2}>
                        <Heading mb={2} fontFamily='body' data-aos='fade-down'>Congratulations!</Heading>
                        <Text fontSize={{base: 'md', md: 'xl'}} data-aos='fade-up'>Your request to become a teacher has been approved! You can now access all teacher-related features and resources.</Text>
                    </Box> : <Card w={{base: 'full', md: '4xl'}} mx='auto' px={{base: 2, md: 6}} py={6} rounded='none' bg='none' textColor='white'>
                        <Heading fontFamily='body' mb={10} textAlign='center'>Fill this form</Heading>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box display='flex' flexDir={{base: 'column', md: 'row'}} gap={6}>
                                <FormControl isInvalid={errors.name}>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...register("name", { required: 'Name is required.' })} type="text" defaultValue={userInfo?.name} placeholder='Name' borderRadius='none' focusBorderColor="primary.500" autoComplete="name" />
                                    <FormErrorMessage>{errors.name && errors.name?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...register("email", { required: 'Email address is required.' })} type="email" defaultValue={userInfo?.email} readOnly placeholder='Email' borderRadius='none' focusBorderColor="primary.500" autoComplete="email" />
                                    <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box display='flex' flexDir={{base: 'column', md: 'row'}} gap={6} my={6}>
                                <FormControl isInvalid={errors.photo}>
                                    <FormLabel>Your Photo</FormLabel>
                                    <Input {...register("photo", { required: 'Photo is required.' })} type="text" defaultValue={userInfo?.photo} placeholder='https://' borderRadius='none' focusBorderColor="primary.500" autoComplete="photo" />
                                    <FormErrorMessage>{errors.photo && errors.photo?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.title}>
                                    <FormLabel>Title</FormLabel>
                                    <Input {...register("title", { required: 'Title is required.' })} type="text" placeholder='Title' borderRadius='none' focusBorderColor="primary.500" autoComplete="name" />
                                    <FormErrorMessage>{errors.title && errors.title?.message}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box display='flex' flexDir={{base: 'column', md: 'row'}} gap={6}>
                                <FormControl isInvalid={errors.experience}>
                                    <FormLabel>Experience</FormLabel>
                                    <Select {...register("experience", { required: 'Experience is required.' })} placeholder='Select experience' borderRadius='none' focusBorderColor="primary.500" autoComplete="experience" sx={{ '> option': { color: 'black' } }}>
                                        <option value='Beginner'>Beginner</option>
                                        <option value='Experienced'>Experienced</option>
                                        <option value='Mid level'>Mid level</option>
                                    </Select>
                                    <FormErrorMessage>{errors.experience && errors.experience?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.category}>
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