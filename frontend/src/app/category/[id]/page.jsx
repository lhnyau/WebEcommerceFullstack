"use client";

import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";

const ProductByCategory = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const categoryId = params.id;
            const [productsRes, categoryRes] = await Promise.all([
                callAPI("/products?populate=*&filters[category][id][$eq]=" + categoryId, "GET"),
                callAPI("/categories/" + categoryId, "GET")
            ]);
            setProducts(productsRes.data.data);
            setCategory(categoryRes.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {category ? category.attributes.name : 'Đang tải...'}
                </h1>
                
            </div>
            
            {products.length === 0 ? (
                <div className="text-center text-gray-600 text-xl">
                    Không có sản phẩm nào trong danh mục này.
                </div>
            ) : (
                <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {products.map((value, index) => (
                        <ProductComponent
                            id={value.id}
                            key={index}
                            productName={value.attributes.name}
                            price={value.attributes.price}
                            brand={value.attributes.category.data.attributes.name}
                            imageUrl={value.attributes.image.data[0].attributes.url}
                        />
                    ))}
                </section>
            )}
            <Footer/>
        </div>
    );
};

export default ProductByCategory;