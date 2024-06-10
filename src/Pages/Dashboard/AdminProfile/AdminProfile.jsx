import { Box } from "@chakra-ui/react";
import ProfileCard from "../../../Components/ProfileCard/ProfileCard";
import useUser from "../../../Hooks/useUser";

const AdminProfile = () => {
    const [userInfo, isUserLoading] = useUser();
    console.log(userInfo)

    if(isUserLoading){
        return;
    }

    return (
        <Box>
            <ProfileCard userInfo={userInfo} />
        </Box>
    );
};

export default AdminProfile;