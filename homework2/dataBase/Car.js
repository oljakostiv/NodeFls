const { Schema, model } = require('mongoose');

const carTypeEnum = require('../config/car-type.enum');

const carSchema = new Schema({
    model: {
        type: String,
        require: true,
        trim: true
    },
    type: {
        type: String,
        default: carTypeEnum.SEDAN,
        enum: Object.values(carTypeEnum)
    },
    year: {
        type: Number,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('car', carSchema);
// work
