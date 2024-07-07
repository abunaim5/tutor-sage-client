import ProfileCard from "../../../Components/ProfileCard/ProfileCard";
import useUser from "../../../Hooks/useUser";

const MyProfile = () => {
    const [userInfo, isUserLoading] = useUser();

    if (isUserLoading) {
        return;
    }

    return (
        <>
            <ProfileCard userInfo={userInfo} />
        </>
    );
};

export default MyProfile;