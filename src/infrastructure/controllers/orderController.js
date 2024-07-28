const orderService = require('../../application/orderService');

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
};