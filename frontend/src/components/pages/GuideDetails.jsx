import React, { useEffect, useRef, useState, useContext } from 'react';
import '../../styles/guide-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';

import calculateAvgRating from '../../utils/avgRating';
import avatar from '../../assets/images/avatar.jpg';
import GuideBooking from '../Booking/GuideBooking.jsx';
import Newsletter from '../../shared/Newsletter';
import useFetch from '../../hooks/useFetch.js';
import { BASE_URL } from '../../utils/config.js';
import { AuthContext } from '../../context/AuthContext.js';

const GuideDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [guideRating, setGuideRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: guide, loading, error } = useFetch(`${BASE_URL}/guide/${id}`);

  // Extract guide details
  const { name, photo, bio, location, experience, reviews, languages} = guide || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews || []);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) {
        return alert('Please Sign In!');
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: guideRating,
      };

      const res = await fetch(`${BASE_URL}/guide/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [guide]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="guide__content">
                  <img src={photo || avatar} alt="Guide" className="guide__photo" />
                  <div className="guide__info">
                    <h2>{name}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="guide__rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? ' Not Rated' : <span>({reviews?.length})</span>}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {location}
                      </span>
                    </div>
                    <div className="guide__extra-details">
                      <span>
                        <i className="ri-time-line"></i> {experience} years experience
                      </span>
                      <span>
                        <i className="ri-earth-line"></i> Speaks: {languages?.join(', ') || 'N/A'}
                      </span>
                    </div>
                    <h5>About</h5>
                    <p>{bio}</p>
                  </div>

                  {/*================ Guide Reviews Section ==================== */}
                  <div className="guide__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span key={num} onClick={() => setGuideRating(num)}>
                            {num} <i className="ri-star-s-fill"></i>
                          </span>
                        ))}
                      </div>
                      <div className="review__input">
                        <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts!" required />
                        <button className="btn primary__btn text-white" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="User" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/*================ Guide Reviews Section End ==================== */}
                </div>
              </Col>
              <Col lg="4">
                <GuideBooking guide={guide} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default GuideDetails;
