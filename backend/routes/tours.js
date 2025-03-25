import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour, getFeaturedTourGuide ,
     getSingleTour, getTourBySearch, getTourCount, updateTour , getGuideCount} from "../controllers/tourController.js";


const router= express.Router();

import { verifyAdmin } from "../utils/verifyToken.js";

//create new tour
router.post("/" , verifyAdmin, createTour);

//update  tour
router.put("/:id" ,verifyAdmin, updateTour);

//delete tour
router.delete("/:id" ,verifyAdmin, deleteTour);

//get single tour
router.get("/:id" , getSingleTour);

//get all tour
router.get("/" , getAllTour);

//get all tour
router.get("/search/getTourBySearch" , getTourBySearch);

//get featured tour
router.get("/search/getFeaturedTours" , getFeaturedTour);

//get featured tour guide
router.get("/search/getFeaturedToursGuide" , getFeaturedTourGuide);

//get tour count
router.get("/search/getTourCount" , getTourCount);

//get guide count
router.get("/search/getGuideCount" , getGuideCount);



export default router;

