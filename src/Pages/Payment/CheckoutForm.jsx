import { Box, Button, Text } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const stripe = useStripe();
    const elements = useElements();

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
                <Button colorScheme="primary" borderRadius='none' px={10} type="submit" disabled={!stripe}>
                    Pay
                </Button>
                <Text textAlign='center' textColor='red' mt={4}>{error}</Text>
            </Box>
        </form>
    );
};

export default CheckoutForm;