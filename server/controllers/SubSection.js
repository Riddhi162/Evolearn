const SubSection = require("../models/SubSection")
const Section = require("../models/Section") 
const Course = require("../models/Course")  
const {uploadImageToCloudinary} = require("../utils/imageuploader")

exports.createSubSection = async(req,res)=>{
    try {
        const{title,description,sectionId} = req.body;
        console.log(body)
         const video = req.files.videoFile;
         console.log("hi")
console.log("rEACHED SUBSECTION",title,description,sectionId,video)
        if(!title || !description || !sectionId){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
console.log("over here all there")
        //upload video to cloudinary
          const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        //create a subssec
        const SubSectionDetails =  await SubSection.create({
            title:title,
             timeDuration: `${uploadDetails.duration}`,
            description:description,
             videoUrl:uploadDetails.secure_url,
        })
        //add it to section
        console.log("hi")
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subSection:SubSectionDetails._id
            }
        },
    {new:true},).populate("subSection")
        console.log(updateSection);
    return res.status(200).json({
        success:true,
        message:"sub-section created success",
        data: updateSection
    })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"some problem in section creation"
        })
    }
}



exports.updateSubSection = async (req,res) =>{
    try {
        const {title,description,subSectionId,sectionId} = req.body;
        console.log("rEACHED editing SUBSECTION",title,description,sectionId,subSectionId)
        if(!title  || !description || !subSectionId){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        console.log("over here all there")
        const subSection = await SubSection.findByIdAndUpdate(subSectionId,{title,description},{new:true})
           
        
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        console.log(updatedSection)
        return res.status(200).json({
            success:true,
            message:"sub section updated success",
            data:updatedSection,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"some problem in sub section update"
        })
    }
}

exports.deleteSubSection = async (req,res) =>{
    try {
        //if we send id in params in route
        const {subSectionId,sectionId} = req.body;
        console.log("sub del",subSectionId,sectionId)
        await Section.findByIdAndUpdate({_id:sectionId},{
            $pull:{
                subSection:subSectionId,
            },
        })
       const subSection = await SubSection.findByIdAndDelete({_id:subSectionId});

       const updatedSection = await Section.findById(sectionId).populate("subSection")
       console.log(updatedSection)
        return res.status(200).json({
            success:true,
            message:"sub section deleted success",
            data:updatedSection
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"some problem in sub section deletion"
        })
    }
}