const request = require('supertest');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const {
    app
} = require('../src/index');
const Order = require('../src/domain/models/order');

describe('Order API', () => {
    let server;

    beforeAll(async () => {
        server = app.listen(process.env.PORT || 3000);

        mockingoose(Order).toReturn({
            _id: '507f1f77bcf86cd799439011',
            orderId: '1',
            items: ['item1', 'item2'],
            status: 'PENDING'
        }, 'save');
    });

    afterAll(async () => {
        mockingoose.reset();
        await mongoose.connection.close();
        server.close();
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
        mockingoose(Order).toReturn([{
            _id: '507f1f77bcf86cd799439011',
            orderId: '1',
            items: ['item1', 'item2'],
            status: 'PENDING'
        }], 'find');

        const res = await request(app).get('/api/orders');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should update order status', async () => {
        mockingoose(Order).toReturn({
            _id: '507f1f77bcf86cd799439011',
            orderId: '1',
            items: ['item1', 'item2'],
            status: 'PENDING'
        }, 'findOne');

        const res = await request(app)
            .put('/api/orders/1/status')
            .send({
                status: 'READY'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('READY');
    });

    it('should not update order status with invalid data', async () => {
        mockingoose(Order).toReturn({
            _id: '507f1f77bcf86cd799439011',
            orderId: '1',
            items: ['item1', 'item2'],
            status: 'PENDING'
        }, 'findOne');

        const res = await request(app)
            .put('/api/orders/1/status')
            .send({
                status: 'invalid status'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});