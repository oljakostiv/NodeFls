const { Schema, model } = require('mongoose');

const userGenderEnum = require('../config/user-gender.enum');

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        default: userGenderEnum.MALE,
        enum: Object.values(userGenderEnum)
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
