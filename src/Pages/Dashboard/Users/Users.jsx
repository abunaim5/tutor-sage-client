import { Avatar, Box, Card, IconButton } from "@chakra-ui/react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaUsers } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { DeleteIcon } from "@chakra-ui/icons";

const columns = [
    // {
    //     name: '#',
    //     selector: row => row.count,
    //     // sortable: true
    // },
    {
        name: 'Image',
        selector: row => row.image,
        // sortable: true
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,

    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true
    },
    {
        name: 'Role',
        selector: row => row.role,
        // sortable: true
    },
    {
        name: 'Delete',
        selector: row => row.delete,
        // sortable: true
    },
]

const Users = () => {
    const axiosPublic = useAxiosPublic();

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });


    const handleMakeAdmin = async (user) => {
        const res = await axiosPublic.patch(`/users/admin/${user?._id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user?.name} is admin now`,
                showConfirmButton: false,
                timer: 2000
            });
            refetch();
        }
    };

    const usersData = users.map((user) => {
        return {
            // count: idx + 1,
            image: <Avatar name={user.name} src={user.photo} my={3} />,
            name: user.name,
            email: user.email,
            role: user?.role && user.role || <IconButton
                onClick={() => handleMakeAdmin(user)}
                variant='solid'
                colorScheme='green'
                aria-label='Done'
                fontSize='20px'
                px={6}
                icon={<FaUsers />}
            />,
            delete: <IconButton
                onClick={() => handleDeleteUser(user)}
                variant='solid'
                colorScheme='red'
                aria-label='Done'
                fontSize='20px'
                px={6}
                icon={<DeleteIcon />}
            />
        }
    });

    if (isLoading) {
        return;
    }

    return (
        <Box mt={10}>
            <Card style={{ height: '100%' }} pt={2} borderRadius='none'>
                <DataTable
                    title={`Users (${users.length})`}
                    columns={columns}
                    data={usersData}
                    pagination
                    highlightOnHover
                />
            </Card>
        </Box>
    );
};

export default Users;