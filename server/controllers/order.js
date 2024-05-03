const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { products, total, address, status } = req.body
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] })
    }
    const data = { products, total, orderBy: _id }
    if (status) data.status = status
    const rs = await Order.create(data)
    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'Something went wrong',
    })
})
const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const { status } = req.body
    if (!status) throw new Error('Missing status')
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    return res.json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong'
    })
})
const getUserOrders = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    const { _id } = req.user
    const excludeFieds = ['limit', 'sort', 'page', 'fields']
    excludeFieds.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, macthedEl => `$${macthedEl}`)
    let formatedQueries = JSON.parse(queryString)
    // let colorQueryObject = {}
    // if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    // if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' }
    // if (queries?.color) {
    //     delete formatedQueries.color
    //     const colorArr = queries.color?.split(',')
    //     const colorQuery = colorArr.map(el => ({ color: { $regex: el, $options: 'i' } }))
    //     colorQueryObject = { $or: colorQuery }
    // }
    // let queryObject = {}
    // if (queries?.q) {
    //     delete formatedQueries.q
    //     queryObject = {
    //         $or: [
    //             { color: { $regex: queries.q, $options: 'i' } },
    //             { title: { $regex: queries.q, $options: 'i' } },
    //             { category: { $regex: queries.q, $options: 'i' } },
    //             { brand: { $regex: queries.q, $options: 'i' } },
    //             { description: { $regex: queries.q, $options: 'i' } },
    //         ]
    //     }
    // }
    const qr = { ...formatedQueries, orderBy: _id }
    let queryCommand = Order.find(qr)

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    try {
        const response = await queryCommand.exec();
        const counts = await Order.countDocuments(qr);
        return res.status(200).json({
            success: response ? true : false,
            counts,
            orders: response ? response : 'Cannot get products',
        });
    } catch (err) {
        throw new Error(err.message);
    }
})
const getOrders = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    const excludeFieds = ['limit', 'sort', 'page', 'fields']
    excludeFieds.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, macthedEl => `$${macthedEl}`)
    let formatedQueries = JSON.parse(queryString)
    // let colorQueryObject = {}
    // if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    // if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' }
    // if (queries?.color) {
    //     delete formatedQueries.color
    //     const colorArr = queries.color?.split(',')
    //     const colorQuery = colorArr.map(el => ({ color: { $regex: el, $options: 'i' } }))
    //     colorQueryObject = { $or: colorQuery }
    // }
    // let queryObject = {}
    // if (queries?.q) {
    //     delete formatedQueries.q
    //     queryObject = {
    //         $or: [
    //             { color: { $regex: queries.q, $options: 'i' } },
    //             { title: { $regex: queries.q, $options: 'i' } },
    //             { category: { $regex: queries.q, $options: 'i' } },
    //             { brand: { $regex: queries.q, $options: 'i' } },
    //             { description: { $regex: queries.q, $options: 'i' } },
    //         ]
    //     }
    // }
    const qr = { ...formatedQueries }
    let queryCommand = Order.find(qr)

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    try {
        const response = await queryCommand.exec();
        const counts = await Order.countDocuments(qr);
        return res.status(200).json({
            success: response ? true : false,
            counts,
            orders: response ? response : 'Cannot get products',
        });
    } catch (err) {
        throw new Error(err.message);
    }
})
module.exports = {
    createOrder,
    updateStatus,
    getUserOrders,
    getOrders
}