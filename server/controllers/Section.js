const Section = require("../models/Section") 
const Course = require("../models/Course") 
const subSection = require("../models/SubSection")
const SubSection = require("../models/SubSection")
exports.createSection = async(req,res) => {
    try {
        console.log("here")
        //fetch data 
        const {sectionName,courseId} = req.body;
        //data validation
       console.log(sectionName,courseId);
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        //create new section
        console.log("here2");
        const subSection = Section.subSection;
        const newSection = await Section.create({sectionName:sectionName,
            subSection:subSection
        })
        //update course with section objectid so we pushed the new section id in the course cotent of course schema
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();//here we find by course id in which course section is from and update in that course
        //here we have too use populate to get exactly what we want that is section and subsection both in course details and not just id  PENDING do it
        return res.status(200).json({
            success:true,
            message:"section created success",
            updatedCourseDetails,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"some problem in section creation"
        })
    }
}


exports.updateSection = async (req,res) =>{
    try {
        const {sectionName,sectionId,courseId} = req.body;
        console.log("IN update",sectionName,sectionId,courseId)
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true})
        const course = await Course.findByIdAndUpdate(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();
        console.log("over here");
        return res.status(200).json({
            success:true,
            message: section,
            data:course,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"some problem in section update"
        })
    }
}

exports.deleteSection = async (req,res) =>{
    try {
        //if we send id in params in route
        console.log("We are inside delete controller")
        const {sectionId,courseId} = req.body;

        console.log(sectionId,courseId)

        await Course.findByIdAndUpdate(courseId,
            {
                $pull:{
                    courseContent: sectionId,
                }
            }
        );//remove secction id from the array
        const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        await SubSection.deleteMany({_id:{$in:section.SubSection}})
        await Section.findByIdAndDelete(sectionId);
        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        return res.status(200).json({
            success:true,
            message:"section deleted success",
            data:course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"some problem in section deletion"
        })
    }
}