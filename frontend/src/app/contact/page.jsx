"use client";
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from "@/components/footer";
import { callAPI } from "@/utils/api-caller";
const GlobalStyle = createGlobalStyle`
    :root {
        --pink: #ff69b4;
        --dark-pink: #d2366d;
    }

    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #__next {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
`;

const ContactSection = styled.section`
    padding: 0rem 2rem;
    background-color: #f5f5f5;
    flex: 1; // Ensures the contact section takes up remaining height
`;

const Heading = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    color: #333;
    padding: 1rem;
    margin: 0rem 0;
    background: rgb(239 184 211);
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    flex: 1 1 12rem;
    padding: 2.7rem;
    margin-top: 1.5rem;
    margin-bottom: 4rem;
    margin-right: -2rem;
    box-shadow: 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 0.5rem;
`;

const ImageContainer = styled.div`
    flex: 1 1 8rem;
    text-align: center;
`;

const ContactImage = styled.img`
    max-width: 100%;
    margin-bottom: 3rem;
    margin-top: 2rem;
    height: auto;
`;

const Input = styled.input`
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    color: #333;
    text-transform: none;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    margin: 0.7rem 0;

    &:focus {
        outline: none;
        border-color: var(--pink);
    }
`;

const TextArea = styled.textarea`
    height: 10rem;
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    color: #333;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    margin: 0.7rem 0;
    resize: none;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #333;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--dark-pink);
    }
`;

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [message, setMessage] = useState('');

    const onSendMessage = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        try {
            const data = {
                name,
                email,
                phonenumber,
                message
            };
            const res = await callAPI("/send-message", "POST", data);
            console.log(res.data);
            
            // Xóa nội dung các trường sau khi gửi thành công
            setName('');
            setEmail('');
            setPhonenumber('');
            setMessage('');
            
            // Show success message
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <>
            <GlobalStyle />
            <ContactSection id="contact">
                <div className="mx-auto max-w-5xl px-6">
                    <Heading className="mb-10 text-center text-2xl font-bold">
                        <span>Contact</span> Us
                    </Heading>
                    <Row>
                        <Form onSubmit={onSendMessage}>
                            <Input 
                                type="text" 
                                placeholder="Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input 
                                type="tel" 
                                placeholder="Phone Number" 
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                            />
                            <TextArea 
                                placeholder="Message" 
                                cols="30" 
                                rows="10"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></TextArea>
                            <SubmitButton type="submit">
                                Send Message
                            </SubmitButton>
                        </Form>
                        <ImageContainer>
                            <ContactImage src="images/contact.jpg" alt="Contact" />
                        </ImageContainer>
                    </Row>
                </div>
            </ContactSection>
            <Footer />
        </>
    );
};

export default Contact;