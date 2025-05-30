import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    status:{
      type: String,
      enum: ["pending", "approved", "rejected"],
      default:"approved",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
