"use client";
import OrderManagerItem from "@/components/order-manager-item";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const ordersPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await callAPI("/my-orders", "GET");
            const filteredOrders = res.data.filter(order => !order.completed); // Lọc ra những đơn hàng chưa hoàn thành
            setOrders(filteredOrders);
        } catch (error) {
            console.log(error);
        }
    };
    

    

    const completeOrder = async (orderId) => {
        try {
            await callAPI(`/complete-order/${orderId}`, "POST");
            // Cập nhật lại danh sách đơn hàng sau khi hoàn thành thành công
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
    
            setMessage({ text: "Đơn hàng đã được bàn giao cho đơn vị vận chuyển", type: "success" });
            setShowMessage(true);
            setTimeout(() => {
                setMessage({ text: "", type: "" });
                setShowMessage(false);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };    

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-3xl font-bold">Quản lý đơn hàng</h1>
            <div className="mx-auto max-w-5xl px-6">
                {showMessage && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-4 text-center">
                        {message.type === "error" ? (
                            <p className="text-red-500 font-bold">{message.text}</p>
                        ) : (
                            <>
                                <p className="text-green-500 font-bold">{message.text}</p>
                                <div className="mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline-block text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
<span>🚚...</span>
                                </div>
                            </>
                        )}
                    </div>
                )}
                <div className="grid gap-6">
                    {currentOrders.map((order, index) => (
                        <OrderManagerItem
                            key={index}
                            products={order.products}
                            totalPrice={order.totalPrice}
                            orderDate={order.createdAt}
                            adress={order.adress} 
                            phone={order.phone} 
                            onCancel={() => cancelOrder(order.id)}
                            onComplete={() => completeOrder(order.id)}
                            
                        />
                    ))}
                </div>
                <Pagination
                    ordersPerPage={ordersPerPage}
                    totalOrders={orders.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

const Pagination = ({ ordersPerPage, totalOrders, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-6">
            <ul className="inline-flex items-center -space-x-px">
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => paginate(number)} className="cursor-pointer">
                        <a className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default OrderManager;