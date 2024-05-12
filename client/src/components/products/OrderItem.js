import SelectQuantity from "components/common/SelectQuantity";
import React, { useEffect, useState } from "react";
import { formatMoney } from "utils/helpers";
import { updateCart } from "store/user/userSlice";
import withBaseComponent from "hocs/withBaseComponent";
const OrderItem = ({ dispatch, color, dfQuantity = 1, price, title, thumbnail, pid }) => {
    const [quantity, setQuantity] = useState(() => dfQuantity)
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
    }
    const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }
    useEffect(() => {
        dispatch(updateCart({ pid, quantity, color }))
    }, [quantity])
    // Set quantity
    return (
        <div className="w-main mx-auto border-b font-bold py-3 grid grid-cols-10">
            <span className="col-span-6 w-full text-center">
                <div className='flex gap-2 px-4 py-3'>
                    <img src={thumbnail} alt="thumb" className='w-40 h-40 object-cover' />
                    <div className='flex flex-col items-start gap-1 mt-[50px] ml-5'>
                        <span className='font-main font-normal hover:text-main'>{title}</span>
                        <span className='text-[10px] font-normal'>{color}</span>
                    </div>
                </div>
            </span>
            <span className="col-span-1 w-full text-center">
                <div className="flex items-center h-full ml-[14px]">
                    <SelectQuantity
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                        handleChangeQuantity={handleChangeQuantity}
                    />
                </div>
            </span>
            <span className="col-span-3 w-full h-full font-semibold flex items-center justify-center text-center">
                <span className='text-lg semibold '>{formatMoney(price * quantity) + ' VND'}</span>
            </span>
        </div>
    )
}

export default withBaseComponent(OrderItem)