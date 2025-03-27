import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
      guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guide",
        required: true,
      },
      tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tourist",
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      duration: {
        type: Number, // Hours booked
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "canceled"],
        default: "pending",
      },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("BookingGuide", bookingSchema);
  