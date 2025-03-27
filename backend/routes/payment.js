import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🟢 Create Stripe Checkout Session
router.post("/create-checkout-session", verifyUser , verifyToken , async (req, res) => {
  try {
    const { guideName, totalPrice } = req.body;
     // ✅ Log incoming request data
     console.log("Received Payment Request:", req.body);

    // ✅ Validate Input
    if (!guideName || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields: guideName or totalPrice" });
    }

    // ✅ Ensure `totalPrice` is a positive number
    if (totalPrice <= 0) {
      return res.status(400).json({ message: "Total price must be greater than zero" });
    }

    // ✅ Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/thank-you`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: guideName,
            },
            unit_amount: totalPrice * 100, // Convert to paise (cents)
          },
          quantity: 1,
        },
      ],
    });

    // ✅ Send URL for redirecting
    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
});

export default router;
