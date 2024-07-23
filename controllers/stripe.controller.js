require("dotenv").config();
const express = require("express");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: "Licencia de uso de plataforma",
          },
          unit_amount: 20000 * 100,
        },
        quantity: 1,
      },

    ],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["MX"],
    },
    success_url: `${process.env.BASE_URL}/api/v1/stripe/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/api/v1/stripe/cancel`,
    locale: "es",
  });

  res.redirect(session.url);
};


exports.subscription = async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_1PfqaPDewdilSf5wQNZcq7MO',
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.BASE_URL}/api/v1/stripe/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/api/v1/stripe/cancel`,
  });

  res.redirect(session.url);



}

exports.complete = async (req, res) => {
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
    stripe.checkout.sessions.listLineItems(req.query.session_id)
  ])

  console.log(JSON.stringify(await result))

  res.send('Subscripcion completada')
}