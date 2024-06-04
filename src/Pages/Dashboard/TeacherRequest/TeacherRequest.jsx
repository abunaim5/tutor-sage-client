import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { Avatar, Box, Card, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


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

    const { isLoading, data: teacherRequests = [] } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacherRequests');
            return res.data;
        }
    });

    const requestData = teacherRequests.map(request => {
        return {
            image: <Avatar name={request.name} src={request.photo} my={3} />,
            name: request.name,
            title: request.title,
            experience: request.experience,
            category: request.category,
            status: `${request?.status ? request.status : 'Pending'}`,
            approve: <IconButton
                variant='solid'
                colorScheme='green'
                aria-label='Done'
                fontSize='20px'
                px={6}
                icon={<CheckIcon />}
            />,
            reject: <IconButton
                variant='solid'
                colorScheme='red'
                aria-label='Done'
                fontSize='18px'
                px={6}
                icon={<CloseIcon />}
            />
        }

    });
    
    if (isLoading) {
        return;
    }

    return (
        <Box mt={10} mr={2}>
            <Card style={{height: '100%'}} pt={2} borderRadius='none'>
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