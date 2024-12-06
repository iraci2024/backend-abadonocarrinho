const express = require('express');
const { sendMessage } = require('../controllers/whatsappController');

const router = express.Router();

router.post('/send', sendMessage);

module.exports = router;
