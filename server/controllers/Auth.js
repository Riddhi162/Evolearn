const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/Otp');
const mailSender = require('../utils/mailSender');
const otpGenerator = require('otp-generator');
const Profile = require('../models/Profile');

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(401).json({
                success: false,
                message: "Already registered",
            });
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabet: false,
            lowerCaseAlphabet: false,
            specialChars: false,
        });

        console.log("OTP generated", otp);

        let result = await OTP.findOne({ otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabet: false,
                lowerCaseAlphabet: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        }

        const payload = { email, otp };
        const otpBody = await OTP.create(payload);
        console.log(otpBody);
        await mailSender(
            email,
            "Verify your email ",
            otp
          );
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data:otp,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Some error in OTP",
        });
        console.error(error);
    }
};

exports.signup = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            password, 
            confirmPassword, 
            accountType, 
            contactNumber, 
            otp, 
         image, 
            courses, 
            courseProgress 
        } = req.body;
        console.log("step1",password,confirmPassword)

        if (!firstName || !lastName || !email || !password || !confirmPassword ) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }
        console.log("step2")
        const checkUsers = await User.findOne({ email });
        if (checkUsers) {
            return res.status(401).json({
                success: false,
                message: "Already registered",
            });
        }

        console.log("step3")
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Both the passwords do not match",
            });
        }
        console.log("step4")
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 });
        if (recentOTP.length == 0) {
            console.log("inside otp not found")
            return res.status(401).json({
                success: false,
                message: "OTP not found",
            });
        } else if (otp != recentOTP[0].otp) {
            console.log("inside otp not matching")
            return res.status(401).json({
                success: false,
                message: "OTP not matching",
            });
        }
    
        console.log("step6")
        const hashedPassword = await bcrypt.hash(password, 10);
        const newprofile = new Profile({});
        const profile = await newprofile.save();

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            additionalDetails: profile._id, // Default value if not provided
            image: image || 'default-image-url', // Default image URL if not provided
           
            courseProgress: courseProgress || null, // Default value if not provided
            token: null, // Default value if not provided
            resetPasswordExpires: null, // Default value if not provided
        });
        console.log("step7")
        const user = await newUser.save();

       
        console.log("step8")
        res.status(201).json({
            success: true,
            message: "User registered successfully",
           
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error in SignUp",
            error: error.message,
        });
        console.log(error);
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false, 
                message: "Enter both the fields",
            });
        }

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not registered",
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        console.log("hlwlo")
        console.log(req.user)

        const email = req.user.email;
        console.log(email);
        const { password, newPassword, confirmNewPassword } = req.body;
console.log(email);
console.log(password);
console.log(newPassword);
console.log(confirmNewPassword);
        if (!newPassword || !confirmNewPassword || !password) {
            return res.status(401).json({
                success: false,
                message: "Enter all the fields",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords do not match",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect current password",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
