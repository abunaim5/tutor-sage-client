import { Box, Button, Card, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";


const UpdateClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { id } = useParams();
    // console.log(id);

    const { isLoading, data: cls = {} } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        }
    })

    const { data: updateInfo = {}, mutate } = useMutation({
        mutationFn: async (classData) => {
            const res = await axiosSecure.patch(`/classes/${id}`, classData);
            return res;
        }
    });

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const updatedClassData = {
            title: data.title,
            image_url: data.image,
            price: data.price,
            short_description: data.shortDes,
            long_description: data.longDes,
        }

        mutate(updatedClassData);
    };

    if (updateInfo?.data?.modifiedCount > 0) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your class has been updated",
            showConfirmButton: false,
            timer: 2000
        });
    }

    if (isLoading) {
        return;
    }

    return (
        <Box mt={10}>
            <Card mx='auto' p={6} rounded='none'>
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
                            <Input {...register("title", { required: 'Title is required.' })} type="text" defaultValue={cls.title} placeholder='Title' borderRadius='none' focusBorderColor="primary.500" autoComplete="name" />
                            <FormErrorMessage>{errors.title && errors.title?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.image}>
                            <FormLabel>Image</FormLabel>
                            <Input {...register("image", { required: 'Image is required.' })} type="text" defaultValue={cls.image_url} placeholder='https://' borderRadius='none' focusBorderColor="primary.500" autoComplete="image" />
                            <FormErrorMessage>{errors.image && errors.image?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box display='flex' flexDir={{base: 'column', md: 'row'}} gap={6}>
                        <FormControl isRequired isInvalid={errors.price}>
                            <FormLabel>Price</FormLabel>
                            <Input {...register("price", { required: 'Price is required.' })} type="number" defaultValue={cls.price} placeholder='Price' borderRadius='none' focusBorderColor="primary.500" autoComplete="price" />
                            <FormErrorMessage>{errors.price && errors.price?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.shortDes}>
                            <FormLabel>Short Description</FormLabel>
                            <Input {...register("shortDes", { required: 'Short description is required.' })} type="text" defaultValue={cls.short_description} placeholder='Short description' borderRadius='none' focusBorderColor="primary.500" autoComplete="shortDes" />
                            <FormErrorMessage>{errors.shortDes && errors.shortDes?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box mt={6}>
                        <FormControl isRequired isInvalid={errors.longDes}>
                            <FormLabel>Long Description</FormLabel>
                            <Input {...register("longDes", { required: 'Long description is required.' })} type="text" defaultValue={cls.long_description} placeholder='Long description' borderRadius='none' focusBorderColor="primary.500" autoComplete="longDes" />
                            <FormErrorMessage>{errors.longDes && errors.longDes?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Button type="submit" colorScheme="primary" borderRadius='none' mt={6} w='100%'>Update</Button>
                </form>
            </Card>
        </Box>
    );
};

export default UpdateClass;