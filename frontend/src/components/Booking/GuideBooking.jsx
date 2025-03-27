import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import StripeCheckout from "../Stripe/StripeCheckout";

// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const GuideBooking = ({ guide, avgRating }) => {
  const { pricePerHour, reviews, _id: guideId ,name} = guide; // Ensure guideId is used
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const serviceFee = 200;

  const [booking, setBooking] = useState({
    guide: guideId, // Send guide ID instead of name
    guideName: name,
    tourist: user ? user._id : "", // Set tourist ID from logged-in user
    fullName: "",
    phone: "",
    duration: 1, // Default to 1 hour
    date: "",
    totalPrice: pricePerHour + serviceFee, // Initial price calculation
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setBooking((prev) => {
      let updatedBooking = { ...prev, [id]: value };

      // If hours change, update total price dynamically
      if (id === "duration") {
        updatedBooking.totalPrice =
          pricePerHour * Number(value) + serviceFee;
      }

      return updatedBooking;
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!user) {
  //     return alert("Please Sign In!");
  //   }

  //   try {
  //     const res = await fetch(`${BASE_URL}/guide-booking`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(booking),
  //     });

  //     const result = await res.json();

  //     if (!res.ok) {
  //       return alert(result.message);
  //     }
      
  //     navigate("/thank-you");
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      return alert("Please Sign In!");
    }
    try {
      const res = await fetch(`${BASE_URL}/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include token
        },
        credentials: "include",
        body: JSON.stringify(booking),
        guideName: guide.name || "Unknown Guide", // Ensure a valid guide name
        totalPrice: booking.totalPrice, // Ensure a number is passed
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout page
      } else {
        alert("Payment initiation failed.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{pricePerHour} <span>/ per hour</span>
        </h3>

        <span className="guide__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* =================== Booking Form Start ======================= */}
      <div className="booking__form">
        <h5>Booking Information</h5>
        <Form className="booking__info-form" onSubmit={handlePayment}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="date" required onChange={handleChange} />
            <input
              type="number"
              placeholder="Hours"
              id="duration"
              required
              min="1"
              defaultValue="1"
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit" className="btn primary__btn w-100 mt-4">
            Book Guide
          </Button>
        </Form>
      </div>
      {/* =================== Booking Form End ======================= */}

      {/* =================== Booking Summary ======================= */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{pricePerHour} <i className="ri-close-line"></i>{" "}
              {booking.duration} Hour(s)
            </h5>
            <span>₹{pricePerHour * booking.duration}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{booking.totalPrice}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default GuideBooking;
