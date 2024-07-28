const request = require('supertest');
const mongoose = require('mongoose');
const {
    app,
    server
} = require('../src/index');
const Order = require('../src/domain/models/order');

describe('Order API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_TEST_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    afterEach(async () => {
        await Order.deleteMany();
    });

    it('should create a new order', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({
                items: ['item1', 'item2']
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('orderId');
    });

    it('should not create a new order with invalid data', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({
                items: []
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });

    it('should get all orders', async () => {
        const res = await request(app)
            .get('/api/orders');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should update order status', async () => {
        const order = new Order({
            items: ['item1'],
            status: 'PENDING'
        });
        await order.save();

        const res = await request(app)
            .put(`/api/orders/${order.orderId}/status`)
            .send({
                status: 'READY'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('READY');
    });

    it('should not update order status with invalid data', async () => {
        const order = new Order({
            items: ['item1'],
            status: 'PENDING'
        });
        await order.save();

        const res = await request(app)
            .put(`/api/orders/${order.orderId}/status`)
            .send({
                status: 'invalid status'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});