import React, { useEffect, useState, useCallback } from 'react'
import { apiGetUsers } from 'apis/user'
import { roles } from 'utils/contants'
import moment from 'moment'
import { InputField, Pagination } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'

const ManageUser = () => {
    const [users, setUsers] = useState(null)
    const [queries, setQueries] = useState({
        q: ""
    })
    const [params] = useSearchParams()
    const fetchUsers = async (params) => {
        const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT })
        if (response.success) setUsers(response)
    }

    const queriesDebounce = useDebounce(queries.q, 800)

    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if (queriesDebounce) queries.q = queriesDebounce
        fetchUsers(queries)
    }, [queriesDebounce, params])

    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-gray-300'>
                <span>Manage users</span>
            </h1>
            <div className='w-full p-4'>
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
                <table className='table-auto mb-6 text-left w-full'>
                    <thead className='font-bold bg-gray-700 text-[13px] text-white'>
                        <tr className='border border-gray-500'>
                            <th className='px-4 py-2'>#</th>
                            <th className='px-4 py-2'>Email address</th>
                            <th className='px-4 py-2'>Fullname</th>
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
                                <td className='py-2 px-4'>{el.email}</td>
                                <td className='py-2 px-4'>{`${el.lastname} ${el.firstname}`}</td>
                                <td className='py-2 px-4'>{roles.find(role => +role.code === +el.role)?.value}</td>
                                <td className='py-2 px-4'>{el.mobile}</td>
                                <td className='py-2 px-4'>{el.isBlocked ? 'Blocked' : 'Active'}</td>
                                <td className='py-2 px-4'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='py-2 px-4'>
                                    <span className='px-2 text-orange-600 hover:underline cursor-pointer'>Edit</span>
                                    <span className='px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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