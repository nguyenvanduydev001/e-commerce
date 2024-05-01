import React, { memo, Fragment, useState } from 'react'
import avatar from 'assets/avatarDefault.png'
import { memberSidebar } from 'utils/contants'
import { NavLink, Link } from 'react-router-dom'
import clsx from 'clsx'
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const activedStyle = 'px-4 py-2 flex items-center gap-2 text-[#ee3131] font-bold'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-sky-500 hover:text-gray-100'

const MemberSidebar = () => {
    const [actived, setActived] = useState([])
    const { current } = useSelector(state => state.user)
    const handleShowTabs = (tabID) => {
        if (actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev, tabID])
    }
    return (
        <div className='py-4 bg-white h-full w-[250px] flex-none'>
            <div className='w-full flex flex-col items-center p-4 justify-center'>
                <img src={current?.avatar || avatar} alt="avatar" className='w-16 h-16 object-contain' />
                <small>{`${current?.lastname} ${current?.firstname}`}</small>
            </div>
            <div>
                {memberSidebar.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'SINGLE' && <NavLink
                            to={el.path}
                            className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                        >
                            <span>{el.icon}</span>
                            <span>{el.text}</span>
                        </NavLink>}
                        {el.type === 'PARENT' && <div onClick={() => handleShowTabs(+el.id)} className=' flex flex-col text-gray-700'>
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                                {actived.some(id => id === el.id) ? <AiOutlineCaretRight /> : <AiOutlineCaretDown />}
                            </div>
                            {actived.some(id => +id === +el.id) && <div className='flex flex-col'>
                                {el.submenu.map(item => (
                                    <NavLink
                                        key={el.text}
                                        to={item.path}
                                        onClick={e => e.stopPropagation()}
                                        className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle, 'pl-10')}
                                    >
                                        {item.text}
                                    </NavLink>
                                ))}
                            </div>}
                        </div>}
                    </Fragment>
                ))}
                <NavLink to={'/'} className={clsx(notActivedStyle)}>Go home</NavLink>
            </div>
        </div>
    )
}

export default memo(MemberSidebar)