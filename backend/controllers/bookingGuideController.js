import BookingGuide from "../models/BookingGuide.js";


export const createBooking = async (req, res) => {
    try {
        const { totalPrice, duration, date, tourist, guide } = req.body;
        // Validate that all required fields are provided
        if (!totalPrice || !duration || !date || !tourist || !guide) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: totalPrice, duration, date, tourist, guide",
            });
        }

        // Create new booking
        const newBooking = new BookingGuide({ totalPrice, duration, date, tourist, guide });
        const savedBooking = await newBooking.save();

        res.status(200).json({
            success: true,
            message: "Your tour is booked",
            data: savedBooking,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//get single booking
export const getBooking = async(req,res) =>{
    const id=req.params.id

    try{
        const book= await BookingGuide.findById(id)
        res.status(200).json({success:true,message:'successful',
         data:book});
    } catch(err){
        console.log(err);
        res.status(404).json({success:false,message:'not found'})
    }
    };


    //get all booking
export const getAllBooking = async(req,res) =>{
    
    try{
        const books= await BookingGuide.find();
        res.status(200).json({success:true,message:'successful',
         data:books});
    } catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'internal server error'})
    }
    }

