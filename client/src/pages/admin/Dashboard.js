import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUsers, FaBoxOpen } from 'react-icons/fa';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Smartphone',
        evaluate: 590,
        stock: 800,
        price: 1400,
        sold: 490,
    },
    {
        name: 'Printer',
        evaluate: 868,
        stock: 967,
        price: 1506,
        sold: 590,
    },
    {
        name: 'Television',
        evaluate: 1397,
        stock: 1098,
        price: 989,
        sold: 350,
    },
    {
        name: 'Tablet',
        evaluate: 1480,
        stock: 1200,
        price: 1228,
        sold: 480,
    },
    {
        name: 'Laptop',
        evaluate: 1520,
        stock: 1108,
        price: 1100,
        sold: 460,
    },
    {
        name: 'Speaker',
        evaluate: 1400,
        stock: 680,
        price: 1700,
        sold: 380,
    },
    {
        name: 'Camera',
        evaluate: 1400,
        stock: 680,
        price: 1700,
        sold: 380,
    },
];


class Dashboard extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/simple-composed-chart-lyz572';

    render() {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full xl:w-1/3 xl:p-6">
                            <div className="bg-blue-500 shadow-md rounded-lg p-6">
                                <h2 className="text-white flex items-center text-2xl font-bold mb-2">
                                    Evaluate Overview <FaShoppingCart className='ml-[8px]' />
                                </h2>
                                <p className="text-white text-lg">Total evaluate: 20</p>
                                <p className="text-white text-lg">Today's evaluate: 1</p>
                                <p className="text-white text-lg">Avg. Order Value: 450,000 VND</p>
                                <Link to="#" className="block mt-4 bg-white text-blue-500 py-2 px-4 rounded-lg">View evaluate</Link>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/3 xl:p-6">
                            <div className="bg-green-500 shadow-md rounded-lg p-6">
                                <h2 className="text-white flex items-center text-2xl font-bold mb-2">
                                    Customer Overview <FaUsers className='ml-[8px]' />
                                </h2>
                                <p className="text-white text-lg">Total Customers: 4</p>
                                <p className="text-white text-lg">New Customers Today: 0</p>
                                <p className="text-white text-lg">Customer Retention Rate: 75%</p>
                                <Link to="/admin/manage-user" className="block mt-4 bg-white text-green-500 py-2 px-4 rounded-lg">View Customers</Link>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/3 xl:p-6">
                            <div className="bg-yellow-500 shadow-md rounded-lg p-6">
                                <h2 className="text-white flex items-center text-2xl font-bold mb-2">
                                    Product Overview <FaBoxOpen className='ml-[8px]' />
                                </h2>
                                <p className="text-white text-lg">Total Products: 68</p>
                                <p className="text-white text-lg">Best Selling Product: "Tablet"</p>
                                <p className="text-white text-lg">Out of Stock Products: 4</p>
                                <Link to="/admin/revenue" className="block mt-4 bg-white text-yellow-500 py-2 px-4 rounded-lg">View Products</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Evaluate Data</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <ComposedChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis className='ml-[12px]' dataKey="name" scale="band" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="price" fill="#8884d8" stroke="#8884d8" />
                                <Bar dataKey="stock" barSize={20} fill="#413ea0" />
                                <Line type="monotone" dataKey="evaluate" stroke="#ff7300" />
                                <Scatter dataKey="sold" fill="red" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
