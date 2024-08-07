const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const tagSchema = new Schema({
  name: {
    type: String,
    minLength: [1, 'Panjang nama kategori minimal 3 karakter'],
    maxLength: [20, 'Panjang nama kategori maksimal 20 karakter'],
    required: [true, 'Nama kategori harus diisi']
  },
});

module.exports = model('Tag', tagSchema);
