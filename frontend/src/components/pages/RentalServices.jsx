import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import '../../styles/rental-services.css';
import CommonSection from '../../shared/CommonSection';

const RentalServices = () => {
  return (
    <>
      <CommonSection title="Rental Services" />
      
      <section className="pt-0 rental-services mt-6">
        <Container>
          {/* Coming Soon Banner */}
          <Row className="mb-5">
            <Col lg="12">
              <div className="coming-soon-banner">
                <h2>Coming Soon!</h2>
                <p>We're excited to announce that our rental services will be available shortly.</p>
                <p>Be among the first to experience seamless tourism in Vrindavan with our premium rentals.</p>
                <Button color="primary" outline className="mt-3">Notify Me When Available</Button>
              </div>
            </Col>
          </Row>
          
          {/* Rental Services Introduction */}
          <Row className="mb-5">
            <Col lg="6">
              <div className="rental-intro">
                <h2>Explore Vrindavan Your Way</h2>
                <p>Our upcoming rental services are designed to enhance your tourism experience in the beautiful Vrindavan area of Mathura. Whether you're visiting sacred temples, exploring historical sites, or immersing yourself in the local culture, our rental options will make your journey comfortable and convenient.</p>
                <p>Located in the heart of Vrindavan, our rental services will provide you with reliable transportation options to navigate through the narrow streets and busy market areas with ease.</p>
              </div>
            </Col>
            <Col lg="6">
              <div className="rental-image">
                <img 
                  src="https://picsum.photos/seed/vrindavan1/600/400" 
                  alt="Vrindavan City View" 
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>
          </Row>
          
          {/* Bike Rentals */}
          <Row className="mb-5 service-section">
            <Col lg="12">
              <h3 className="section-title">Bike Rentals</h3>
            </Col>
            <Col lg="6">
              <div className="rental-image mt-4">
                <img 
                  src="https://picsum.photos/seed/bike1/600/400" 
                  alt="Bike Rental" 
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>
            <Col lg="6">
              <div className="service-details">
                <h4>Convenient and Flexible</h4>
                <p>Our upcoming bike rental service will offer a variety of options, from scooters to motorcycles, allowing you to navigate through Vrindavan's streets with ease. Perfect for both solo travelers and couples looking to explore at their own pace.</p>
                <ul className="feature-list">
                  <li>Variety of bikes to choose from</li>
                  <li>Hourly, daily, and weekly rental options</li>
                  <li>Well-maintained and regularly serviced vehicles</li>
                  <li>Helmets and safety gear included</li>
                  <li>GPS navigation option available</li>
                  <li>Affordable rates with special discounts for longer durations</li>
                </ul>
              </div>
            </Col>
          </Row>
          
          {/* Driver Services */}
          <Row className="mb-5 service-section">
            <Col lg="12">
              <h3 className="section-title">Driver Services</h3>
            </Col>
            <Col lg="6">
              <div className="service-details">
                <h4>Local Expertise at Your Service</h4>
                <p>For those who prefer not to drive, our driver services will offer a comfortable and knowledgeable transportation option. Our drivers are locals who know Vrindavan intimately and can guide you to both popular attractions and hidden gems.</p>
                <ul className="feature-list">
                  <li>Professional, courteous drivers</li>
                  <li>Local guides who know the area well</li>
                  <li>Customizable itineraries based on your interests</li>
                  <li>Air-conditioned vehicles for maximum comfort</li>
                  <li>Multi-lingual drivers available upon request</li>
                  <li>Door-to-door service from your accommodation</li>
                </ul>
              </div>
            </Col>
            <Col lg="6">
              <div className="rental-image mt-4">
                <img 
                  src="https://picsum.photos/seed/driver1/600/400" 
                  alt="Driver Service" 
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>
          </Row>
          
          {/* Popular Destinations */}
          <Row className="mb-5">
            <Col lg="12">
              <h3 className="section-title">Popular Destinations in Vrindavan</h3>
              <p className="text-center mb-4">Our rental services will help you explore these famous sites with ease</p>
            </Col>
            <Col md="4" className="mb-4">
              <Card className="h-100 destination-card">
                <img src="https://picsum.photos/seed/dest1/400/300" alt="Banke Bihari Temple" className="card-img-top" />
                <CardBody>
                  <CardTitle tag="h5">Banke Bihari Temple</CardTitle>
                  <CardText>One of the most revered temples in Vrindavan, dedicated to Lord Krishna in his 'Banke Bihari' form.</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" className="mb-4">
              <Card className="h-100 destination-card">
                <img src="https://picsum.photos/seed/dest2/400/300" alt="ISKCON Temple" className="card-img-top" />
                <CardBody>
                  <CardTitle tag="h5">ISKCON Temple</CardTitle>
                  <CardText>A beautiful marble temple complex that attracts devotees from around the world.</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" className="mb-4">
              <Card className="h-100 destination-card">
                <img src="https://picsum.photos/seed/dest3/400/300" alt="Prem Mandir" className="card-img-top" />
                <CardBody>
                  <CardTitle tag="h5">Prem Mandir</CardTitle>
                  <CardText>A stunning white marble temple illuminated with lights in the evening, depicting various aspects of Krishna's life.</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
          {/* Newsletter Signup */}
          <Row>
            <Col lg="12">
              <div className="newsletter-section text-center p-5 rounded">
                <h3>Stay Updated</h3>
                <p>Subscribe to our newsletter to be the first to know when our rental services launch.</p>
                <div className="input-group mb-3 mt-4 mx-auto" style={{ maxWidth: '500px' }}>
                  <input type="email" className="form-control" placeholder="Your Email Address" />
                  <Button color="primary">Subscribe</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default RentalServices; 