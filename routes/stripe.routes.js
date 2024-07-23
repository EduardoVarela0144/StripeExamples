const express = require('express');
const stripeController = require('../controllers/stripe.controller');
const router = express.Router();


router.post('/checkout', stripeController.checkout);
router.get('/complete', stripeController.complete);

router.get('/', (req, res) => {
    res.render('index.ejs')
})


router.get('/cancel', (req, res) => {
    res.redirect('/')
})

module.exports = router;