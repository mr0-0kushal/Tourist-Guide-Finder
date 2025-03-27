import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute  from './routes/tours.js'
import guideRoute  from './routes/guide.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/bookings.js'
import guideBookingRoute from './routes/guide-booking.js'
import paymentRoute from './routes/payment.js'

dotenv.config();


const app = express()
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: "https://tourist-guide-finder.vercel.app",  // 👈 Replace with your actual frontend URL
    credentials: true,  // 👈 Allows cookies
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}


mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Is connected successfully');
    } catch (err) {
        console.log('MongoDB Connection failed');
    }
};



app.get("/", (req, res) => {
    res.send("api is working");
})

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth" ,  authRoute);
app.use("/api/v1/tours" , tourRoute);
app.use("/api/v1/users" , userRoute);
app.use("/api/v1/review" , reviewRoute);
app.use("/api/v1/booking" , bookingRoute);
app.use("/api/v1/guide-booking" , guideBookingRoute);
app.use("/api/v1/guide" , guideRoute);
app.use("/api/v1/payment" , paymentRoute);




app.listen(port, () => {
    connect();
    console.log('Server listening on Port', port);
})