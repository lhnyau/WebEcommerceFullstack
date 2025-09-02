"use client";

import { useState, useEffect } from 'react';
import ProductComponent from '@/components/product-component';
import { callAPI } from '@/utils/api-caller';

const FavoriteProductsPage = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const favoriteProductsPerPage = 6;

    useEffect(() => {
        fetchFavoriteProducts();
    }, []);

    const fetchFavoriteProducts = async () => {
        try {
            const res = await callAPI("/my-favorite-products", "GET");
            setFavoriteProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const indexOfLastFavoriteProduct = currentPage * favoriteProductsPerPage;
    const indexOfFirstFavoriteProduct = Math.max(0, indexOfLastFavoriteProduct - favoriteProductsPerPage);
    
    const currentFavoriteProducts = favoriteProducts.length > 0
        ? favoriteProducts.slice(indexOfFirstFavoriteProduct, indexOfLastFavoriteProduct)
        : [];

    const totalPages = Math.ceil(favoriteProducts.length / favoriteProductsPerPage);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [favoriteProducts, currentPage, totalPages]);

    const paginate = (pageNumber) => {
        setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
    };

    const addToFavorites = async (productId) => {
        try {
          const response = await callAPI('/add-to-favorite-products', 'POST', { productId });
          if (response.success) {
            await fetchFavoriteProducts();
          } else {
            console.error('Failed to add to favorites:', response.message);
          }
        } catch (error) {
          console.error('Error adding to favorites:', error);
        }
      };

    return (
        <div className="min-h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-3xl font-bold">Danh sách sản phẩm yêu thích</h1>
            <div className="mx-auto max-w-5xl px-6">
                {favoriteProducts.length === 0 ? (
                    <p className="text-center">Không có sản phẩm yêu thích nào.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentFavoriteProducts.map((product) => (
                                <ProductComponent
                                    key={product.id}
                                    id={product.id}
                                    productName={product.name}
                                    price={product.price}
                                    brand={product.category?.name}
                                    imageUrl={product.image?.[0]?.url}
                                    isFavorite={true}
                                    addToFavorites={() => addToFavorites(product.id)}
                                />
                            ))}
                        </div>
                        <Pagination
                            favoriteProductsPerPage={favoriteProductsPerPage}
                            totalFavoriteProducts={favoriteProducts.length}
                            paginate={paginate}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

const Pagination = ({ favoriteProductsPerPage, totalFavoriteProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalFavoriteProducts / favoriteProductsPerPage); i++) {
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

export default FavoriteProductsPage;