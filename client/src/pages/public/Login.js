import React, { useState, useCallback, useEffect } from 'react'
import { InputField, Button, Loading } from 'components'
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from 'apis/user'
import Swal from 'sweetalert2'
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import path from 'utils/path'
import { login } from 'store/user/userSlice'
import { showModal } from 'store/app/appSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from 'utils/helpers';
import logo from '../../assets/logo_truong.png'
import banner from '../../assets/background.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    })
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
    const [invalidFields, setInvalidFieds] = useState([])
    const [isRegister, setIsRegister] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [searchParams] = useSearchParams()
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        })
    }
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email })
        if (response.success) {
            toast.success(response.mes, { theme: 'colored' })
        } else toast.info(response.mes, { theme: 'colored' })

    }
    useEffect(() => {
        resetPayload()
    }, [isRegister])
    // SUBMIT
    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload

        const invalids = isRegister ? validate(payload, setInvalidFieds) : validate(data, setInvalidFieds)
        if (invalids === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
                const response = await apiRegister(payload)
                dispatch(showModal({ isShowModal: false, modalChildren: null }))
                if (response.success) {
                    setIsVerifiedEmail(true)
                } else Swal.fire('Oops!', response.mes, 'error')
            } else {
                const rs = await apiLogin(data)
                if (rs.success) {
                    dispatch(login({ isLoggedIn: true, token: rs.accessToken, userData: rs.userData }))
                    searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`)
                } else Swal.fire('Oops!', rs.mes, 'error')
            }
        }
    }, [payload, isRegister])

    const finalRegister = async () => {
        const response = await apiFinalRegister(token)
        if (response.success) {
            Swal.fire('Congratulation', response.mes, 'success').then(() => {
                setIsRegister(false)
                resetPayload()
            })
        } else Swal.fire('Oops!', response.mes, 'error')
        setIsVerifiedEmail(false)
        setToken('')
    }
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='w-screen h-screen relative'>
            {isVerifiedEmail && <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col justify-center items-center'>
                <div className='bg-white w-[500px] rounded-md p-8'>
                    <h4 className=''>We sent a code to your email. Please check your email and enter your code:</h4>
                    <input type="text"
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        className='p-2 border rounded-md outline-none'
                    />
                    <button
                        type='button'
                        className='px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4'
                        onClick={finalRegister}
                    >
                        Submit
                    </button>
                </div>
            </div>}
            {isForgotPassword && (
                <div className='fixed inset-0 bg-gray-50 flex items-center justify-center z-50'>
                    <div className='flex flex-col gap-4 w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
                        <label htmlFor="email" className='text-lg font-semibold text-gray-700'>Enter your email:</label>
                        <input
                            type="text"
                            id="email"
                            className='w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder-gray-500'
                            placeholder='Exp: email@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className='flex items-center justify-end w-full gap-4'>
                            <Button
                                handleOnClick={handleForgotPassword}
                                style='px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-semibold my-2'
                            >Submit</Button>
                            <Button
                                handleOnClick={() => setIsForgotPassword(false)}
                                style='px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700 text-semibold my-2'
                            >Back</Button>
                        </div>
                    </div>
                </div>
            )}


            <div className='' style={{ background: `url(${banner}) no-repeat`, backgroundSize: 'cover', objectFit: 'cover' }}>
                <div className=' flex justify-center items-center h-screen'>
                    <div className='p-8 bg-white shadow-xl border flex flex-col items-center ml-[1000px] rounded-md min-w-[500px]'>
                        <img className='py-3' src={logo} alt="logo" />
                        <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
                        {isRegister &&
                            <div className='flex items-center gap-2'>
                                <InputField
                                    value={payload.firstname}
                                    setValue={setPayload}
                                    nameKey='firstname'
                                    invalidFields={invalidFields}
                                    setInvalidFieds={setInvalidFieds}
                                />
                                <InputField
                                    value={payload.lastname}
                                    setValue={setPayload}
                                    nameKey='lastname'
                                    invalidFields={invalidFields}
                                    setInvalidFieds={setInvalidFieds}
                                />
                            </div>
                        }
                        <InputField
                            value={payload.email}
                            setValue={setPayload}
                            nameKey='email'
                            invalidFields={invalidFields}
                            setInvalidFieds={setInvalidFieds}

                        />
                        {isRegister && <InputField
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey='mobile'
                            invalidFields={invalidFields}
                            setInvalidFieds={setInvalidFieds}
                        />}
                        <div className="relative w-full flex">
                            <input
                                value={payload.password}
                                onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                                type={showPassword ? "text" : "password"}
                                className="px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none"
                                placeholder='Password'
                            />
                            <button
                                type="button"
                                className="absolute top-[28px] right-2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash className="w-5 h-5 text-gray-400" /> : <FaEye className="w-5 h-5 text-gray-400" />}
                            </button>
                        </div>

                        <Button
                            handleOnClick={handleSubmit}
                            fw
                        >
                            {isRegister ? 'Register' : 'Login'}
                        </Button>
                        <div className='flex items-center justify-between my-2 w-full text-sm'>
                            {!isRegister && <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 hover:underline cursor-pointer'>Forgot your account?</span>}
                            {!isRegister && <span
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={() => setIsRegister(true)}
                            >
                                Create account
                            </span>}
                            {isRegister && <span
                                className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                                onClick={() => setIsRegister(false)}
                            >
                                Go login
                            </span>}
                        </div>
                        <Link className='text-blue-500 text-sm hover:underline cursor-pointer w-full text-center' to={`/${path.HOME}`}>Go home?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login