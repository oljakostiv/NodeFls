const { Schema, model } = require('mongoose');

const { actions, dbTab: { ACTIVE_TOKEN, USER } } = require('../config');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: Object.values(actions)
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(ACTIVE_TOKEN, actionTokenSchema);
