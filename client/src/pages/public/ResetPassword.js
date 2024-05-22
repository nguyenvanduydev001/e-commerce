import React, { useState } from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import { toast } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { token } = useParams()

    const handleResetPassword = async () => {
        const response = await apiResetPassword({ password, token })
        if (response.success) {
            toast.success(response.mes, { theme: 'colored' })
        } else {
            toast.info(response.mes, { theme: 'colored' })
        }
    }

    return (
        <div className='fixed inset-0 bg-gray-50 flex items-center justify-center z-50'>
            <div className='flex flex-col gap-4 w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
                <label htmlFor="password" className='text-lg font-semibold text-gray-700'>Enter your new password:</label>
                <div className='relative w-full'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className='w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder-gray-500'
                        placeholder='Type here'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div
                        className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                    </div>
                </div>
                <div className='flex items-center justify-end w-full gap-4'>
                    <Button
                        handleOnClick={handleResetPassword}
                        style='px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-semibold my-2'
                    >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
