"use client";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined, setToken, setUser } from "@/utils/helper";

import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "./context";


const Header = () => {
    const [categories, setCategories] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [user, setUserState] = useState(getUser());
    const router = useRouter();

    useEffect(() => {
        fetchData();
        if (isLogined()) {
            fetchShoppingCart();
        }
    }, []);

    const fetchData = async () => {
        try {
            const res = await callAPI("/categories", "GET");
            setCategories(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const { setShoppingCart, isFetchedShoppingCart, setIsFetchedShoppingCart } = useAppContext();

    const fetchShoppingCart = async () => {
        if (!isFetchedShoppingCart) {
            try {
                const res = await callAPI("/my-shopping-cart", "GET");
                setShoppingCart(res.data);
                setIsFetchedShoppingCart(true);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const logout = () => {
        setToken("");
        setUser(null);
        setUserState(null);
        router.replace("/");
    };

    const { shoppingCart } = useAppContext();

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo.png" className="h-10 mr-3" alt="Yulia Logo" />
                        <span className="text-2xl font-bold text-gray-800">Yulia</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/home" className="text-gray-700 hover:text-pink-500 transition duration-300 font-medium">Trang chủ</Link>
                        <Link href="/about" className="text-gray-700 hover:text-pink-500 transition duration-300 font-medium">Giới thiệu</Link>
                        <Link href="/products" className="text-gray-700 hover:text-pink-500 transition duration-300 font-medium">Sản phẩm</Link>
                        <div className="relative group">
                            <button 
                                onClick={() => setMenuOpen(!menuOpen)} 
                                className="text-gray-700 hover:text-pink-500 transition duration-300 font-medium flex items-center"
                            >
                                Danh mục
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {menuOpen && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                                    {categories.map((val, index) => (
                                        <Link 
                                            key={index} 
                                            href={"/category/" + val.id} 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                                        >
                                            {val.attributes.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        {user?.role.type !== 'shopmanager' ? (
                            <Link href="/contact" className="text-gray-700 hover:text-pink-500 transition duration-300 font-medium">Liên hệ</Link>
                        ) : (
                            <Link href="/contact-list" className="text-gray-700 hover:text-pink-500 transition duration-300 font-medium">Danh sách liên hệ</Link>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <div className="flex items-center">
                                <Link href="/login/signup" className="px-4 py-2 text-black hover:text-gray-600 transition duration-300 font-medium">
                                    Đăng Ký
                                </Link>
                                <div className="h-6 w-px bg-black mx-2"></div>
                                <Link href="/login" className="px-4 py-2 text-black hover:text-gray-600 transition duration-300 font-medium">
                                    Đăng Nhập
                                </Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <button 
                                    onClick={() => setUserMenu(!userMenu)} 
                                    className="flex items-center space-x-2 text-gray-600"
                                    >
                                    <FontAwesomeIcon 
                                    icon={faUser} 
                                    className="text-pink-500 hover:text-pink-600 transition duration-300" 
                                    style={{ width: '1em', height: '1em' }}
                                    />
                                    <span className="hover:text-pink-500 transition duration-300">{user.username}</span>
                                    </button>
                                {userMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                        <Link href="/my-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Thông tin cá nhân</Link>
                                        {user?.role.type !== 'shopmanager' ? (
                                            <Link href="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đơn hàng</Link>
                                        ) : (
                                            <Link href="/ordermanager" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Quản lý đơn hàng</Link>
                                        )}
                                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đăng xuất</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {user && (
                            <Link href="/shopping-cart" className="relative text-gray-600 hover:text-gray-800">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {shoppingCart.length}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;