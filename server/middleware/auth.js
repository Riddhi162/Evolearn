const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth=async(req,res,next)=>{
    try {
      console.log("Inside auth middleware")
      console.log("Request body:", req.body); // Logs the body
      console.log("Request cookies:", req.cookies); // Logs cookies
      console.log("Request headers:", req.headers);
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", ""); 
        // Extract the token from cookies, the request body, or the Authorization header. 
        // For the header, it removes the 'Bearer' prefix if present.
   console.log(token);
        if (!token) { // Check if the token is missing
          return res.status(401).json({
            success: false,
            message: 'Token is missing',
          });
        }
    
        try {
          const decode = await jwt.verify(token, process.env.JWT_SECRET); 
          
          // console.log("Decoded token:", decode); 
          // Verify the token using the secret from environment variables. 
          // This will decode the token if it is valid.
    
          req.user = decode; // Attach the decoded token payload to the request object as 'req.user'
        }
         catch (err) { 
          console.log(err)// Catch any errors that occur during token verification
          return res.status(401).json({
            success: false,
            message: "Token invalid",
          });
        }
        next(); // Call the next middleware function in the stack
      } catch (error) { 
        // Catch any other errors that occur
        console.log(error)
        return res.status(500).json({
          success: false,
          message: "Server error in token",
          
        });
      }
}


exports.isStudent = async (req,res,next)=>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(500).json({
                success: false,
                message: "Only for Students",
              });
        }
        next();
    } catch (error) {
      console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error in student",
          });
    }
}


exports.isAdmin = async (req,res,next)=>{
    try {
      console.log(req.user.accountType)
        if(req.user.accountType !== "Admin"){
            return res.status(500).json({
                success: false,
                message: "Only for Admin",
              });
        }
        next();
    } catch (error) {
      console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error in Admin",
          });
    }
}


exports.isInstructor = async (req,res,next)=>{
    try {
        if(req.user.accountType !== "Instructor"){

            return res.status(500).json({
              
                success: false,
                message: "Only for Instructor",
              });
        }
        next();
    } catch (error) {
      console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error in Instructor",
          });
    }
}