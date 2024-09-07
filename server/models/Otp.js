const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        otp:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:5*60
        },
       
    }
);
//till the time user doesnt enter the valid otp he/she entry is not done in database then how does he get the oytp in mail even though there is no entry done in database we use the pre middleware

//so we need to send otp to sendMail

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification email",otp)
        console.log(mailResponse);
    }
    catch(error){
        console.log(error);
    }
}
//using premiddleware
otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
})//just before the details are saved, this runs
module.exports = mongoose.model("Otp",otpSchema)