const reviewSchema = new mongoose.Schema(
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
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      comment: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("GuideReview", reviewSchema);
  