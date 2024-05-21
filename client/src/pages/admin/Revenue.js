import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { apiGetProducts } from 'apis/product';
import { CiAlignBottom } from 'react-icons/ci'; // Import icon if not already imported
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from "react-loading";

const Revenue = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Initial loading state

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 1000 }); // Adjust limit as needed
        if (response.success) {
            setProducts(response.products);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        // Show the loading spinner for 3 seconds when the component mounts
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

    const getCategoryCounts = () => {
        const counts = {};
        products.forEach(product => {
            if (counts[product.category]) {
                counts[product.category].count++;
                counts[product.category].products.push(product);
            } else {
                counts[product.category] = {
                    count: 1,
                    products: [product],
                };
            }
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    return (
        <div div className='flex items-center justify-center w-full bg-white min-h-screen relative text-black' >
            {loading && (
                <div className='fixed inset-0 flex items-center justify-center  z-50'>
                    <ReactLoading
                        type="spinningBubbles"
                        color="#ee3131"
                        height={100}
                        width={50}
                    />
                </div>
            )}
            <div className='w-full max-w-4xl p-4'>
                <h1 className='text-2xl font-bold mb-4 bg-main text-white border shadow-sm p-2 rounded flex items-center justify-center'>
                    Product Counts by Category
                    <CiAlignBottom className='ml-2' size={30} />
                </h1>
                <div className='bg-white p-4 border rounded shadow-md'>
                    <ul>
                        {Object.entries(categoryCounts).map(([category, data]) => (
                            <li key={category} className='py-2 border-b last:border-b-0'>
                                <div className='flex justify-between'>
                                    <span className='font-semibold text-main'>{category}</span>
                                    <span className='font-semibold text-main'>{data.count}</span>
                                </div>
                                <ul className='pl-4 mt-2'>
                                    {data.products.map(product => (
                                        <li key={product._id} className='flex justify-between py-1'>
                                            <span className='text-gray-700'>{product.title}</span>
                                            <span className='text-gray-500'>{product.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <Outlet />
            </div>
        </div >
    );
};

export default Revenue;
