const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');
const Order = require('../src/domain/models/order');

let server;

describe('Order API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        server = app.listen();
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
});