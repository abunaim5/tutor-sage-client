import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, IconButton } from "@chakra-ui/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const columns = [
    {
        name: 'Image',
        selector: row => row.image,
        // sortable: true
    },
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true
    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true
    },
    {
        name: 'Approve',
        selector: row => row.approve,
        // sortable: true
    },
    {
        name: 'Reject',
        selector: row => row.reject,
        // sortable: true
    },
    {
        name: 'Progress',
        selector: row => row.progress,
        // sortable: true
    },
]

const ClassRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: classRequests = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes/admin');
            return res.data;
        }
    });

    const handleClassApproval = async (cls, status) => {
        console.log(cls, status)
        const res = await axiosSecure.patch(`/classes/admin/${cls?._id}`, {status});
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${cls?.title} class has been ${status}`,
                showConfirmButton: false,
                timer: 2000
            });
            refetch();
        }
    };

    const classRequestData = classRequests.map(cls => {
        return {
            image: <Avatar name={cls.title} src={cls.image_url} my={3} />,
            title: cls.title,
            email: cls?.email,
            description: cls.short_description,
            approve: cls.status === 'Accepted' && 'Approved' || <IconButton
                onClick={() => handleClassApproval(cls, 'Accepted')}
                variant='solid'
                colorScheme='green'
                aria-label='Done'
                fontSize='20px'
                px={6}
                icon={<CheckIcon />}
                isDisabled={cls.status === 'Rejected' && true}
            />,
            reject: cls.status === 'Rejected' && 'Rejected' || <IconButton
                onClick={() => handleClassApproval(cls, 'Rejected')}
                variant='solid'
                colorScheme='red'
                aria-label='Done'
                fontSize='18px'
                px={6}
                icon={<CloseIcon />}
                isDisabled={cls.status === 'Accepted' && true}
            />,
            progress: <Button as={Link} to={`/class-details/${cls._id}`} colorScheme="blackAlpha" isDisabled={cls.status !== 'Accepted' && true}>Progress</Button>
        }
    });

    if (isLoading) {
        return;
    }

    return (
        <Box mt={10} mr={2}>
            <Card style={{ height: '100%' }} pt={2} borderRadius='none'>
                <DataTable
                    title={`Class Requests (${classRequests.length})`}
                    columns={columns}
                    data={classRequestData}
                    pagination
                    highlightOnHover
                />
            </Card>
        </Box>
    );
};

export default ClassRequests;