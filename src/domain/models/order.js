const mongoose = require('mongoose');
const crypto = require('crypto');


const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true
    },
    items: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'PREPARING', 'READY', 'DELIVERED'],
        default: 'PENDING'
    }
});

function generateAlphanumeric(length) {
    return crypto.randomBytes(length)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, length);
}

orderSchema.pre('save', function (next) {
    if (this.isNew) {
        const itemNameString = this.items.join('-');
        const randomNumber = Math.round(Math.random() * 1000000); // Generates a random number
        const alphanumeric = generateAlphanumeric(6); // Generates a 6 character alphanumeric string
        this.orderId = `${itemNameString}-${randomNumber}-${alphanumeric}`;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);