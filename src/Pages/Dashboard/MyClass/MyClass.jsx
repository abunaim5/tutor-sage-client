import { Box } from "@chakra-ui/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import MyClassCard from "./MyClassCard";
import Swal from "sweetalert2";

const MyClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { isPending, data: myClasses = [], refetch } = useQuery({
        enabled: !loading,
        queryKey: ['myClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClasses/${user?.email}`);
            return res.data;
        }
    });

    const handleDeleteClass = async (id) => {
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
                const res = await axiosSecure.delete(`/classes/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Class has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }

    if (isPending) {
        return;
    }

    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                myClasses.map(cls => <MyClassCard
                    key={cls._id}
                    cls={cls} user={user}
                    handleDeleteClass={handleDeleteClass}
                />)
            }
        </Box>
    );
};

export default MyClass;