// src/App.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51ORwt6SEf97aZ2LNX8t7zGtQrmg0NzeNLxuYNaM9dxiI20UQQmFXTbu3Rv0NFhgXuRaaB3tRiRnYvooNtzQI6JZU00TLydl9kZ');

const App = () => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:3001/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <h1>Stripe Integration with React and Node.js</h1>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
};

export default App;
