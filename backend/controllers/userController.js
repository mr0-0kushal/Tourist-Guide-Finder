import User from "../models/User.js"


//create a new User
export const createUser = async (req, res) => {

    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try Again'
        });
    }
};
// Backend: promote user to guide
const promoteUserToGuide = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user data
    const user = await User.findById(userId);
    if (!user || user.role !== "user") {
      return res.status(400).json({ message: "User not found or already a guide" });
    }

    // Transfer user data to the Guide model
    const guide = new Guide({
      name: user.name,
      email: user.email,
      location: user.location,
      experience: user.experience,
      languages: user.languages,
      photo: user.photo,
      pricePerHour: user.pricePerHour,
    });

    // Save the guide
    await guide.save();

    // Remove the user from the User model
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User promoted to guide successfully", guide });
  } catch (error) {
    res.status(500).json({ message: "Error promoting user to guide", error });
  }
};


export const updateUser = async (req, res) => {
  const id = req.params.id;

  // Only allow these fields to be updated
  const allowedUpdates = ['username', 'location', 'photo'];
  const updates = {};

  for (const key of allowedUpdates) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Send the user object directly (include role and other fields)
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

  
//delete User

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete'
        });
    }
};

//getSingleUser

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: 'Successfully found',
            data: user,
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: 'not found'
        });
    }
};

//getall Users

export const getAllUser = async (req, res) => {
  

    try {
        const users = await User.find({});
        
        res.status(200).json({ success: true,
             message: "Successfull",
              data: users });

    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "not-found",
        })
    }
};

// User Profile
export const getUserProfile = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).select("-password"); // Exclude password
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };