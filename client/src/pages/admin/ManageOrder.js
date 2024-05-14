import React, { useEffect, useState } from 'react';
import { apiGetOrders } from 'apis'; // Giả sử bạn có một hàm API để lấy danh sách đơn hàng

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await apiGetOrders();
            if (response.success) {
                setOrders(response.orders);
            }
            setIsLoading(false);
        };
        fetchOrders();
    }, []);

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
            {isLoading ? (
                <div className="text-center text-blue-500">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="w-full bg-gray-100 text-gray-600 text-left text-sm uppercase font-semibold">
                                <th className="py-2 px-4 border-b">Order ID</th>
                                <th className="py-2 px-4 border-b">Customer</th>
                                <th className="py-2 px-4 border-b">Product</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{order.id}</td>
                                    <td className="py-2 px-4 border-b">{order.customer}</td>
                                    <td className="py-2 px-4 border-b">{order.product}</td>
                                    <td className="py-2 px-4 border-b">{order.quantity}</td>
                                    <td className="py-2 px-4 border-b">{order.status}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                                        <button className="text-red-500 hover:text-red-700">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageOrder;
