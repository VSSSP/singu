const Order = require('../../domain/models/order');
const {
    orderSchema,
    updateStatusSchema
} = require('../../domain/validators/orderValidator');

class OrderController {
    async createOrder(req, res) {
        const {
            error
        } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }
        const {
            items
        } = req.body;
        const order = new Order({
            items
        });
        await order.save();
        res.status(201).send(order);
    }

    async getOrders(req, res) {
        const orders = await Order.find();
        res.status(200).send(orders);
    }

    async updateOrderStatus(req, res) {
        const {
            error
        } = updateStatusSchema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }
        const {
            id
        } = req.params;
        const {
            status
        } = req.body;
        const order = await Order.findOne({
            orderId: id
        });
        if (!order) {
            return res.status(404).send({
                message: 'Order not found'
            });
        }
        order.status = status;
        await order.save();
        res.status(200).send(order);
    }
}

module.exports = new OrderController();