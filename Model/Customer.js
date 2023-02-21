const { model, Schema } = require('mongoose');

const customer = new Schema(
    {
        name: String,
        address: String,
        phone: String,
        is_delete: {
            type: Number,
            enum: [0, 1],
            default: 0
        }
    },
    { timestamps: true });
module.exports = model('customer', customer);