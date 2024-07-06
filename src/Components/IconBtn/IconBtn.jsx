import { IconButton } from "@chakra-ui/react";

const IconBtn = ({button}) => {
    return (
        <>
            <IconButton
                onClick={button.handleLogin}
                isRound
                variant='outline'
                colorScheme='primary'
                aria-label='Call Sage'
                fontSize='20px'
                icon={button.icon}
            />
        </>
    );
};

export default IconBtn;