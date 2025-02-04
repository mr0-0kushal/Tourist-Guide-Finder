import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default Route
app.get("/", (req, res) => {
    res.send("Hello Backend is running Properly......");
});

// // Connect to MongoDB
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB Connected Successfully");
//     } catch (error) {
//         console.error("MongoDB Connection Failed:", error);
//         process.exit(1);
//     }
// };

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    // await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
