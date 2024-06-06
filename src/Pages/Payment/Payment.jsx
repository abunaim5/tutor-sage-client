import { Box, Card, Heading, Text } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <Box maxW='8xl' mx='auto' my={20} px={7}>
            <Heading fontFamily='body'>Payment</Heading>
            <Box h={1} bg='primary.500' w={14} mt={6} mb={16} />
            <Card p={10}>
                <Text textAlign='center' fontSize='2xl' fontWeight={600} mb={10}>Total: $100</Text>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </Card>
        </Box>
    );
};

export default Payment;