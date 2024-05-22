import React, { useCallback, useEffect, useState } from 'react';
import { CustomizeVarriants, InputFrom, Pagination } from 'components';
import { useForm } from 'react-hook-form';
import { apiGetProducts, apiDeleteProduct } from 'apis/product';
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import UpdateProduct from './UpdateProduct';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiCustomize, BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ReactLoading from "react-loading";



const ManageProducts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const { register, formState: { errors }, watch } = useForm();
    const [products, setProducts] = useState(null);
    const [counts, setCounts] = useState(0);
    const [editProduct, setEditProduct] = useState(null);
    const [update, setUpdate] = useState(false);
    const [customizeVarriant, setCustomizeVarriant] = useState(null);
    const [loading, setLoading] = useState(true); // Initial loading state

    const render = useCallback(() => {
        setUpdate(!update);
    }, [update]);

    const fetchProducts = async (params) => {
        const response = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT });
        if (response.success) {
            setCounts(response.counts);
            setProducts(response.products);
        }
    };

    const queryDecounce = useDebounce(watch('q'), 800);
    useEffect(() => {
        if (queryDecounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ q: queryDecounce }).toString()
            });
        } else {
            navigate({
                pathname: location.pathname,
            });
        }
    }, [queryDecounce]);

    useEffect(() => {
        const searchParams = Object.fromEntries([...params]);
        fetchProducts(searchParams);
    }, [params, update]);

    useEffect(() => {
        // Show the loading spinner for 3 seconds when the component mounts
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

    const handleDeleteProduct = (pid) => {
        Swal.fire({
            title: 'Are you sure',
            text: 'Are you sure remove this product',
            icon: 'warning',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.success) alert(response.mes);
                else alert(response.mes);
                render();
            }
        });
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        };
        return new Date(dateString).toLocaleString('vi-VN', options);
    }

    return (
        <div className='w-full flex h-full flex-col gap-4 relative bg-white px-4'>
            {loading && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <ReactLoading
                        type="spinningBubbles"
                        color="#ee3131"
                        height={100}
                        width={50}
                    />
                </div>
            )}
            {editProduct && <div className='absolute inset-0 min-h-screen z-50 bg-white'>
                <UpdateProduct
                    editProduct={editProduct}
                    render={render}
                    setEditProduct={setEditProduct}
                />
            </div>}
            {customizeVarriant && <div className='absolute  inset-0 min-h-screen z-50 bg-white'>
                <CustomizeVarriants
                    customizeVarriant={customizeVarriant}
                    render={render}
                    setCustomizeVarriant={setCustomizeVarriant}
                />
            </div>}
            <div className='flex w-full justify-end items-center px-4 pt-4 pb-4'>
                <form className='w-[45%]'>
                    <InputFrom
                        id='q'
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder='Search products by title, description,...'
                    />
                </form>
            </div>
            <table className='table-auto border shadow-md'>
                <thead>
                    <tr className='border bg-main text-white shadow-md'>
                        <th className='text-center py-2'>Order</th>
                        <th className='text-center py-2'>Thumb</th>
                        <th className='text-center py-2'>Title</th>
                        <th className='text-center py-2'>Brand</th>
                        <th className='text-center py-2'>Category</th>
                        <th className='text-center py-2'>Price</th>
                        <th className='text-center py-2'>Quantity</th>
                        <th className='text-center py-2'>Sold</th>
                        <th className='text-center py-2'>Color</th>
                        <th className='text-center py-2'>Ratings</th>
                        <th className='text-center py-2'>Varriants</th>
                        <th className='text-center py-2'>UpdateAt</th>
                        <th className='text-center py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((el, idx) => (
                        <tr className='border-b border-gray-300' key={el._id}>
                            <td className='text-center py-2'>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + idx + 1}</td>
                            <td className='text-center py-2'>
                                <img src={el.thumb} alt="thumb" className='w-12 h-12 object-cover' />
                            </td>
                            <td className='text-center py-2'>{el.title}</td>
                            <td className='text-center py-2'>{el.brand}</td>
                            <td className='text-center py-2'>{el.category}</td>
                            <td className='text-center py-2'>{el.price}</td>
                            <td className='text-center py-2'>{el.quantity}</td>
                            <td className='text-center py-2'>{el.sold}</td>
                            <td className='text-center py-2'>{el.color}</td>
                            <td className='text-center py-2'>{el.totalRatings}</td>
                            <td className='text-center py-2'>{el?.varriants?.length || 0}</td>
                            <td className='text-center py-2'>{formatDate(el.createdAt)}</td>
                            <td className='text-center py-2 flex mt-3'>
                                <span onClick={() => setEditProduct(el)} className='text-blue-500 hover:text-orange-500 hover:underline 
                                cursor-pointer px-1'><BiEdit size={20} /></span>
                                <span onClick={() => handleDeleteProduct(el._id)} className='text-blue-500 hover:text-orange-500 hover:underline 
                                cursor-pointer px-1'><RiDeleteBin6Line size={20} /></span>
                                <span onClick={() => setCustomizeVarriant(el)} className='text-blue-500 hover:text-orange-500 hover:underline 
                                cursor-pointer px-1'><BiCustomize size={20} /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full mt-[27px] flex justify-end '>
                <Pagination totalCount={counts} />
            </div>

        </div>
    );
};

export default ManageProducts;
