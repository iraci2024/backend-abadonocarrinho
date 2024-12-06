const axios = require('axios');
const base64 = require('base-64');

const magazordApi = axios.create({
  baseURL: process.env.MAGAZORD_BASE_URL,
  headers: {
    Authorization: `Basic ${base64.encode(`${process.env.MAGAZORD_USERNAME}:${process.env.MAGAZORD_PASSWORD}`)}`,
    'Content-Type': 'application/json',
  },
});

module.exports = magazordApi;
