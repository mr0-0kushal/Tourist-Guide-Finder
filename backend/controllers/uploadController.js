import cloudinary from '../utils/cloudinary.js';
import User from '../models/User.js'; // adjust the path as needed

export const uploadToCloudinary = async (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: "uploads",
    });

    const imageUrl = result.secure_url;

    // 🔁 Update user's photo field in DB
    await User.findByIdAndUpdate(userId, { photo: imageUrl });

    res.status(200).json({
      success: true,
      url: imageUrl,
      message: "Image uploaded and user profile updated"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed', error });
  }
};
