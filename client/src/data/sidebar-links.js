import {ACCOUNT_TYPE} from "../constants"

export const sidebarlinks = [
    {
        id: "1",
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: "VscAccount",
    },
    {
        id: "2",
        name: "Dashboard",
        path: "/dashboard/instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,  // Correct usage
        icon: "VscVn",
    },
    {
        id: "3",
        name: "Add courses",
        path: "/dashboard/add-courses",
        type: ACCOUNT_TYPE.INSTRUCTOR,  // Correct usage
        icon: "VscAdd",
    },
    {
        id: "4",
        name: "My courses",
        path: "/dashboard/my-courses",
        type: ACCOUNT_TYPE.INSTRUCTOR,  
        icon: "VscLibrary",
    },
    {
        id: "5",
        name: "Enrolled courses",
        path: "/dashboard/enrolled-course",
        type: ACCOUNT_TYPE.STUDENT, 
        icon: "VscHistory",
    },
    {
        id: "6",
        name: "Purchase History",
        path: "/dashboard/purchase-history",
        type: ACCOUNT_TYPE.STUDENT,  // Correct usage
        icon: "VscHistory",
    },
];
