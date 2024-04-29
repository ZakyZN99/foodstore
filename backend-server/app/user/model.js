const mongoose = require('mongoose')
const {Schema, model} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    fullName : {
        type: String,
        require: [true, 'Nama Lengkap harus diisi'],
        minlength: [3, 'Panjang minimal karakter minimal 3 karakter'],
        maxlength: [255, 'Panjang maksimal karakter maksimal 255 karakter']
    },
    customerId:{
        type: Number,
    },
    email:{
        type: String,
        require: [true, 'Email harus diisi'],
        maxlength: [255, 'Panjang maksimal karakter maksimal 255 karakter'],
        validate: {
            validator: async function (value) {
                const count = await this.constructor.countDocuments({ email: value });
                return count === 0; // Returns true if email is unique
            },
            message: attr => `${attr.value} sudah terdaftar`
        }
    },
    password:{
        type: String,
        require: [true, 'Password harus diisi'],
        maxlength: [255, 'Panjang maksimal karakter maksimal 255 karakter']
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: [String]
},   {timestamps: true});

userSchema.path('email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid!`);

const HASH_ROUND = 10;
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND),
    next()
});

userSchema.plugin(AutoIncrement, {inc_field: 'customerId'})

module.exports = model('User', userSchema);