const touristSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
      },
      nationality: {
        type: String,
      },
      profilePhoto: {
        type: String,
      },
      bookings: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Booking",
        },
      ],
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Tourist", touristSchema);
  