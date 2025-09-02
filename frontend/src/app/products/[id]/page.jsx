"use client";

import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/helper";
import { useAppContext } from "@/components/context";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ViewDetailProduct = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { setShoppingCart } = useAppContext();
    const [showAlert, setShowAlert] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        getDetailProduct();
    }, [params]);

    const getDetailProduct = async () => {
        try {
            const res = await callAPI(`/products/${params.id}?populate=*`, "GET");
            setProduct(res.data.data);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        }
    };

    const increase = () => {
        setQuantity(prev => prev + 1);
    };

    const decrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const addToCart = async () => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId: product.id, amount: quantity });
            setShoppingCart(res.data);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };
    const formatDescription = (description) => {
        return description.split('\n').map((line, index) => (
          <p key={index} className="text-gray-700 mb-2">{line}</p>
        ));
      };

    if (!product) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-6">
                            <div className="aspect-w-4 aspect-h-3 mb-4">
                                <img
                                    src={`${URL_SERVER}${product.attributes.image.data[selectedImage].attributes.url}`}
                                    alt={product.attributes.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto py-2">
                                {product.attributes.image.data.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${URL_SERVER}${img.attributes.url}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-20 h-20 object-cover cursor-pointer rounded-md transition-all ${selectedImage === index ? 'border-2 border-red-500 shadow-lg' : 'opacity-70 hover:opacity-100'}`}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Mô tả sản phẩm</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    {formatDescription(product.attributes.description)}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 p-6 bg-gray-50">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight break-words">
                                {product.attributes.name}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-sm text-gray-500">{product.attributes.category.data?.attributes.name || 'Chưa phân loại'}</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-red-600">{formatCurrency(product.attributes.price)}</span>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Số Lượng</h3>
                                <div className="flex items-center gap-4">
                                    <button onClick={decrease} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                                        <span className="text-xl">-</span>
                                    </button>
                                    <input type="text" value={quantity} className="w-16 text-center border border-gray-300 rounded-md" readOnly />
                                    <button onClick={increase} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                                        <span className="text-xl">+</span>
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{product.attributes.in_stock || 0} sản phẩm có sẵn</p>
                            </div>
                            <button 
                                onClick={addToCart} 
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out flex items-center justify-center mb-6"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Thêm Vào Giỏ Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showAlert && (
                <div
                className="fixed bottom-[1%] right-[1%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
                >
                <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1Z"></path>
                </svg>
                <p className="font-medium">Sản phẩm đã được thêm vào giỏ hàng!</p>
                </div>
            )}
        </div>
    );
};

export default ViewDetailProduct;