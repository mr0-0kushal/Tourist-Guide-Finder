import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Assign role based on request body (default is 'tourist')
    const role = req.body.role && ["admin", "guide", "tourist"].includes(req.body.role)
      ? req.body.role
      : "tourist"; // Default to 'tourist' if not provided or invalid

    // Construct user object
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
      role: role,  // Store role properly
    };

    // ✅ Only set 'status' if the role is 'guide'
    if (role === "guide") {
      userData.status = "pending";
    }

    // Create new user
    const newUser = new User(userData);

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully registered!",
      data: newUser,  // Send back user data with role
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ success: false, message: "Failed to register. Try again" });
  }
};


export const login=async(req,res)=>{
  const email=req.body.email;
    try {
      const user=await User.findOne({email})
      //if user doesnt exist
      if(!user){
        return res.status(404).json({
          success:false,message:"User not found"})
      }  
      //if user is exist then check the pasword or compare
      const checkCorrectPassword=await bcrypt.compare(
        req.body.password,user.password)
      //if password incorrect
      if(!checkCorrectPassword){
        return res.status(401)
        .json({success:false,message:'Incorrect email or password'})
      }
      const {password,role,...rest}=user._doc;
      //create jwt token
      const token=jwt.sign(
        {
            id:user._id,role:user.role
        },
        process.env.JWT_SECRET_KEY,{expiresIn:"15d"}
      );

      // set token in the browser cookies and send the response to the client
      res.cookie("accessToken",token,{
        httpOnly:true,
        expires:token.expiresIn,
      })
      .status(200).json({
        token,
      // success:true,message:"successfully login",
    data:{...rest},
    role,

    });


    } catch (error) {
        res.status(500).json({success:false,message:"Failed to login"})
    }
}

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email matches admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    // Compare password with hashed admin password
    const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { role: "admin" }, // Payload
      process.env.JWT_SECRET_KEY, // Secret Key
      { expiresIn: "15d" } // Expiry
    );

    // Set token in cookies and return response
    res.cookie("accessToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    }).status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      data: { role: "admin" },
    });

  } catch (err) {
    console.error("Admin Login Error:", err);
    res.status(500).json({ success: false, message: "Admin login failed" });
  }
};

// import User from '../models/User.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'


// //user Registration
// export const register = async (req ,res) =>{
//     try{

//         const salt =bcrypt.genSaltSync(10);
//         const hash= bcrypt.hashSync(req.body.password,salt);

//         const newUser = new User({
//             username: req.body.username,
//             email:req.body.email,
//             password:hash,
//             photo:req.body.photo
//         })

//         await newUser.save()
//         res.status(200).json({
//             success:true,
//             message:'Successfully created'
//         })

//     }catch(err){
//         res.status(500).json({
//             success:false,
//             message:'Failed to create'
//         })
//     }
// };

// //user login

// export const login = async (req ,res) =>{

//     const email=req.body.email

//     try{
       
//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(404).json({
//                 success:false,
//                 message:'User Not Found'
//             })
//         }

//         const checkCorrectPassword= await bcrypt.compare(req.body.password, user.password)
//         if(!checkCorrectPassword){
//             return res.status(401).json({
//                 success:false,
//                 message:"Incorrect Email or password"
//             })
//         }

//         const {password,role, ...rest} = user._doc;

//         const token=jwt.sign(
//           {id: user._id, role:user.role},
//           process.env.JWT_SECRET_KEY,
//           {expiresIn :"15d"}

//         );

//         res.cookie("accessToken" , token,{
//             httpOnly:true,
//             expires: token.expiresIn,
//         })
//          .status(200)
//          .json({
//             token,
//             data: { ...rest },    
//             role,      
//          });
//     }
//     catch(err){
//        res.status(500).json({ success:false, message:"Failed to Login"});
//     }
// };
