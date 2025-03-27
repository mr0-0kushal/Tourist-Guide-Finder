import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BASE_URL } from "../utils/config";

const StripeCheckout = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { totalPrice, guide, tourist, date, duration } = booking;

    try {
      // Send booking details to backend for Stripe Payment Intent
      const res = await fetch(`${BASE_URL}/payment/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ totalPrice }),
      });

      const { clientSecret } = await res.json();

      if (!clientSecret) {
        alert("Payment failed. Try again!");
        setLoading(false);
        return;
      }

      // Confirm Payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        alert("Payment successful! Booking confirmed.");

        // Save Booking to Database
        await fetch(`${BASE_URL}/guide-booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ guide, tourist, date, duration, totalPrice }),
        });

        setLoading(false);
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment error, try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="stripe-checkout">
      <CardElement className="card-input" />
      <button type="submit" disabled={!stripe || loading} className="pay-btn">
        {loading ? "Processing..." : `Pay ₹${booking.totalPrice}`}
      </button>
    </form>
  );
};

export default StripeCheckout;
