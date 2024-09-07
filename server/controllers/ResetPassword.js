const mongoose = require("mongoose");
const OTP = require("../models/Otp");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto")
const bcrypt = require("bcrypt")
exports.resetPasswordToken = async (req, res) => {
  try {
    
    const email = req.body.email;
  
    const checkUser = await User.findOne({ email })
  
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "email not registerd",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const updatedDetails = await User.findOneAndUpdate(
      {
        email: email,
      },

      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true, //updated documentation is returnd
      }
    );
   console.log(updatedDetails);
   const url = `http://localhost:3000/update-password/${token}`;
   console.log("we re here")
    await mailSender(
      email,
      "Password reset ",
      `${url}`
    );
    console.log("we re here")
    res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
      data:url,
  });
     //for each user we generate a new link for frontend
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some erroe in reset password token",
    });
    console.log(error);
  }
};



exports.resetPassword= async (req, res) => {
    try {
        const{password,confirmPassword,token} = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
              success: false,
              message: "New passwords do not match",
            });}

            const checkUser = await User.findOne({ token:token });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "Token invalid",
      });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    checkUser.password = hashedPassword;
    checkUser.token = undefined;
    checkUser.resetPasswordExpires = undefined;
    await checkUser.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Some erroe in OTp",
      });
      console.log(error);
    }
  };
  