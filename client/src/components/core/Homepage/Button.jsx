import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out
        ${active ? 
          "bg-violet-300 text-violet-950  border-violet-900 border-2 shadow-md shadow-violet-300/50 hover:bg-violet-400 hover:shadow-violet-600/50" : 
          "bg-richblack-800 text-white border border-richblack-600 shadow-lg shadow-richblack-100/50 hover:bg-richblack-700 hover:shadow-richblack-800/50"
        }`}
      >
        {children}
      </div>
    </Link>
  )
}

export default Button
