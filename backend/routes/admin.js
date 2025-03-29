import express from "express";
import { getAllUsers, deleteUser , approveGuide } from "../controllers/adminController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
    getAllGuidesForAdmin,
    promoteUserToGuide,
    deleteGuide,
    rejectUserForGuide,
} from "../controllers/guideController.js";

const router = express.Router();

// 🛠 Fetch all users (Only Admin)
router.get("/users", verifyAdmin, getAllUsers);

// 🛠 Delete a user (Only Admin)
router.delete("/users/:id", verifyAdmin, deleteUser);

router.post("/approve-guide", verifyAdmin, approveGuide);

// Get all guides for admin
router.get("/guides", getAllGuidesForAdmin);

// Promote user to guide
router.post("/users/promote/:id", promoteUserToGuide);

// Delete guide
router.delete("/guides/:id", deleteGuide);

//reject guide
router.post("/users/reject/:id", verifyAdmin, rejectUserForGuide);

export default router;
