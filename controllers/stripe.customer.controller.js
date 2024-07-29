require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.createCustomer = async (req, res, next) => {

    const { email, name, phone } = req.body;
    
    try {
        const customer = await stripe.customers.create({
        email,
        name,
        phone,
        });
    
        res.status(200).json({ customer });
    } catch (error) {
        next(error);
    }
    
}

exports.getCustomers = async (req, res, next) => {
    try {
        const customers = await stripe.customers.list();
        res.status(200).json({ customers });
    } catch (error) {
        next(error);
    }
}