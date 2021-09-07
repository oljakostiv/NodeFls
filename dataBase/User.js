const { Schema, model } = require('mongoose');

const { dbTab: { USER }, userRole } = require('../config');

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
    role: {
        type: String,
        default: userRole.USER,
        enum: Object.values(userRole)
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        // select: false
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = model(USER, userSchema);
