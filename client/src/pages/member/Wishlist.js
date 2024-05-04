import { Button, Product } from "components";
import React from "react";
import { useSelector } from "react-redux";

const Wishlist = () => {
    const { current } = useSelector((s) => s.user)
    return (
        <div className='w-full relative px-4'>
            <header className='text-3xl font-semibold py-4 border-b border-[#ee3131]'>
                My Wishlist
            </header>
            <div className="p-4 w-full flex flex-wrap gap-4 ">
                {current?.wishlist?.map((el) => (
                    <div className="bg-white w-[340px] rounded-md drop-shadow py-3 pt-3" key={el._id}>
                        <Product pid={el._id} className='bg-white' productData={el} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist