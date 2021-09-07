const { Schema, model } = require('mongoose');

const { dbTab: { INACTIVE_ACCOUNT, USER } } = require('../config');

const inactiveAccSchema = new Schema({
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

module.exports = model(INACTIVE_ACCOUNT, inactiveAccSchema);
