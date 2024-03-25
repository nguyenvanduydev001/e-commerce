const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const data = require('../../data/data2.json');
const slugify = require('slugify');
const categoryData = require('../../data/cate_brand')
const ProductCategory = require('../models/productCategory')

const fn = async (product) => {
    // Kiểm tra nếu giá không tồn tại hoặc không đúng định dạng
    if (!product?.price || isNaN(parseFloat(product?.price))) {
        console.error(`Invalid price for product: ${product?.name}`);
        return; // Bỏ qua sản phẩm không hợp lệ
    }

    const timestamp = Date.now(); // Lấy thời gian Unix hiện tại
    const slug = slugify(product?.name) + '-' + timestamp; // Tạo slug từ tên sản phẩm và thời gian Unix hiện tại

    await Product.create({
        title: product?.name,
        slug: slug,
        description: product?.description,
        brand: product?.brand,
        price: parseFloat(product?.price.replace(/[^\d.]/g, '')) / 100,
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: product?.variants?.find(el => el.label === 'Color')?.variants[0]
    });
};

const insertProduct = asyncHandler(async (req, res) => {
    const dataArray = data["[object Object]"]; // Truy cập vào mảng các sản phẩm

    const promises = [];
    for (let product of dataArray) promises.push(fn(product)); // Lặp qua từng sản phẩm
    await Promise.all(promises);
    return res.json('Done');
});
const fn2 = async (cate) => {
    await ProductCategory.create({
        title: cate?.cate,
        brand: cate?.brand
    })
}
const insertCategpry = asyncHandler(async (req, res) => {
    // const dataArray = data["[object Object]"]; // Truy cập vào mảng các sản phẩm
    console.log(categoryData)
    const promises = [];
    for (let cate of categoryData) promises.push(fn2(cate)); // Lặp qua từng sản phẩm
    await Promise.all(promises);
    return res.json('Done');
});

module.exports = {
    insertProduct,
    insertCategpry
};
