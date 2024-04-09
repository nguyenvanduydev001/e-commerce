import React, { memo } from 'react'
import icons from '../utils/icons'

const { AiOutlineDown } = icons

const SearchItem = ({ name, activeClick, changeActiveFitler }) => {
    return (
        <div
            className='p-3 text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-between items-center'
            onClick={() => changeActiveFitler(name)}
        >
            <span className='capitalize'>{name}</span>
            <AiOutlineDown />
            {activeClick === name && <div className='absolute top-full left-0 w-fit p-4 bg-red-500'>
                content
            </div>}
        </div>
    )
}

export default memo(SearchItem)