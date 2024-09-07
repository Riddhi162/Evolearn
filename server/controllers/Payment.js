const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

exports.capturePayment = async (req, res) => {
  try {
    //get course and user id
    const { course_id } = req.body;
    const userId = req.user.id;

    //validation
    if (!course_id) {
      return res.json({
        success: false,
        message: "provide valid course id",
      });
    }
    //valid coursedetai;l
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.json({
          success: false,
          message: "cannot find the course",
        });
      }
      //if user already exist for course
      const uid = new mongoose.Types.ObjectId(userId); //converted string userid to object form because in the no of students enrolles in a particular course we use object type reference to user object
      if (course.studentsEnrolled.includes(uid)) {
        //then student already exist in that course so that course is aleready bought
        return res.json({
          success: false,
          message: "user already bought the course",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "some problem in payment mid",
      });
    }

    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };

    try {
      //initialze payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "cant initiate order",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "some problem in payment final",
    });
  }
};

//verify signature of Razorpay and server
exports.verifySignature = async (req, res) => {
  const webHookSecret = "12345676";
  const signature = req.headers("x-razorpay-signature");
  const shaSum = crypto.createHmac("sha256", webHookSecret); //sha256 is algo  so shaSum is an object
  shaSum.update(JSON.stringify(req.body)); //converted the object to string
  const digest = shaSum.digest("hex"); //for hexaddecimal format we applied digest
  if (signature == digest) {
    console.log("payment auuthorized ");
    const { courseId, userId } = req.body.payload.entity.notes;
    try {
      //find the coursee and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "course not found in payment.js",
        });
      }

      //find the student and add this course in list of enroll courses
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userid },
        {
          $push: { courses: courseId },
        },
        { new: true },
      );

      console.log(enrolledStudent);
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "helloo welcome to new course","namste"
      )
      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Everything done signature and mail sent successfully",
      });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "some problem in student coursein payment",
          });
    }
  }
  else{
    return res.status(400).json({
        success:false,
        message:"verification failedd in payment.js"
    })
  }
};
