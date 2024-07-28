const express = require('express');
const orderRoutes = require('./infrastructure/routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/api', orderRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;