const express = require("express");
const { trackEvent, getAllTrackingData } = require("../controllers/trackingController");

const router = express.Router();

router.post("/", trackEvent);
router.get("/", getAllTrackingData); // Adicionando GET

module.exports = router;
