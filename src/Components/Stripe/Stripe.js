import React from 'react'
// import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';


const successPayment = data => { 
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

// const onToken = (amount, description) => token =>
//   axios.post(PAYMENT_SERVER_URL,
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromEuroToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name='Jiffy Lube E-Commerce'
    image="https://s3-media3.fl.yelpcdn.com/bphoto/LBnT4M-Jw2W6k4OcgS4JQg/ls.jpg"
    description='Purchase everything in your cart.'
    amount={amount}
    // token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={'pk_test_CsKa2dPTRfnpH2vzGsEcRqI8'}
  />

export default Checkout;