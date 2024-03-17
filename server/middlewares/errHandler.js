const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found!`)
    res.status(404)
    next(error)
}

const errHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let errorMessage = error.message
    
    // Kiểm tra xem lỗi có phải là duplicate key error không
    if (errorMessage.includes('E11000 duplicate key error')) {
        const email = errorMessage.match(/email: \"([^\"]+)\"/)[1] // Trích xuất email từ thông điệp lỗi
        errorMessage = `Duplicate key error: Email ${email} already exists.` // Tạo thông điệp lỗi mới
    }

    return res.status(statusCode).json({
        success: false,
        mes: errorMessage
    })
}

module.exports = {
    notFound,
    errHandler
}
