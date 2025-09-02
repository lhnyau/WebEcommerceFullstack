"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { callAPI } from "@/utils/api-caller";
import ProductCard from "@/components/ProductCard";
import ProductComponent from "@/components/product-component";
import Footer from "@/components/footer";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const productIdsToShow = [4, 14, 7, 9, 10, 13];

  useEffect(() => {
    fetchFeaturedProducts();
    fetchBestSellingProducts();
    fetchAllProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await callAPI("/featured-products?populate=*", "GET");
      setFeaturedProducts(res.data.data.slice(0, 9));
    } catch (error) {
      console.error("Error fetching featured products", error);
    }
  };

  const fetchBestSellingProducts = async () => {
    try {
      const res = await callAPI("/my-orders", "GET");
      console.log('res', res);
  
      const productSales = {};
  
      res.data.forEach(order => {
        order.products.forEach(product => {
          if (productSales[product.id]) {
            productSales[product.id].amount += product.amount;
          } else {
            productSales[product.id] = {
              ...product,
              amount: product.amount
            };
          }
        });
      });
  
      const sortedProducts = Object.values(productSales)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 6);
  
      setBestSellingProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching best selling products", error);
    }
  };
  

  const fetchAllProducts = async () => {
    try {
      const res = await callAPI("/products?populate=*", "GET");
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching all products", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-xl mb-8">Discover amazing products at great prices</p>
            <Link href="/products">
              <button className="bg-white text-purple-500 font-bold py-2 px-6 rounded-full hover:bg-purple-100 transition duration-300">
                Shop Now
              </button>
            </Link>
          </div>
          </section>

<div className="container mx-auto px-4 py-12">
  {/* Featured Products Section */}
  <section className="mb-16">
    <div className="flex items-center justify-center mb-8">
      <div className="flex-grow border-t border-gray-300"></div>
      <h2 className="mx-4 px-4 py-2 bg-black text-white text-2xl font-bold">Mặt Hàng Nổi Bật</h2>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>

  {/* All Products Section */}
  <section id="Projects" className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800"></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {productIdsToShow.map((productId, index) => {
        const product = products.find(prod => prod.id === productId);
        if (product) {
          return (
            <ProductComponent
              key={index}
              id={product.id}
              productName={product.attributes.name}
              price={product.attributes.price}
              brand={product.attributes.category.data?.attributes.name}
              imageUrl={product.attributes.image.data[0]?.attributes.url}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  </section>

  {/* Best Selling Products Section */}
  <section className="mb-16">
    <div className="flex items-center justify-center mb-8">
      <div className="flex-grow border-t border-gray-300"></div>
      <h2 className="mx-4 px-4 py-2 bg-black text-white text-2xl font-bold">Sản Phẩm Bán Chạy</h2>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {bestSellingProducts.map((product, index) => (
        <div key={product.id} className="relative">
          {index < 3 && (
            <div className={`absolute top-0 left-0 ${['bg-orange-500', 'bg-yellow-500', 'bg-red-500'][index]} text-white px-2 py-1 rounded-br-lg z-10`}>
              TOP {index + 1}
            </div>
          )}
          <ProductComponent
            id={product.id}
            productName={product.name}
            price={product.price}
            brand={product.category?.data?.attributes.name}
            imageUrl={product.image[0]?.url}
          />
        </div>
      ))}
    </div>
  </section>
</div>
</main>
<Footer />
</div>
);
};

export default HomePage;