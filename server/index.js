require("dotenv").config();
const express = require('express')
const app = express();
const paymentRoute = require("./routes/Payment");
const profileRoute = require("./routes/Profile");
const userRoute = require("./routes/UserNew");
const courseRoute = require("./routes/Corse")
 const cookieParser = require("cookie-parser")
 const cors = require("cors");
 const fileUpload = require("express-fileupload")
 console.log(process.env.CLOUD_NAME);
console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);

const {cloudinaryConnect} = require("./config/cloudinary")
const PORT = process.env.PORT || 4000;
app.use(fileUpload({useTempFiles:true,
            tempFileDir:"/tmp"}))
app.use(express.json());
app.use(cookieParser())
app.use(
       cors({
           origin:"http://localhost:3000"
        }))

        cloudinaryConnect();
        
 app.use("/api/v1/user",userRoute);
 app.use("/api/v1/profile",profileRoute);
 app.use("/api/v1/payments",paymentRoute);
 app.use("/api/v1/course",courseRoute);

 
require("./config/database").connect();
 app.get("/", (req,res) => {
     return res.json({
         success:true,
         message:"Your server is running..."
     })
 })
app.listen(PORT,()=>{
    console.log("App listening");
})