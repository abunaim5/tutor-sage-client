import { Box, Heading, Icon } from "@chakra-ui/react";
import FAQ from '../../../assets/images/FAQ.png'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { FaQuestion } from "react-icons/fa";

const FAQuestion = () => {
    return (
        <Box bg={`url(${FAQ})`} bgAttachment='fixed' bgPos='center'>
            <Box maxW='8xl' mx='auto' py={32} className="grid grid-cols-1 lg:grid-cols-2 lg:px-10">
                <Box bg='primary.500' p={12} textColor='white' textAlign='center'>
                    <Heading fontFamily='body'>Frequently Asked Questions (FAQ)</Heading>
                    <Icon as={FaQuestion} fontSize='8xl' mt={16} />
                </Box>
                <Box bg='white' p={12}>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                    <Box as='span' flex='1' textAlign='left'>
                                        What is TutorSage?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                TutorSage is an innovative online learning platform that connects students, tutors, and educational institutions. Our goal is to make skill learning and class management more efficient and accessible for everyone.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                    <Box as='span' flex='1' textAlign='left'>
                                        How do I enroll in a course?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                To enroll in a course, simply browse our catalog, select the class you’re interested in, and click on the “Enroll Now” button. You will be guided through the registration and payment process.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                    <Box as='span' flex='1' textAlign='left'>
                                        Can I become an instructor on TutorSage?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Yes! We welcome passionate educators and experts to join our platform. Visit our “Become an Instructor” page for more details on how to sign up and start sharing your knowledge with students worldwide.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                    <Box as='span' flex='1' textAlign='left'>
                                        What payment methods do you accept?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                We accept a variety of payment methods, including credit/debit cards, PayPal, and other secure online payment options. All transactions are encrypted and secure.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                    <Box as='span' flex='1' textAlign='left'>
                                        How can I contact support if I have an issue?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                If you need assistance, our support team is here to help. You can contact us through the “Contact Us” page on our website, or email us at support@tutorsage.com. We aim to respond to all inquiries within 24 hours.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Box>
        </Box>
    );
};

export default FAQuestion;