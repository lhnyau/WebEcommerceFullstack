"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined, formatCurrency } from "@/utils/helper";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ShopManager = () => {
    const router = useRouter();
    const [revenue, setRevenue] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Doanh thu',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    });

    useEffect(() => {
        const checkAuth = async () => {
            if (!isLogined()) {
                router.replace("/login");
                return;
            }

            const user = getUser();
            if (user.role.name !== "ShopManager") {
                router.replace("/");
                return;
            }

            await fetchOrdersAndCalculateRevenue();
        };

        checkAuth();
    }, [router]);

    const fetchOrdersAndCalculateRevenue = async () => {
        try {
            const res = await callAPI("/my-orders", "GET"); // Assuming this endpoint returns orders
            const orders = res.data;

            const revenueHistory = calculateRevenueHistory(orders);
            const totalRevenue = revenueHistory.reduce((total, item) => total + item.revenue, 0);

            setRevenue(totalRevenue);
            setChartData({
                labels: revenueHistory.map(item => item.date),
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: revenueHistory.map(item => item.revenue)
                    }
                ]
            });
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const calculateRevenueHistory = (orders) => {
        const revenueMap = new Map();
        
        orders.forEach(order => {
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB');
            const totalPrice = Math.round(order.totalPrice / 10000) * 10000; // Round to nearest ten thousand VND
    
            if (revenueMap.has(orderDate)) {
                revenueMap.set(orderDate, revenueMap.get(orderDate) + totalPrice);
            } else {
                revenueMap.set(orderDate, totalPrice);
            }
        });
    
        const revenueHistory = Array.from(revenueMap).map(([date, revenue]) => ({ date, revenue }));
        return revenueHistory;
    };

    return (
        <div style={styles.container}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tổng doanh thu: {formatCurrency(revenue)}</h2>
            <div style={styles.chartContainer}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        textAlign: 'center',
        padding: '20px',
    },
    chartContainer: {
        height: '700px',
        width: '800px',
    }
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Doanh thu theo ngày',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Ngày',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Doanh thu (VND)',
            },
        },
    },
};

export default ShopManager;