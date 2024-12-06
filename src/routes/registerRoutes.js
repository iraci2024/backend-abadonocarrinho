const express = require('express');
const { registerUser, getAllRegistrations } = require('../controllers/registerController');

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllRegistrations); // Adicionando GET

module.exports = router;
