"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 ">Liên kết nhanh</h3>
                        <ul>
                            <li className="mb-1">
                                <Link href="/" className="hover:text-gray-400">Trang chủ</Link>
                            </li>
                            <li className="mb-1">
                                <Link href="/about" className="hover:text-gray-400">Giới thiệu</Link>
                            </li>
                            <li className="mb-1">
                                <Link href="/products" className="hover:text-gray-400">Sản phẩm</Link>
                            </li>
                            <li className="mb-1">
                                <Link href="/categories" className="hover:text-gray-400">Danh mục</Link>
                            </li>
                            <li className="mb-1">
                                <Link href="/contact" className="hover:text-gray-400">Liên hệ</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Liên kết bổ sung</h3>
                        <ul>
                            <li className="mb-1">
                                <Link href="/my-profile" className="hover:text-gray-400">Hồ sơ của tôi</Link>
                            </li>
                            <li className="mb-1">
                                <Link href="/my-orders" className="hover:text-gray-400">Đơn hàng của tôi</Link>
                            </li>
                            <li className="mb-1">
                                <Link href="shopping-cart" className="hover:text-gray-400">Giỏ hàng của tôi</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Thông tin liên hệ</h3>
                        <ul>
                            <li className="mb-1">
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                <a href="tel:+1234567890" className="hover:text-gray-400">+123-456-7890</a>
                            </li>
                            <li className="mb-1">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                <a href="mailto:example@gmail.com" className="hover:text-gray-400">yuliashop@gmail.com</a>
                            </li>
                            <li className="mb-1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                <span>TPHCM, Việt Nam </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <p className="text-sm">&copy; 2024 Yulia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;