import User from "../models/User.js";
import Guide from "../models/Guide.js";

// 🛠 Fetch All Users (Only Admins Can Access)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Fetch users (excluding password)
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

// 🛠 Delete User (Only Admin)
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

// Approve Guide & Move to Guide Model
export const approveGuide = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "guide") {
      return res.status(404).json({ success: false, message: "User not found or not a guide" });
    }

    // Move user to Guide Model
    const newGuide = new Guide({
      userId: user._id,
      username: user.username,
      email: user.email,
      photo: user.photo || "",
      experience: "Enter Experience Here", // Admin should provide this info
      location: "Enter Location Here", // Admin should provide this info
    });

    await newGuide.save();
    await User.findByIdAndDelete(user._id); // Remove from Users Model

    res.status(200).json({ success: true, message: "User approved as a Guide" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to approve guide" });
  }
};


export const rejectGuide = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId); // Find the user
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.role !== "guide") {
      return res.status(400).json({ message: "User is not a guide." });
    }

    // Remove guide role from user
    user.role = "user"; // or any other default role
    await user.save();

    // Optionally, delete the guide data from the Guide collection
    await Guide.findOneAndDelete({ userId });

    res.status(200).json({ message: "Guide rejected successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rejecting guide." });
  }
};