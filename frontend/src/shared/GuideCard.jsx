import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './guide-card.css';
import calculateAvgRating from '../utils/avgRating';

const GuideCard = ({ guide }) => {
  const { _id, name, location, photo, pricePerHour, availability, reviews } = guide;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className='guide__card'>
      <Card>
        <div className='guide__img'>
          <img src={photo} alt="guide-img" />
          {availability && <span>Available</span>}
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="guide__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {location}
            </span>
            <span className="guide__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? ('Not Rated') : (<span>({reviews.length})</span>)}
            </span>
          </div>
          <h5 className="guide__name">
            <Link to={`/guides/${_id}`}>{name}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>₹{pricePerHour} <span> /per hour</span></h5>
            <button className="btn booking__btn">
              <Link to={`/guides/${_id}`}>Hire Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuideCard;
