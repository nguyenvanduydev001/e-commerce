const Product = require('../models/product')
const asyncHanler = require('express-async-handler')
const slugify = require('slugify')

const createProduct =  asyncHanler(async(req, res) => {
    if(Object.keys(req.body).length == 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Cannot create new product'
    })

})
const getProduct =  asyncHanler(async(req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        createProduct: product ? product : 'Cannot get product'
    })

})
// Filtering, sorting & pagination
const getProducts = asyncHanler(async (req, res) => {
    const queries = {...req.query}
    const excludeFieds = ['limit','sort','page', 'fields']
    excludeFieds.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)
    queryString  = queryString.replace(/\b(gte|gt|lt|lte)\b/g, macthedEl => `$${macthedEl}`)
    const formatedQueries = JSON.parse(queryString)

    // Filtering
    if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}
    let queryCommand = Product.find(formatedQueries)

    // Sorting

    //acb,efg => [abc,efg] => abc efg
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join('')
        queryCommand = queryCommand.sort(sortBy)
    }

    // Execute query
    // Số lượng sp thoả mãn điều kiện !== số lượng sp trả về 1 lần gọi API
    try {
        const response = await queryCommand.exec(); // Sử dụng async/await để gọi exec()
        const counts = await Product.countDocuments(formatedQueries); // Sử dụng async/await để đếm số lượng sản phẩm
        return res.status(200).json({
            success: response ? true : false,
            products: response ? response : 'Cannot get products',
            counts
        });
    } catch (err) {
        throw new Error(err.message);
    }
});

const updateProduct =  asyncHanler(async (req, res) => {
    const { pid } = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true})
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : 'Cannot update product'
    })
})
const deleteProduct =  asyncHanler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}