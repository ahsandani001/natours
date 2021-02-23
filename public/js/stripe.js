/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51IMZGSIYYaetaR9vdxd6l6T59VIoWQSEk9BG58Uf6ufe4XIqbaYE6EZBjCyMTYOT0MRQsLUOAR1w8Mq5U1FRNnlP00gT9alBUK'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get the session from endpoint from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
