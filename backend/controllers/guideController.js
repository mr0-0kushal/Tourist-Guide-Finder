import Guide from "../models/Guide.js";
import User from "../models/User.js"; // Import User model

// ✅ Create a new Guide
export const createGuide = async (req, res) => {
    const newGuide = new Guide(req.body);

    try {
        const savedGuide = await newGuide.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedGuide,
        });
    } catch (err) {
        console.error("Error creating guide:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again.",
        });
    }
};

// ✅ Update Guide
export const updateGuide = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedGuide = await Guide.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedGuide,
        });
    } catch (err) {
        console.error("Error updating guide:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
};

// ✅ Delete Guide
export const deleteGuide = async (req, res) => {
    const id = req.params.id;
    try {
        const guide = await Guide.findById(id);
        if (!guide) {
            return res.status(404).json({
                success: false,
                message: "Guide not found",
            });
        }

        await Guide.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        console.error("Error deleting guide:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
};

// ✅ Get Single Guide
export const getSingleGuide = async (req, res) => {
    const id = req.params.id;

    try {
        const guide = await Guide.findById(id).populate("reviews");
        if (!guide) {
            return res.status(404).json({
                success: false,
                message: "Guide not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully found",
            data: guide,
        });
    } catch (err) {
        console.error("Error fetching guide:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch guide",
        });
    }
};

// ✅ Get All Guides with Pagination
export const getAllGuide = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Default page is 0

    try {
        const guides = await Guide.find({})
            .populate("reviews")
            .skip(page * 8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: guides.length,
            message: "Successful",
            data: guides,
        });
    } catch (err) {
        console.error("Error fetching guides:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch guides",
        });
    }
};

// ✅ Admin: Get All Guides Without Pagination
export const getAllGuidesForAdmin = async (req, res) => {
    try {
        const guides = await Guide.find({}).populate("reviews");

        res.status(200).json({
            success: true,
            count: guides.length,
            message: "All guides fetched successfully",
            data: guides,
        });
    } catch (err) {
        console.error("Error fetching guides for admin:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch guides",
        });
    }
};
export const promoteUserToGuide = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.role === "guide" && user.status === "approved") {
            return res.status(400).json({ success: false, message: "User is already a guide" });
        }

        // Extract additional guide details from req.body
        const { location, experience, languages, photo, pricePerHour } = req.body;

        // ✅ Check if required fields are provided
        if (!location || !languages || !photo || !pricePerHour) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Create new guide entry with required fields
        const newGuide = new Guide({
            name: user.username,
            location,
            experience,
            languages,
            photo,
            pricePerHour,
            availability: true, // Default field
            reviews: [],
            featured: false, // Default field
        });

        await newGuide.save();

        // ✅ Keep user in Users model and update role & status
        user.role = "guide";
        user.status = "approved"; // Add this status to track approval
        await user.save();

        res.status(200).json({
            success: true,
            message: "User promoted to guide successfully",
            data: newGuide,
        });
    } catch (err) {
        console.error("Error promoting user to guide:", err);
        res.status(500).json({
            success: false,
            message: "Failed to promote user to guide",
        });
    }
};

export const rejectUserForGuide = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.status === "approved") {
            return res.status(400).json({ success: false, message: "Cannot reject an already approved guide" });
        }

        // ✅ Update user status to "rejected"
        user.status = "rejected";
        await user.save();

        res.status(200).json({
            success: true,
            message: "User has been rejected as a guide",
        });
    } catch (err) {
        console.error("Error rejecting user:", err);
        res.status(500).json({
            success: false,
            message: "Failed to reject user",
        });
    }
};

