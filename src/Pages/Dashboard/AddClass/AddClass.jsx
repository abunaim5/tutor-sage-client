import { Box, Button, Card, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {isSuccess, mutate} = useMutation({
        mutationFn: async(classData) => {
            const res = await axiosSecure.post('/classes', classData);
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
        const classData = {
            posted_by: data.name,
            email: data.email,
            title: data.title,
            image_url: data.image,
            price: data.price,
            short_description: data.shortDes,
            long_description: data.longDes,
            total_enrolment: 0,
            status: 'Pending',
            photo: user.photoURL
        }

        mutate(classData);
    };

    if (isSuccess) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Please wait. Admin will review your class request",
            showConfirmButton: false,
            timer: 2000
        });
        navigate('/dashboard/my-class');
    }

    return (
        <Box>
            <Card mx='auto' p={6} rounded='none'>
                {/* <Heading fontFamily='body' mb={10} textAlign='center'>Add Your Class</Heading> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display='flex' flexDir={{base: 'column', md: 'row'}} gap={6}>
                        <FormControl isRequired isInvalid={errors.name}>
                            <FormLabel>Name</FormLabel>
                            <Input {...register("name", { required: 'Name is required.' })} type="text" defaultValue={user?.displayName} readOnly placeholder='Name' borderRadius='none' focusBorderColor="primary.500" autoComplete="name" />
                            <FormErrorMessage>{errors.name && errors.name?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input {...register("email", { required: 'Email address is required.' })} type="email" defaultValue={user?.email} readOnly placeholder='Email' borderRadius='none' focusBorderColor="primary.500" autoComplete="email" />
                            <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box display='flex' flexDir={{base: 'column', md: 'row'}} gap={6} my={6}>
                        <FormControl isRequired isInvalid={errors.title}>
                            <FormLabel>Title</FormLabel>
                            <Input {...register("title", { required: 'Title is required.' })} type="text" placeholder='Title' borderRadius='none' focusBorderColor="primary.500" autoComplete="name" />
                            <FormErrorMessage>{errors.title && errors.title?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.image}>
                            <FormLabel>Image</FormLabel>
                            <Input {...register("image", { required: 'Image is required.' })} type="text" placeholder='https://' borderRadius='none' focusBorderColor="primary.500" autoComplete="image" />
                            <FormErrorMessage>{errors.image && errors.image?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box display='flex' flexDir={{base: 'column', md: 'row'}} gap={6}>
                        <FormControl isRequired isInvalid={errors.price}>
                            <FormLabel>Price</FormLabel>
                            <Input {...register("price", { required: 'Price is required.' })} type="number" placeholder='Price' borderRadius='none' focusBorderColor="primary.500" autoComplete="price" />
                            <FormErrorMessage>{errors.price && errors.price?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.shortDes}>
                            <FormLabel>Short Description</FormLabel>
                            <Input {...register("shortDes", { required: 'Short description is required.' })} type="text" placeholder='Short description' borderRadius='none' focusBorderColor="primary.500" autoComplete="shortDes" />
                            <FormErrorMessage>{errors.shortDes && errors.shortDes?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box mt={6}>
                        <FormControl isRequired isInvalid={errors.longDes}>
                            <FormLabel>Long Description</FormLabel>
                            <Textarea {...register("longDes", { required: 'Long description is required.' })} type="text" placeholder='Long description' borderRadius='none' focusBorderColor="primary.500" autoComplete="longDes" />
                            <FormErrorMessage>{errors.longDes && errors.longDes?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Button type="submit" colorScheme="primary" borderRadius='none' mt={6} w='100%'>Add Class</Button>
                </form>
            </Card>
        </Box>
    );
};

export default AddClass;