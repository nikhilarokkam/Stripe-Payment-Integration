// server/index.js
const express = require('express');
const stripe = require('stripe')('sk_test_51ORwt6SEf97aZ2LNzg7bhHVpxOWnJ9LzEolckHC60krvrcyqCcWLl2atbqWaImMIbsNRaPqmLY7esGWNgzaODx4d00vF3PFioU');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1OSwjOSEf97aZ2LNFD8BQKbi',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: getShippingCountries(req.body.currency),
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to determine allowed shipping countries based on currency
function getShippingCountries(currency) {
  // Add logic here to determine allowed countries based on the currency
  // For example, if currency is INR, allow only India; for other currencies, allow outside India.
  if (currency === 'INR') {
    return ['IN'];
  } else {
    return ['US', 'CA', 'GB', 'AU']; // Add other countries as needed
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
