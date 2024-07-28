const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./infrastructure/routes/orderRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', orderRoutes);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const gracefulShutdown = () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed');
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = {
    app,
    server
};