import React, { memo, useState } from "react";
import { productInfoTabs } from '../utils/contants'

const activedStyles = ''
const notActivedStyles = ''

const Productinfomation = () => {
    const [activedTab, setActivedTab] = useState(1)
    return (
        <div>
            <div className="flex items-center gap-1 relative bottom-[-1px]">
                {productInfoTabs.map(el => (
                    <span
                        className={`py-2 px-4 cursor-pointer ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-[#f1f1f1]'} `}
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full border p-4'>
                {productInfoTabs.some(el => el.id === activedTab) && productInfoTabs.find(el => el.id === activedTab)?.content}
            </div>
        </div>
    )
}

export default memo(Productinfomation)