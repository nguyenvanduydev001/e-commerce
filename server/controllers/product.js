const { query, response } = require('express')
const Product = require('../models/product')
const asyncHanler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHanler(async (req, res) => {
    const { title, price, description, brand, category, color } = req.body
    const thumb = req?.files?.thumb[0]?.path
    const images = req.files?.images?.map(el => el.path)
    if (!(title && price && description && brand && category && color)) throw new Error('Missing inputs')
    req.body.slug = slugify(title)
    if (thumb) req.body.thumb = thumb
    if (images) req.body.images = images
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        mes: newProduct ? 'Created' : 'Failed'
    })

})
const getProduct = asyncHanler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar'
        }
    })
    return res.status(200).json({
        success: product ? true : false,
        createProduct: product ? product : 'Cannot get product'
    })


})
// Filtering, sorting & pagination
const getProducts = asyncHanler(async (req, res) => {
    const queries = { ...req.query }
    const excludeFieds = ['limit', 'sort', 'page', 'fields']
    excludeFieds.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, macthedEl => `$${macthedEl}`)
    let formatedQueries = JSON.parse(queryString)
    let colorQueryObject = {}
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' }
    if (queries?.color) {
        delete formatedQueries.color
        const colorArr = queries.color?.split(',')
        const colorQuery = colorArr.map(el => ({ color: { $regex: el, $options: 'i' } }))
        colorQueryObject = { $or: colorQuery }
    }
    let queryObject = {}
    if (queries?.q) {
        delete formatedQueries.q
        queryObject = {
            $or: [
                { color: { $regex: queries.q, $options: 'i' } },
                { title: { $regex: queries.q, $options: 'i' } },
                { category: { $regex: queries.q, $options: 'i' } },
                { brand: { $regex: queries.q, $options: 'i' } },
                { description: { $regex: queries.q, $options: 'i' } },
            ]
        }
    }
    const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject }
    let queryCommand = Product.find(qr)

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
        const counts = await Product.countDocuments(qr);
        return res.status(200).json({
            success: response ? true : false,
            counts,
            products: response ? response : 'Cannot get products',
        });
    } catch (err) {
        throw new Error(err.message);
    }
});



const updateProduct = asyncHanler(async (req, res) => {
    const { pid } = req.params
    const files = req?.files
    if (files?.thumb) req.body.thumb = files?.thumb[0]?.path
    if (files?.images) req.body.images = files?.images?.map(el => el.path)
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updateProduct ? true : false,
        mes: updateProduct ? 'Updated' : 'Cannot update product'
    })
})
const deleteProduct = asyncHanler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        mes: deletedProduct ? 'Delete' : 'Cannot delete product'
    })
})
const ratings = asyncHanler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid, updateAt } = req.body
    if (!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    // console.log(alreadyRating);
    if (alreadyRating) {
        // update star & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updateAt": updateAt }
        }, { new: true })
    } else {
        // add start & comment
        await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id, updateAt } }
        }, { new: true })
    }

    // Sum ratings
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10

    await updatedProduct.save()

    return res.status(200).json({
        status: true,
        updatedProduct
    })
})
const uploadImagesProduct = asyncHanler(async (req, res) => {
    const { pid } = req.params
    if (!req.files) throw new Error('Missing inputs')
    const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(el => el.path) } } }, { new: true })
    return res.status(200).json({
        status: response ? true : false,
        updatedProduct: response ? response : 'Cannot upload images product'
    })
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct
}