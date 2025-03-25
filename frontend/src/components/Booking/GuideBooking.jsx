import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const GuideBooking = ({ guide, avgRating }) => {
  const { pricePerHour, reviews, name } = guide; // Updated to guide details

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    guideName: name, // Changed from tourName to guideName
    fullName: '',
    phone: '',
    days: 1, // Changed from guestSize to days
    bookAt: ''
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(booking);

    try {
      if (!user) {
        return alert('Please Sign In!');
      }

      const res = await fetch(`${BASE_URL}/guide-booking`, { // Updated API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate('/thank-you');
    } catch (err) {
      alert(err.message);
    }
  };

  const serviceFee = 200;
  const totalAmount = Number(pricePerHour) * Number(booking.days) + Number(serviceFee);

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>₹{pricePerHour} <span>/per day</span></h3>

        <span className="guide__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* =================== Booking Form Start ======================= */}
      <div className="booking__form">
        <h5>Booking Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} />
            <input type="number" placeholder="Hour" id="hours" required min="1" onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>
      {/* =================== Booking Form End ======================= */}

      {/* =================== Booking Summary ======================= */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{pricePerHour} <i className="ri-close-line"></i> 1 Hour
            </h5>
            <span>₹{pricePerHour}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Guide
        </Button>
      </div>
    </div>
  );
};

export default GuideBooking;
