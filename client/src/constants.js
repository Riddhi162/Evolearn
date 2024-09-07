
export const ACCOUNT_TYPE = {
    STUDENT: "Student",
    INSTRUCTOR: "Instructor",
    ADMIN: "Admin",
  };
  export const COURSE_STATUS = {
    DRAFT: "Draft",
    PUBLISHED: "Published",
  }

  export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)
  
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = `${hour % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`
  
    return `${formattedDate} | ${formattedTime}`
  }


  export default function GetAvgRating(ratingArr) {
    if (!Array.isArray(ratingArr) || ratingArr.length === 0) return 0;
    
    const totalReviewCount = ratingArr.reduce((acc, curr) => {
      acc += curr.rating;
      return acc;
    }, 0);
  
    const multiplier = Math.pow(10, 1);
    const avgReviewCount = 
      Math.round((totalReviewCount / ratingArr.length) * multiplier) / multiplier;
  
    return avgReviewCount;
  }
  


