import React, { useCallback, useEffect, useState } from 'react'
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from 'apis/user'
import { roles } from 'utils/contants'
import moment from 'moment'
import { InputField, Pagination, InputFrom, Select, Button } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
const ManageUser = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
        phone: '',
        status: ''
    })
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
    return (
        <div className={`w-full ${editElm ? 'pl-[77px]' : ''}`}>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-gray-300'>
                <span>Manage users</span>
            </h1>
            <div className='w-full px-4 '>
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
                    <table className='table-auto mb-6 text-left w-full'>
                        <thead className='font-bold bg-gray-700 text-[13px] text-white'>
                            <tr className='border border-gray-500'>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Email address</th>
                                <th className='px-4 py-2'>Firstname</th>
                                <th className='px-4 py-2'>Lastname</th>
                                <th className='px-4 py-2'>Role</th>
                                <th className='px-4 py-2'>Phone</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Created At</th>
                                <th className='px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users?.map((el, idx) => (
                                <tr key={el._id} className='border border-gray-500'>
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
                                            ? <Select />
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
                                            ? <Select />
                                            : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-4'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
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
            </div>
        </div>
    )
}

export default ManageUser