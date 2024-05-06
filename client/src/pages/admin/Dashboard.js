import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUsers, FaBoxOpen } from 'react-icons/fa'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-red-500 to-orange-200">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full xl:w-1/3 xl:p-6">
                        <div className="bg-blue-500 shadow-md rounded-lg p-6">
                            <h2 className="text-white flex items-center text-2xl font-bold mb-2">
                                Sales Overview <FaShoppingCart className='ml-[8px]' />
                            </h2>
                            <p className="text-white text-lg">Total Sales: $12,567.89</p>
                            <p className="text-white text-lg">Today's Sales: $856.45</p>
                            <p className="text-white text-lg">Avg. Order Value: $125.67</p>
                            <Link to="/member/buy-history" className="block mt-4 bg-white text-blue-500 py-2 px-4 rounded-lg">View Sales</Link>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/3 xl:p-6">
                        <div className="bg-green-500 shadow-md rounded-lg p-6">
                            <h2 className="text-white flex items-center text-2xl font-bold mb-2">
                                Customer Overview <FaUsers className='ml-[8px]' />
                            </h2>
                            <p className="text-white text-lg">Total Customers: 5,678</p>
                            <p className="text-white text-lg">New Customers Today: 45</p>
                            <p className="text-white text-lg">Customer Retention Rate: 75%</p>
                            <Link to="/admin/manage-user" className="block mt-4 bg-white text-green-500 py-2 px-4 rounded-lg">View Customers</Link>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/3 xl:p-6">
                        <div className="bg-yellow-500 shadow-md rounded-lg p-6">
                            <h2 className="text-white flex items-center text-2xl font-bold mb-2">
                                Product Overview <FaBoxOpen className='ml-[8px]' />
                            </h2>
                            <p className="text-white text-lg">Total Products: 67</p>
                            <p className="text-white text-lg">Best Selling Product: "Tablet"</p>
                            <p className="text-white text-lg">Out of Stock Products: 25</p>
                            <Link to="/admin/manage-products" className="block mt-4 bg-white text-yellow-500 py-2 px-4 rounded-lg">View Products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard