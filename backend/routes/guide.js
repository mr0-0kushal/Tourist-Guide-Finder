import express from "express";
import { createGuide, getAllGuide, getSingleGuide , updateGuide , deleteGuide} from "../controllers/guideController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create new guide
router.post("/", verifyAdmin, createGuide);

// Update guide
router.put("/:id", verifyAdmin, updateGuide);

// Delete guide
router.delete("/:id", verifyAdmin, deleteGuide);

// Get single guide
router.get("/:id", getSingleGuide);

// Get all guides
router.get("/", getAllGuide);

export default router;
