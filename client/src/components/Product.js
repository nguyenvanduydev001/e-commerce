import React from "react";
import { formatMoney } from '../utils/helpers'
import label from '../assets/label-2.png'
import lalbelBule from '../assets/label-blue.png'

const Product = ({ productData, isNew }) => {
    return (
        <div className="w-full text-base px-[10px]">
            <div className="w-full border p-[15px] flex flex-col items-center">
                <div className="w-full relative">

                    <img
                        src={productData?.thumb || 'https://3qleather.com/wp-content/themes/olympusinn/assets/images/default-placeholder.png'}
                        alt=""
                        className="w-[243px] h-[243px] object-cover"
                    />
                    <img src={isNew ? label : lalbelBule} alt="" className="absolute top-[-15px] left-[-27px] w-[100px] h-[35px] object-cover" />
                    <span className={`font-bold top-[-9px] left-[-10px] text-white absolute ${isNew ? '' : 'text-sm'}`}>{isNew ? 'New' : 'Trending'}</span>
                </div>
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
                    <span >{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default Product