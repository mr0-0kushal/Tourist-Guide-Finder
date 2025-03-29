import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "guide", "tourist"], // Added "user" as an option
    },
    status:{
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
