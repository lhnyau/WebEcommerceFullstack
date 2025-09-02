"use client";
import React, { useState, useEffect } from 'react';
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

const ContactListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
`;

const ContactItem = styled.div`
    padding: 1rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
`;

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await callAPI("/contacts", "GET");
            setContacts(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <GlobalStyle />
            <ContactSection id="contact-list">
                <div className="mx-auto max-w-5xl px-6">
                    <Heading className="mb-10 text-center text-2xl font-bold">
                        <span>Contact</span> List
                    </Heading>
                    <ContactListContainer>
                        {contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <ContactItem key={contact.attributes.id}>
                                    <p><strong>Name:</strong> {contact.attributes.name }</p>
                                    <p><strong>Email:</strong> {contact.attributes.email }</p>
                                    <p><strong>Phone Number:</strong> {contact.attributes.phonenumber }</p>
                                    <p><strong>Message:</strong> {contact.attributes.message }</p>
                                </ContactItem>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </ContactListContainer>
                </div>
            </ContactSection>
            <Footer />
        </>
    );
};

export default ContactList;
