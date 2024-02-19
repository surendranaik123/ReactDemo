// Payment.js

import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
  const [amount, setAmount] = useState(10);

  const handleToken = async (token) => {
    try {
      const response = await axios.post('/api/payment', {
        token,
        amount,
      });

      if (response.status === 200) {
        alert('Payment Successful');
      } else {
        alert('Payment Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Amount: ${amount}</p>
      <StripeCheckout
        token={handleToken}
        stripeKey="YOUR_STRIPE_PUBLIC_KEY"
        name="Payment App"
        amount={amount * 100} // Amount in cents
      />
    </div>
  );
};

export default Payment;
