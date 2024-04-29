const { Schema, model } = require("mongoose");

const deliveryAddressSchema = new Schema({
    nama:{
        type: String,
        required: [true, 'Nama alamat harus diisi'],
        maxLength: [255, 'Maksimal karakter 255 karakter'] 
    },

    kelurahan: {
        type: String,
        required: [true, 'Kelurahan harus diisi'],
        maxLength: [255, 'maksimal karakter 255 karakter'] 
    },

    kecamatan: {
        type: String,
        required: [true, 'Kecamatan harus diisi'],
        maxLength: [255, 'Maksimal karakter 255 karakter'] 
    },

    kabupaten: {
        type: String,
        required: [true, 'Kabupaten harus diisi'],
        maxLength: [255, 'Maksimal karakter 255 karakter'] 
    },

    provinsi: {
        type: String,
        required: [true, 'Provinsi harus diisi'],
        maxLength: [255, 'Maksimal karakter 255 karakter'] 
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

module.exports = model('DeliveryAddress', deliveryAddressSchema)