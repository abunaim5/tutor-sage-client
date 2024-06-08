import { Avatar, Box, Card, IconButton } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { DeleteIcon } from "@chakra-ui/icons";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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
        name: 'Action',
        selector: row => row.delete,
        // sortable: true
    },
]

const Users = () => {
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/admin');
            return res.data;
        }
    });


    const handleMakeAdmin = async (user, role) => {
        const res = await axiosSecure.patch(`/users/admin/${user?._id}`, { role });
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

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/admin/${user?._id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });

    };

    const usersData = users.map((user) => {
        return {
            // count: idx + 1,
            image: <Avatar name={user.name} src={user.photo} my={3} />,
            name: user.name,
            email: user.email,
            role: user?.role === 'Admin' ? user.role : <IconButton
                onClick={() => handleMakeAdmin(user, 'Admin')}
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
                isDisabled={user?.role === 'Admin' ? true : false}
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