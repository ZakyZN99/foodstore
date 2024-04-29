const mongoose = require('mongoose');
const { model, Schema} = mongoose;

//Barang yang diorder
const orderItemSchema = Schema({
    name: {
        type: String,
        minLength : [5, 'Panjang nama minimal 5 karakter'],
        required: [true, 'Nama harus diisi']
    },   
    price: {
        type: Number,
        default: 0
    },
    qty: {
        type: Number,
        required: [true, 'qty harus diisi'],
        min: [1, 'minimal qty  adalah 1']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }

})

module.exports = model('OrderItem', orderItemSchema);