"use client"; // Thêm dòng này ở đầu file
import { useEffect, useState } from "react";
import { callAPI } from "@/utils/api-caller";
import styled from 'styled-components'; // Import styled-components

import Footer from "@/components/footer"; // Ensure the path to Footer is correct

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const Heading = styled.h1`
    text-align: center ;
    font-size: 2rem;
    color: #333;
    padding: 1rem;
    margin: 2rem 0;
    background: rgb(246, 167, 220);
    font-weight: bold; /* Make the text bold */
`;

const About = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await callAPI(`${URL_SERVER}/about`, "GET");
            setAboutData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`h-screen bg-gray-100 pt-15`}>
            <div className="mx-auto max-w-5xl px-6 ">
                <Heading>About Us</Heading>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <div className="rounded-lg bg-gray-200 p-5 shadow-md">
                        <h2 className="text-xl font-semibold mb-5 mt-10">Chào Mừng Đến Với YuLia</h2>
                        <p>
                            Tại YuLia, chúng tôi chuyên cung cấp các loại ốp lưng điện thoại chất lượng và phong cách.
                            Với đa dạng mẫu mã và chất liệu, chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu
                            với cam kết về chất lượng và đa dạng sản phẩm.
                        </p>
                        <p>
                            <strong>Sứ Mệnh</strong><br />
                            Cung cấp ốp lưng điện thoại không chỉ để bảo vệ mà còn phản ánh phong cách và cá tính riêng của bạn.
                        </p>
                        <p>
                            <strong>Giá Trị Cốt Lõi</strong><br />
                            Chất Lượng: Sản phẩm bền đẹp, bảo vệ tối ưu.<br />
                            Đa Dạng: Mẫu mã phong phú cho mọi dòng điện thoại.<br />
                            Khách Hàng: Dịch vụ hỗ trợ tận tình và chu đáo.<br />
                            Sáng Tạo: Luôn đổi mới với những thiết kế độc đáo.
                        </p>
                    </div>

                    <div className={`flex justify-center items-center`}>
                        <img
                            src="/images/about1.jpg"
                            alt="About Us"
                            className="rounded-lg"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
</div>
                </div>
            </div>
            <Footer /> {/* Ensure the footer is outside the max-width container */}
        </div>
    );
};

export default About;