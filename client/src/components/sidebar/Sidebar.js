import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { createSlug } from 'utils/helpers';
import { useSelector } from 'react-redux';
import { SlScreenSmartphone, SlScreenTablet, SlPrinter, SlEarphones } from "react-icons/sl";
import { IoIosLaptop } from "react-icons/io";
import { CiSpeaker, CiCamera } from "react-icons/ci";
import { PiTelevisionLight } from "react-icons/pi";
import { FaShoppingBag } from 'react-icons/fa';
const Sidebar = () => {
    const { categories } = useSelector(state => state.app);

    // Hàm để lấy biểu tượng dựa trên loại sản phẩm
    const getIconByCategory = (cate) => {
        switch (cate) {
            case 'Smartphone':
                return <SlScreenSmartphone size={23} className='mr-[5px]' />;
            case 'Tablet':
                return <SlScreenTablet size={23} className='mr-[5px]' />;
            case 'Laptop':
                return <IoIosLaptop size={23} className='mr-[5px]' />;
            case 'Speaker':
                return <CiSpeaker size={23} className='mr-[5px]' />;
            case 'Camera':
                return <CiCamera size={23} className='mr-[5px]' />;
            case 'Accessories':
                return <SlEarphones size={23} className='mr-[5px]' />;
            case 'Television':
                return <PiTelevisionLight size={23} className='mr-[5px]' />;
            case 'Printer':
                return <SlPrinter size={23} className='mr-[5px]' />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col border'>
            {categories?.map(el => (
                <NavLink
                    key={createSlug(el.title)}
                    to={createSlug(el.title)}
                    className={({ isActive }) => isActive
                        ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                        : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'}
                >
                    <div className='flex items-center'>
                        {getIconByCategory(el.title)} {el.title}
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default memo(Sidebar);
