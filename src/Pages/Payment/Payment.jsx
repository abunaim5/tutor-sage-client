import { Box, Card, Text } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SectionHeadDes from "../../Components/SectionHeadDes/SectionHeadDes";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { isLoading, data: cls = {} } = useQuery({
        queryKey: ['cls'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        }
    });

    if(isLoading){
        return;
    }

    return (
        <Box maxW='8xl' mx='auto' my={{base: 10, md: 20}} px={{base: 2, md: 7}}>
            <SectionHeadDes
                heading='Payment'
                description=''
            />
            <Card p={10}>
                <Text textAlign='center' fontSize='2xl' fontWeight={600} mb={10}>Total: ${cls.price}</Text>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cls={cls} />
                </Elements>
            </Card>
        </Box>
    );
};

export default Payment;