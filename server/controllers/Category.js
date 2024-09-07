const mongoose = require("mongoose");
const Category = require("../models/category");
const { populate } = require("dotenv");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const CategoryDeatil = await Category.create({
      name: name,
      description: description,
    });
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Some erroe ACtegory creation",
    });

    console.log(error);
  }
};

//getAlltags
exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      {
        name: true,
        description: true,
      }
    ); //we dont have any criteria to find so left the{ braces empty just that name and descriptinon should be there}
    return res.status(201).json({
      success: true,
      message: "Category found successfully",
      data:allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error in finding Category ",
    });

    console.log(error);
  }
};
//categorypagedetails
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate: "ratingAndReviews",
    })
    .exec()

    console.log("SELECTED COURSE", selectedCategory);

    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Handle the case when there are no courses
    if (selectedCategory?.courses?.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }
    console.log("jellhduf");
    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findById(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
      
      })
      .exec();

    console.log("Different COURSE", differentCategory);

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        populate:{
          path:"instructor"
        }
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses || []);
    console.log(allCourses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
      console.log(mostSellingCourses);
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
