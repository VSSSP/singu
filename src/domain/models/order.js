const mongoose = require('mongoose');
const {
    v4: uuidv4
} = require('uuid');

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

orderSchema.pre('save', function (next) {
    if (this.isNew) {
        const itemNameString = this.items.join('-');
        const uniqueId = uuidv4();
        this.orderId = `${itemNameString}-${uniqueId}`;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);