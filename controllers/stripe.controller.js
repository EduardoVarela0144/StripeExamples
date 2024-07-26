require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {

  const amount = req.body.amount * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: "Licencia de uso de plataforma",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },

    ],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["MX"],
    },
    success_url: `${process.env.BASE_URL}/api/stripe/complete?session_id={CHECKOUT_SESSION_ID}`,
    locale: "es",
  });

  res.status(200).json({ url: session.url });
  
};


exports.subscription = async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.BASE_URL}/api/stripe/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/api/stripe/cancel`,
  });

  res.json({ url: session.url });

}

exports.complete = async (req, res) => {
  
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
    stripe.checkout.sessions.listLineItems(req.query.session_id)
  ])

  console.log(JSON.stringify(await result))

  res.send('Pago realizado correctamente'); 
}

exports.cancel = async (req, res) => {
  res.send('Pago cancelado');
}