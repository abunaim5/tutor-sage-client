import { Box, Button, Card, Icon } from "@chakra-ui/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdOutlineFeedback } from "react-icons/md";
import Swal from "sweetalert2";

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

    if (isLoading || isPending) {
        return;
    }

    return (
        <Box my={10}>
            <Button colorScheme='green' borderRadius='none' px={8} py={6} fontSize='xl'><Icon as={MdOutlineFeedback} mr={2} fontSize='2xl' />TER</Button>
            <Box mt={10}>
                <Card style={{ height: '100%' }} pt={2} borderRadius='none'>
                    <DataTable
                        title={`Assignments (${cls?.assignments?.length})`}
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