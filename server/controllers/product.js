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
const getProducts =  asyncHanler(async(req, res) => {
    const products = await Product.find()
    return res.status(200).json({
        success: products ? true : false,
        productDatas: products ? products : 'Cannot get products'
    })

})
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