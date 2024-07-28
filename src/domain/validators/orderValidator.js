const Joi = require('joi');

const orderSchema = Joi.object({
    items: Joi.array().items(Joi.string()).min(1).required(),
    status: Joi.string().valid('PENDING', 'PREPARING', 'READY', 'DELIVERED').default('PENDING')
});

const updateStatusSchema = Joi.object({
    status: Joi.string().valid('PENDING', 'PREPARING', 'READY', 'DELIVERED').required()
});

module.exports = {
    orderSchema,
    updateStatusSchema
};