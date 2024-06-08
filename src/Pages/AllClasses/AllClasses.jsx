import { Box } from "@chakra-ui/react";
import ClassCard from "../../Components/ClassCard/ClassCard";
import useClasses from "../../Hooks/useClasses";

const AllClasses = () => {
    const [classes, isClassesLoading] = useClasses();

    if (isClassesLoading) {
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={20} px={7}>
            <Box gap={6} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    classes.map(cls => <ClassCard key={cls._id} cls={cls} />)
                }
            </Box>
        </Box>
    );
};

export default AllClasses;