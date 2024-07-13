const mongoose = require('mongoose');
const {model, Schema } = mongoose;

const productSchema = Schema({
    name:{
        type: String,
        minLength: [3, 'Panjang nama product minimal 3 karakter'],
        required: [true, 'Nama product harus diisi']
    },

    description:{
        type: String,
        maxLength: [5000, 'Panjang maksimal deskripsi 5000 karakter']
    },

    price:{
        type: Number,
        default: 0 
    },
    image_url: String,

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true }
);

module.exports = model('Product', productSchema);