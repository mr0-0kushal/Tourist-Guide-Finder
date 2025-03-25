import React from 'react'
import GuideCard from '../../shared/GuideCard'
//import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import useFetch from "../../hooks/useFetch.js"
import {BASE_URL} from "../../utils/config.js"




const FeaturedTourGuideList = () => {

  const {data: featuredToursGuide,loading,error} = useFetch(`${BASE_URL}/tours/search/getFeaturedToursGuide`);

  
  return ( 
  <>
      {
        loading && <h4>Loading....</h4>
      }
      {
        error && <h4>{error}</h4>
      }

    { 
     !loading && !error && featuredToursGuide?.map(tour =>(
        <Col lg="3" className="mb-4" key={tour._id}>
            <GuideCard guide={tour} />
        </Col>
    ))}
  </>
  );
};

export default FeaturedTourGuideList
