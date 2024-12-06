const express = require('express');
const { checkMagazordStatus, checkWhatsAppStatus } = require('../controllers/healthController');

const router = express.Router();

router.get('/', async (req, res) => {
  const magazordStatus = await checkMagazordStatus();
  const whatsappStatus = await checkWhatsAppStatus();

  res.json({ magazordStatus, whatsappStatus });
});

module.exports = router;
