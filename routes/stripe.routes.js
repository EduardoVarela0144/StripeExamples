const express = require('express');
const stripeController = require('../controllers/stripe.controller');
const router = express.Router();


router.post('/checkout', stripeController.checkout);
router.get('/complete', stripeController.complete);

router.post('/subscription', stripeController.subscription);

router.get('/', (req, res) => {
    res.render('../views/index.ejs')
})

router.get('/mensualidad', (req, res) => {
    res.render('../views/subscription.ejs')
})



router.get('/cancel', (req, res) => {
    res.redirect('/')
})

module.exports = router;