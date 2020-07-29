const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        trim:true
    }, token: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;