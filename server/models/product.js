const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true, // Khai báo trường slug là duy nhất
        lowercase: true
    },
    description: {
        type: Array,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        require: true
    },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

// Trước khi lưu, kiểm tra nếu slug đã tồn tại trong cơ sở dữ liệu
productSchema.pre('save', async function (next) {
    const product = this;
    const slugRegex = new RegExp(`^(${product.slug})((-[0-9]*$)?)$`, 'i');
    const productsWithSameSlug = await mongoose.models.Product.find({ slug: slugRegex });

    // Nếu có sản phẩm khác có cùng slug, thêm một số vào slug để tạo slug mới
    if (productsWithSameSlug.length) {
        product.slug = `${product.slug}-${productsWithSameSlug.length + 1}`;
    }

    next();
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
