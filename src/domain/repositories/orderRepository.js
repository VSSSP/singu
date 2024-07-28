const Order = require('../models/order');

class OrderRepository {
    async create(order) {
        return await Order.create(order);
    }

    async findAll() {
        return await Order.find();
    }

    async findById(id) {
        return await Order.findById(id);
    }

    async update(order) {
        return await order.save();
    }
}

module.exports = new OrderRepository();