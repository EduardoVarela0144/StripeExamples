const express = require('express');
const stripeController = require('../controllers/stripe.controller');
const router = express.Router();

router.post('/single_payment', stripeController.payment);
router.post('/monthly_payment', stripeController.subscription);
router.get('/complete', stripeController.complete);

module.exports = router;