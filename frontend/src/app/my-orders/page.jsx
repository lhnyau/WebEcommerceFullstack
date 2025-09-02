"use client";
import OrderItem from "@/components/order-item";
import { callAPI } from "@/utils/api-caller";
import { formatCurrency } from "@/utils/helper"; 
import { useEffect, useState } from "react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await callAPI("/my-orders", "GET");
            setOrders(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-3xl font-bold">Đơn hàng của tôi</h1>
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-6">
                    {currentOrders.map((order, index) => (
                        <OrderItem
                            key={index}
                            products={order.products}
                            totalPrice={formatCurrency(order.totalPrice)} // Sử dụng formatCurrency
                            orderDate={order.createdAt}
                            
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

export default MyOrders;