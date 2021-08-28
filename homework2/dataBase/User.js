const { Schema, model } = require('mongoose');

const userGenderEnum = require('../config/user-gender.enum');

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    born_year: {
        type: Number,
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
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        // select: false
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
