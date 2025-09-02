"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductComponent from '@/components/product-component';
import { callAPI } from '@/utils/api-caller';
import Footer from "@/components/footer";

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortRef = useRef(null);


    useEffect(() => {
        const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
        const sort = searchParams.get('sort') || '';
        setCurrentPage(page);
        setSortOption(sort);
        fetchData(page, sort);
    }, [searchParams]);

    const fetchData = async (page, sort) => {
        try {
            let url = `/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;
            if (searchTerm) {
                url += `&filters[name][$containsi]=${encodeURIComponent(searchTerm)}`;
            }
            if (sort) {
                switch(sort) {
                    case 'price:asc':
                        url += '&sort[0]=price:asc';
                        break;
                    case 'price:desc':
                        url += '&sort[0]=price:desc';
                        break;
                    case 'name:asc':
                        url += '&sort[0]=name:asc';
                        break;
                    case 'name:desc':
                        url += '&sort[0]=name:desc';
                        break;
                    case 'createdAt:asc':
                        url += '&sort[0]=createdAt:asc';
                        break;
                    case 'createdAt:desc':
                        url += '&sort[0]=createdAt:desc';
                        break;
                    // Thêm các trường hợp khác nếu cần
                }
            }
            const res = await callAPI(url, 'GET');
            setProducts(res.data.data);
            setPageCount(res.data.meta.pagination.pageCount);
            setNoResults(res.data.data.length === 0);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        router.push(`/products?page=1${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}${sortOption ? `&sort=${sortOption}` : ''}`);
    };

    const handleSort = (option) => {
        setSortOption(option);
        router.push(`/products?page=1${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}&sort=${option}`);
    };

    const prev = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            router.push(`/products?page=${newPage}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}${sortOption ? `&sort=${sortOption}` : ''}`);
        }
    };

    const next = () => {
        if (currentPage < pageCount) {
            const newPage = currentPage + 1;
            router.push(`/products?page=${newPage}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}${sortOption ? `&sort=${sortOption}` : ''}`);
        }
    };
    const toggleSortOptions = () => {
        setShowSortOptions(!showSortOptions);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setShowSortOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sortRef]);

    return (
        <div>
            <div className="flex items-center justify-center my-8 space-x-4">
                <div className="relative flex items-center w-80">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm..." 
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-sm"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 focus:outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
                <div className="relative" ref={sortRef}>
                    <button 
                        onClick={toggleSortOptions}
                        className="px-4 py-2 bg-gray-200 rounded-full focus:outline-none text-sm flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Sắp xếp
                    </button>
                    {showSortOptions && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button onClick={() => handleSort('price:asc')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Giá: Tăng dần</button>
                                <button onClick={() => handleSort('price:desc')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Giá: Giảm dần</button>
                                <button onClick={() => handleSort('name:asc')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Tên: A-Z</button>
                                <button onClick={() => handleSort('name:desc')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Tên: Z-A</button>
                                <button onClick={() => handleSort('createdAt:asc')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Cũ nhất</button>
                                <button onClick={() => handleSort('createdAt:desc')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Mới nhất</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {noResults ? (
                <div className="text-center text-red-500">Không có sản phẩm nào</div>
            ) : (
                <section
                    id="Projects"
                    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
                >
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
            <div className="flex flex-col items-center">
                <div className="inline-flex mt-2 xs:mt-0">
                    <button
                        disabled={currentPage <= 1}
                        onClick={prev}
                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4"
                            />
                        </svg>
                        Prev
                    </button>
                    <span className="ml-5 mr-5 font-bold">
                        {currentPage} / {pageCount}
                    </span>
                    <button
                        disabled={currentPage >= pageCount}
                        onClick={next}
                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Next
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                </div>
            </div >
            <div className="mt-8">
                <Footer/>
            </div>
        </div>
    );
};

export default ProductsPage;