import React, { Fragment, memo, useEffect, useState } from 'react'
import logo from 'assets/logo.png'
import icons from 'utils/icons'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'store/user/userSlice'
import withBaseComponent from 'hocs/withBaseComponent'
import { showCart } from 'store/app/appSlice'
import { IoLogOut } from "react-icons/io5";
import { FaUser, FaUserCog } from 'react-icons/fa'

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
const Header = ({ dispatch }) => {
    const { current } = useSelector(state => state.user)
    const [isShowOption, setIsShowOption] = useState(false)
    useEffect(() => {
        const handleClickoutOptions = (e) => {
            const profile = document.getElementById('profile')
            if (!profile?.contains(e.target)) setIsShowOption(false)
        }

        document.addEventListener('click', handleClickoutOptions)

        return () => {
            document.removeEventListener('click', handleClickoutOptions)
        }
    }, [])
    return (
        <div className=' w-main flex justify-between h-[110px] py-[35px]'>
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className='w-[234px] object-contain' />
            </Link>
            <div className='flex text-[13px]'>
                <div className='flex flex-col items-center px-6 border-r'>
                    <span className='flex gap-4 items-center'>
                        <RiPhoneFill color='red' />
                        <span className='font-semibold'>(+1800) 000 8808</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col items-center px-6 border-r'>
                    <span className='flex gap-4 items-center'>
                        <MdEmail color='red' />
                        <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {current && (
                    <Fragment>
                        <div onClick={() => dispatch(showCart())} className='cursor-pointer flex items-center justify-center gap-2 px-6 border-r'>
                            <BsHandbagFill color='red' />
                            <span>{`${current?.cart?.filter(el => el.product !== null).length || 0} items(s)`}</span>
                        </div>
                        <div
                            className='flex cursor-pointer items-center justify-center px-6 gap-2 relative'
                            onClick={() => setIsShowOption(prev => !prev)}
                            id='profile'
                        >
                            <FaUserCircle color='red' />
                            <span>Profile</span>
                            {isShowOption && (
                                <div onClick={e => e.stopPropagation()} className='absolute  flex flex-col top-[51px] z-10 left-[-16px] bg-white border rounded-lg shadow-xl min-w-[150px] py-2'>
                                    <Link className='p-2 w-full flex hover:bg-white hover:text-main hover:font-semibold' to={`/${path.MEMBER}/${path.PERSONAL}`}>
                                        <FaUser className='mr-[6px]' size={18} /> Personal
                                    </Link>
                                    {+current.role === 1945 && (
                                        <Link className='p-2 w-full flex hover:bg-white hover:text-main hover:font-semibold' to={`/${path.ADMIN}/${path.DASHBOARD}`}>
                                            <FaUserCog className='mr-[6px]' size={18} /> Admin
                                        </Link>
                                    )}
                                    <span onClick={() => dispatch(logout())} className='flex p-2 w-full hover:bg-white hover:text-main hover:font-semibold'><IoLogOut className='mr-[6px]' size={18} /> Logout</span>
                                </div>
                            )}
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default withBaseComponent(memo(Header))
