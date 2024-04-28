import React, { Fragment, memo, useEffect, useState } from 'react'
import logo from 'assets/logo.png'
import icons from 'utils/icons'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'store/user/userSlice'

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
const Header = () => {
    const { current } = useSelector(state => state.user)
    const [isShowOption, setIsShowOption] = useState(false)
    const dispatch = useDispatch()
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
                {current && <Fragment>
                    <div className='cursor-pointer flex items-center justify-center gap-2 px-6 border-r'>
                        <BsHandbagFill color='red' />
                        <span>0 items(s)</span>
                    </div>
                    <div
                        className='flex cursor-pointer items-center justify-center px-6 gap-2 relative'
                        onClick={() => setIsShowOption(prev => !prev)}
                        id='profile'
                    >
                        <FaUserCircle color='red' />
                        <span>Profile</span>
                        {isShowOption && <div onClick={e => e.stopPropagation()} className='absolute flex flex-col top-full left-[16px] bg-gray-100 border min-w-[150px] py-2'>
                            <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.MEMBER}/${path.PERSONAL}`}>
                                Personal
                            </Link>
                            {+current.role === 1945 && <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.ADMIN}/${path.DASHBOARD}`}>
                                Admin workspace
                            </Link>}
                            <span onClick={() => dispatch(logout())} className='p-2 w-full hover:bg-sky-100'>Logout</span>
                        </div>}
                    </div>
                </Fragment>}
            </div>
        </div>

    )
}

export default memo(Header)