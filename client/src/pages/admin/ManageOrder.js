import { apiGetOrders } from "apis";
import { CustomSelect, InputFrom, Pagination } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { statusOrders } from "utils/contants";
import ReactLoading from "react-loading";

const ManageOrder = ({ navigate, location }) => {
    const [loading, setLoading] = useState(true); // Initial loading state
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

    useEffect(() => {
        // Show the loading spinner for 3 seconds when the component mounts
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

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

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        };
        return new Date(dateString).toLocaleString('vi-VN', options);
    }


    return (
        <div className="w-full relative px-4 p-6 bg-white h-full">
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
                            <th className='text-center py-2'>Quantity</th>
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
                                <td className='text-center py-2'>
                                    {el.products?.reduce((total, item) => total + item.quantity, 0)}
                                </td>
                                <td className='text-center py-2'>{convertUSDToVND(el.total).toLocaleString('vi-VN')} VND</td>
                                <td className='text-center py-2'>{el.status}</td>
                                <td className='text-center py-2'>
                                    {formatDate(el.createdAt)}
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
