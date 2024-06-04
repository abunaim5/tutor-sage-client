import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { Avatar, Box, Card, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const columns = [
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
        name: 'Title',
        selector: row => row.title,
        sortable: true
    },
    {
        name: 'Experience',
        selector: row => row.experience,
        sortable: true
    },
    {
        name: 'Category',
        selector: row => row.category,
        sortable: true
    },
    {
        name: 'Status',
        selector: row => row.status,
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
]

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: teacherRequests = [], refetch } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacherRequests/admin');
            return res.data;
        }
    });

    const handleTeacherApproval = async (teacher, status, role) => {
        console.log(teacher, status)
        const res = await axiosSecure.patch(`/teacherRequests/admin/${teacher?._id}`, { status });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Teacher request has been ${status}`,
                showConfirmButton: false,
                timer: 2000
            });
            if(status === 'Accepted'){
                const res = await axiosSecure.patch(`/users/admin/${teacher.user_id}`, {role});
                if(res.data.modifiedCount > 0){
                    console.log(res.data);
                }
            }
            refetch();
        }
    }

    const requestData = teacherRequests.map(teacher => {
        return {
            image: <Avatar name={teacher.name} src={teacher.photo} my={3} />,
            name: teacher.name,
            title: teacher.title,
            experience: teacher.experience,
            category: teacher.category,
            status: `${teacher?.status ? teacher.status : 'Pending'}`,
            approve: <IconButton
                onClick={() => handleTeacherApproval(teacher, 'Accepted', 'Teacher')}
                variant='solid'
                colorScheme='green'
                aria-label='Done'
                fontSize='20px'
                px={6}
                icon={<CheckIcon />}
                isDisabled={teacher?.status === 'Accepted' && true || teacher?.status === 'Rejected' && true}
            />,
            reject: <IconButton
                onClick={() => handleTeacherApproval(teacher, 'Rejected')}
                variant='solid'
                colorScheme='red'
                aria-label='Done'
                fontSize='18px'
                px={6}
                icon={<CloseIcon />}
                isDisabled={teacher?.status === 'Accepted' && true || teacher?.status === 'Rejected' && true}
            />
        }

    });

    if (isLoading) {
        return;
    }

    return (
        <Box mt={10} mr={2}>
            <Card style={{ height: '100%' }} pt={2} borderRadius='none'>
                <DataTable
                    title={`Teacher Requests (${teacherRequests.length})`}
                    columns={columns}
                    data={requestData}
                    pagination
                    highlightOnHover
                />
            </Card>
        </Box>
    );
};

export default TeacherRequest;