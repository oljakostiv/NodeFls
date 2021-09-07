const { Schema, model } = require('mongoose');

const { dbTab: { CHANGE_PASS, USER } } = require('../config');

const changePassSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(CHANGE_PASS, changePassSchema);
