
// const ManageOrder = () => {
//     const [orders, setOrders] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             const response = await apiGetOrders();
//             if (response.success) {
//                 setOrders(response.orders);
//             }
//             setIsLoading(false);
//         };
//         fetchOrders();
//     }, []);

//     return (
//         <div className="p-6 bg-white rounded shadow-md">
//             <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
//             {isLoading ? (
//                 <div className="text-center text-blue-500">Loading...</div>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border">
//                         <thead>
//                             <tr className="w-full bg-gray-100 text-gray-600 text-left text-sm uppercase font-semibold">
//                                 <th className="py-2 px-4 border-b">Order ID</th>
//                                 <th className="py-2 px-4 border-b">Customer</th>
//                                 <th className="py-2 px-4 border-b">Product</th>
//                                 <th className="py-2 px-4 border-b">Quantity</th>
//                                 <th className="py-2 px-4 border-b">Status</th>
//                                 <th className="py-2 px-4 border-b">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map(order => (
//                                 <tr key={order.id} className="hover:bg-gray-50">
//                                     <td className="py-2 px-4 border-b">{order.id}</td>
//                                     <td className="py-2 px-4 border-b">{order.customer}</td>
//                                     <td className="py-2 px-4 border-b">{order.product}</td>
//                                     <td className="py-2 px-4 border-b">{order.quantity}</td>
//                                     <td className="py-2 px-4 border-b">{order.status}</td>
//                                     <td className="py-2 px-4 border-b">
//                                         <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
//                                         <button className="text-red-500 hover:text-red-700">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };
import { apiGetOrders } from "apis";
import { CustomSelect, InputFrom, Pagination } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";

import { statusOrders } from "utils/contants";

const ManageOrder = ({ navigate, location }) => {
    const [orders, setOrders] = useState(null)
    const [counts, setCounts] = useState(0);
    const [params] = useSearchParams();
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useForm()
    const a = watch('a')
    const status = watch('status')
    const fetchOrders = async (params) => {
        const response = await apiGetOrders({
            ...params,
            limit: process.env.REACT_APP_LIMIT,
        });
        if (response.success) {
            setOrders(response.orders)
            setCounts(response.counts);
        }
    };
    useEffect(() => {
        const pr = Object.fromEntries([...params])
        fetchOrders(pr)
    }, [params])

    const handleSearchStatus = ({ value }) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ status: value }).toString()
        })
    }

    // Hàm chuyển đổi tiền tệ từ USD sang VND
    const convertUSDToVND = (amountInUSD) => {
        const exchangeRate = 23500; // Giả sử 1 USD = 20,000 VND
        return amountInUSD * exchangeRate;
    };

    return (
        <div className="w-full relative px-4 p-6 bg-white h-full">
            <div className='flex justify-end items-center px-4 '>
                <form className='w-[45%] grid grid-cols-2 gap-4'>
                    <div className='flex w-full justify-end items-center px-4 pt-4 pb-4'>
                        <form>
                            <InputFrom
                                id='a'
                                register={register}
                                errors={errors}
                                fullWidth
                                placeholder='Search title or product,...'
                            />
                        </form>
                    </div>
                    <div className='col-span-1 flex items-center'>
                        <CustomSelect
                            options={statusOrders}
                            value={status}
                            onChange={(val) => handleSearchStatus(val)}
                            wrapClassname='w-full'
                        />
                    </div>
                </form>
            </div>
            <div className="overflow-x-auto rounded shadow-md">
                <table className='table-auto min-w-full bg-white border'>
                    <thead>
                        <tr className="w-full bg-main text-white text-left text-sm uppercase font-semibold">
                            <th className='text-center py-2'>Order ID</th>
                            <th className='text-center py-2'>Products</th>
                            <th className='text-center py-2'>Total</th>
                            <th className='text-center py-2'>Status</th>
                            <th className='text-center py-2'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((el, idx) => (
                            <tr className='border-b border-gray-300 hover:' key={el._id}>
                                <td className='text-center py-2'>
                                    {(+params.get('page') > 1 ? +params.get('page') - 1 : 0) *
                                        process.env.REACT_APP_LIMIT +
                                        idx + 1
                                    }
                                </td>
                                <td className='text-center max-w-[500px] py-2'>
                                    <span className="grid grid-cols-4 gap-4">
                                        {el.products?.map((item) => (
                                            <span className="flex col-span-1 items-center gap-2" key={item._id}>
                                                <img
                                                    src={item.thumbnail}
                                                    alt="thumb"
                                                    className="w-8 h-8 rounded-none object-cover"
                                                />
                                                <span className="flex flex-col">
                                                    <span className="text-sm">
                                                        {item.title}
                                                    </span>
                                                </span>
                                            </span>
                                        ))}
                                    </span>
                                </td>
                                <td className='text-center py-2'>{convertUSDToVND(el.total).toLocaleString('vi-VN')} VND</td>
                                <td className='text-center py-2'>{el.status}</td>
                                <td className='text-center py-2'>
                                    {moment(el.createdAt).format('DD/MM/YYYY')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-full flex mt-1 justify-end '>
                <Pagination totalCount={counts} />
            </div>
        </div>
    )
}

export default withBaseComponent(ManageOrder)

// export default ManageOrder;
