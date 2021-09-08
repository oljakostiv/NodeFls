const { Schema, model } = require('mongoose');

const { dbTab: { ACTION_TOKEN, USER } } = require('../config');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(ACTION_TOKEN, actionTokenSchema);
