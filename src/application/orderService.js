const orderRepository = require('../domain/repositories/orderRepository');

class OrderService {
    async createOrder(orderDto) {
        return await orderRepository.create(orderDto);
    }

    async getOrders() {
        return await orderRepository.findAll();
    }

    async updateOrderStatus(orderId, status) {
        const order = await orderRepository.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        order.status = status;
        return await orderRepository.update(order);
    }
}

module.exports = new OrderService();