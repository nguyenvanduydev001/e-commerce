import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "components";

const Wishlist = () => {
    const { current } = useSelector((s) => s.user);
    const [wishlist, setWishlist] = useState(current?.wishlist || []);

    const handleRemoveFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter((item) => item._id !== productId);
        setWishlist(updatedWishlist);
    };

    return (
        <div className="w-full relative px-4">
            <div className="p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.length > 0 ? (
                    wishlist.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-md shadow-md overflow-hidden"
                        >
                            <Product pid={product._id} productData={product} />
                            <div className="p-4">
                                <button
                                    onClick={() => handleRemoveFromWishlist(product._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 mt-2 px-4 rounded-md w-full"
                                >
                                    Remove Wishlist
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Không có sản phẩm trong Wishlist</p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
