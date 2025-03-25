import React, { useState, useEffect } from 'react';
import CommonSection from '../../shared/CommonSection.jsx';
import "./guide.css";
import GuideCard from '../../shared/GuideCard.jsx';
import Newsletter from '../../shared/Newsletter.jsx';
import { Container, Row, Col } from 'reactstrap';
import useFetch from '../../hooks/useFetch.js';
import { BASE_URL } from '../../utils/config.js';

const GuideList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: guides, loading, error } = useFetch(`${BASE_URL}/guide?page=${page}`);
  const { data: guideCount } = useFetch(`${BASE_URL}/tours/search/getGuideCount`);

  useEffect(() => {
    const pages = Math.ceil(guideCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, guideCount, guides]);

  return (
    <>
      <CommonSection title={"All Guides"} />
      <section>
        <Container>
          <Row>
            {/* Add a SearchBar component if needed */}
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {guides?.map(guide => (
                <Col lg="4" md="6" sm="12" className="mb-4" key={guide._id}>
                  <GuideCard guide={guide} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map(number => (
                    <span 
                      key={number} 
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default GuideList;
