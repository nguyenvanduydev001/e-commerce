import React from 'react';

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFieds }) => {

    return (
        <div className='w-full flex flex-col relative mb-2'>
            {value.trim() !== '' && <label className='text-[10px] animate-slide-top-sm absolute top-0 left-[12px] block bg-white px-1' htmlFor={nameKey}>{nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}</label>}
            <input
                type={type || 'text'}
                className='px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none'
                placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFieds([])}
            />
            {invalidFields?.some(el => el.name === nameKey) && <small className='text-main  italic'>{invalidFields.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    )
}

// [{namw: password, mes: Require}]
export default InputField