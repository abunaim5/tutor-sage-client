import { Box, Button, Text } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const CheckoutForm = ({ cls }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [paymentSuccessStatus, setPaymentSuccessStatus] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { mutate } = useMutation({
        mutationFn: async (enrollClassInfo) => {
            const res = await axiosSecure.post('/enrollClasses', enrollClassInfo);
            return res;
        }
    })

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: cls.price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, cls.price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.error('[Payment error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.error('[Payment Intent Error]', error);
        } else {
            console.log('[PaymentIntent]', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment successful",
                    showConfirmButton: false,
                    timer: 2000
                });
                setPaymentSuccessStatus(paymentIntent.status);
                const enrollClassInfo = {
                    class_id: cls._id,
                    title: cls.title,
                    posted_by: cls.posted_by,
                    image_url: cls.image_url,
                    price: cls.price,
                    short_description: cls.short_description,
                    long_description: cls.long_description,
                    email: cls.email,
                    user_email: user?.email,
                    user_name: user?.displayName,
                    transactionId: paymentIntent.id
                }
                mutate(enrollClassInfo);
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <Box textAlign='center' mt={10}>
                <Button colorScheme="primary" borderRadius='none' px={10} type="submit" isDisabled={!stripe || !clientSecret || paymentSuccessStatus}>
                    Pay
                </Button>
                <Text textAlign='center' textColor='red' mt={4}>{error}</Text>
            </Box>
        </form>
    );
};

export default CheckoutForm;