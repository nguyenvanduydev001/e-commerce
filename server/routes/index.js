const userRouter = require('./user')
const productRouter = require('./product')
const roductCategoryRouter = require('./productCategory')
const blogCategoryRoyter = require('./blogCategory')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/blogcategory', blogCategoryRoyter)
    app.use('/api/prodcategory', roductCategoryRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes