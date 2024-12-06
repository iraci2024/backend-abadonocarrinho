const axios = require('axios');

const whatsappApi = axios.create({
  baseURL: process.env.WHATSAPP_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

module.exports = whatsappApi;
