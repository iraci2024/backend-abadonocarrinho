require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cartRoutes = require('./routes/cartRoutes');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const registerRoutes = require('./routes/registerRoutes'); // Novo
const trackingRoutes = require('./routes/trackingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/carts', cartRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/register', registerRoutes); // Novo
app.use('/api/tracking', trackingRoutes);

module.exports = app;
