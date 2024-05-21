import React, { useCallback, useEffect, useState } from 'react'
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from 'apis/user'
import { roles, blockStatus } from 'utils/contants'
import { InputField, Pagination, InputFrom, Select, Button } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import ReactLoading from "react-loading";

const ManageUser = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
        phone: '',
        isBlocked: ''
    })
    const [loading, setLoading] = useState(true); // Initial loading state
    const [users, setUsers] = useState(null)
    const [queries, setQueries] = useState({
        q: ""
    })
    const [update, setUpdate] = useState(false)
    const [editElm, setEditElm] = useState(null)
    const [params] = useSearchParams()
    const fetchUsers = async (params) => {
        const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT })
        if (response.success) setUsers(response)
    }
    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])
    const queriesDebounce = useDebounce(queries.q, 800)

    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if (queriesDebounce) queries.q = queriesDebounce
        fetchUsers(queries)
    }, [queriesDebounce, params])
    useEffect(() => {
        // Show the loading spinner for 3 seconds when the component mounts
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);
    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editElm._id)
        if (response.success) {
            setEditElm(null)
            render()
            toast.success(response.mes)
        } else toast.error(response.mes)
    }
    const handleDeleteUser = (uid) => {
        Swal.fire({
            title: 'Are you sure...',
            text: 'Are you ready remove this user?',
            showCancelButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid)
                if (response.success) {
                    render()
                    toast.success(response.mes)
                } else toast.error(response.mes)
            }
        })

    }
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        };
        return new Date(dateString).toLocaleString('vi-VN', options);
    }


    return (
        <div className={clsx('w-full bg-white h-full', editElm && 'pl-20')}>
            {loading && (
                <div className='fixed inset-0 flex items-center justify-center  z-50'>
                    <ReactLoading
                        type="spinningBubbles"
                        color="#ee3131"
                        height={100}
                        width={50}
                    />
                </div>
            )}
            <div className='w-full px-4'>
                <div className='flex justify-end py-4'>
                    <InputField
                        nameKey={'q'}
                        value={queries.q}
                        setValue={setQueries}
                        style={'w500'}
                        placeholder='Search name or mail user...'
                        isHideLabel
                    />
                </div>
                <form className={editElm ? 'w-1160' : ''} onSubmit={handleSubmit(handleUpdate)}>
                    {editElm && <Button type='submit'>Update</Button>}
                    <table className='table-auto mb-6 text-left w-full rounded shadow-md'>
                        <thead className='font-bold bg-main text-[13px] text-white rounded- shadow-md'>
                            <tr>
                                <th className='px-4 py-2 uppercase'>Id</th>
                                <th className='px-4 py-2 uppercase'>Email address</th>
                                <th className='px-4 py-2 uppercase'>Firstname</th>
                                <th className='px-4 py-2 uppercase'>Lastname</th>
                                <th className='px-4 py-2 uppercase'>Role</th>
                                <th className='px-4 py-2 uppercase'>Phone</th>
                                <th className='px-4 py-2 uppercase'>Status</th>
                                <th className='px-4 py-2 uppercase'>Created At</th>
                                <th className='px-4 py-2 uppercase'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users?.map((el, idx) => (
                                <tr key={el._id} className='border-b'>
                                    <td className='py-2 px-4'>{idx + 1}</td>
                                    <td className='py-2 px-4 '>
                                        {editElm?._id === el._id
                                            ? <InputFrom
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.email}
                                                id={'email'}
                                                validate={{
                                                    required: 'Require fill.',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                }}
                                            />
                                            : <span>{el.email}</span>}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <InputFrom
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.firstname}
                                                id={'firstname'}
                                                validate={{ required: 'Require fill.' }}
                                            />
                                            : <span>{el.firstname}</span>}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <InputFrom
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.email}
                                                id={'lastname'}
                                                validate={{ required: 'Require fill.' }}
                                            />
                                            : <span>{el.lastname}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <Select
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={+el.role}
                                                id={'role'}
                                                validate={{ required: 'Require fill.' }}
                                                options={roles}
                                            />
                                            : <span>{roles.find(role => +role.code === +el.role)?.value}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <InputFrom
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.mobile}
                                                id={'mobile'}
                                                validate={{
                                                    required: 'Require fill.',
                                                    pattern: {
                                                        value: /^[62|0]+\d{9}/gi,
                                                        message: "Invalid phone number"
                                                    }
                                                }}
                                            />
                                            : <span>{el.mobile}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <Select
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={el.isBlocked}
                                                id={'isBlocked'}
                                                validate={{ required: 'Require fill.' }}
                                                options={blockStatus}
                                            />
                                            : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>
                                        }
                                    </td>
                                    <td className='text-center py-2'>{formatDate(el.createdAt)}</td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id ? <span onClick={() => setEditElm(null)} className='px-2 text-orange-600 hover:underline cursor-pointer'>
                                            Back</span>
                                            : <span onClick={() => setEditElm(el)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Edit</span>}
                                        <span onClick={() => handleDeleteUser(el._id)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
                <div className='w-full flex justify-end'>
                    <Pagination
                        totalCount={users?.counts}
                    />
                </div>
                <div className=' h-[300px]'></div>
            </div>
        </div>
    )
}

export default ManageUser
