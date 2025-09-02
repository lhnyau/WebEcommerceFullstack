"use client";
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/helper";
import Link from 'next/link'; // Import Link từ next/link

// Định nghĩa CSS cho toàn bộ trang
const GlobalStyle = createGlobalStyle`
    :root {
        --pink: #ff69b4;
        --dark-pink: #d2366d;
    }

    body {
        font-family: 'Roboto', sans-serif; /* Thay đổi font-family tùy chọn */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

// Định nghĩa các styled components cho phần home
const HomeSection = styled.section`
    display: flex;
    align-items: center;
    min-height: 120vh;
    background: url('../images/home-bg.jpeg') no-repeat;
    background-size: cover;
    background-position: center;
    padding: 2rem 9%;
`;

const Content = styled.div`
    max-width: 45rem;
`;

const Heading = styled.h3`
    font-size: 3.5rem;
    color: #333;
    margin-top: -10rem; /* Chỉnh độ rộng phía trên */
`;

const SubHeading = styled.span`
    font-size: 2rem;
    color: var(--pink);
    padding: 1rem 0;
    line-height: 1.5;
`;

const Paragraph = styled.p`
    font-size: 1.5rem;
    color: #999;
    padding: 1rem 0;
    line-height: 1.5;
`;

const ShopButton = styled.a`
    display: inline-block;
    margin-top: 1rem;
    border-radius: 5rem;
    background: #333;
    color: #fff;
    padding: 0.9rem 3.5rem;
    cursor: pointer;
    font-size: 1.7rem;
    text-decoration: none;

    &:hover {
        background: var(--pink);
    }
`;

const Home = () => {
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        console.log(getUser());
        if (getUser()?.role?.name === "ShopManager") {
            router.replace("/shop-manager");
            
        }
        setHydrated(true);
    }, [router]);

    if (!hydrated) {
        return null; 
    }

    return (
        <>
            <GlobalStyle />
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                    <HomeSection id="home">
                        <Content className="content">
                            <Heading>Phone Case</Heading>
                            <SubHeading>Dấu ấn riêng với hàng trăm mẫu ốp điện thoại</SubHeading>
                            <Paragraph>
                                Bảo vệ và làm đẹp cho điện thoại của bạn với những mẫu ốp lưng thời trang
                                và bền bỉ nhất tại cửa hàng chúng tôi.
                            </Paragraph>
                            <Link href="/products">
<ShopButton className="btn">Shop now</ShopButton>
                            </Link>
                        </Content>
                    </HomeSection>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;