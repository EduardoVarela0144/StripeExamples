require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res, next) => {
  const amount = req.body.amount * 100;

  try {
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
        allowed_countries: ['MX'],
      },
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    next(error); 
  }
};


exports.subscription = async (req, res, next) => {

  try{
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
  } catch (error) {
    next(error);
  }

}



exports.createInvoice = async (req, res, next) => {
  try{

    const invoice = await stripe.invoices.create({
      customer: req.body.customer,
      collection_method: 'send_invoice',
      days_until_due: 30,
    });

    res.json({ invoice });

  }catch (error) {
    next(error);
  }
}


exports.addItemInvoice = async (req, res, next) => {
  try{
      
    const invoiceItem = await stripe.invoiceItems.create({
      customer: req.body.customer,
      price: req.body.product,
      invoice: req.body.invoice,
    });

    res.json({ invoiceItem });
  
    }catch (error) {
      next(error);
  }
}

exports.sendInvoice = async (req, res, next) => {
  try{
      
    const invoice = await stripe.invoices.sendInvoice(req.body.invoice);

    res.json({ invoice });
  
    }catch (error) {
      next(error);
  }
}

exports.attachSubscription = async (req, res, next) => {
  try {
    // Crear la suscripción
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customer,
      items: [{ price: req.body.product }],
      expand: ['latest_invoice.payment_intent']
    });

    // Obtener el Payment Intent de la última factura
    const invoice = subscription.latest_invoice;
    const paymentIntent = invoice.payment_intent;

    // Actualizar el Payment Intent con el método de pago OXXO
    const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntent.id, {
      payment_method_types: ['oxxo'],
      payment_method_options: {
        oxxo: {
          expires_after_days: 3 // La cantidad de días después de los cuales expira el voucher OXXO
        }
      }
    });

    res.json({ subscription, paymentIntent: updatedPaymentIntent });
  } catch (error) {
    next(error);
  }
}

exports.complete = async (req, res) => {
  
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
    stripe.checkout.sessions.listLineItems(req.query.session_id)
  ])

  res.send('Pago realizado correctamente'); 
}

exports.cancel = async (req, res) => {
  res.send('Pago cancelado');
}

