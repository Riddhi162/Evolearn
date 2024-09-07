import React, { useEffect, useState } from "react";
import logo1 from "../../assests/Evol-removebg-preview.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { navbarlinks } from "../../data/navlinks";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCart } from "react-icons/io";
import { HiUser } from "react-icons/hi";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { RiArrowDropDownLine } from "react-icons/ri";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../slices/cartSlice";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const match = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate("/");
  };

  const [subLinks, setSubLinks] = useState([]);
  
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="h-16 fixed top-0 z-50 w-full flex items-center bg-richblack-900/90 justify-center border-b-2 border-richblack-700/60 shadow-lg shadow-richblack-200/10 backdrop-blur-lg">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between gap-8">
        <Link to="/">
          <img src={logo1} alt="Logo" className="w-[125px] h-auto" />
        </Link>
        
        <nav>
          <ul className="flex gap-8 items-center text-violet-200">
            {navbarlinks.map((link, index) => (
              <li key={index} className="relative group ">
                {link.title === "Catalog" ? (
                  <div className="flex items-center group ">
                    <p className="cursor-pointer">{link.title}</p>
                    <RiArrowDropDownLine fontSize={25} className="ml-1 transition-transform transform group-hover:rotate-180" />
                    <div className=" absolute w-[150px] left-[50%] translate-x-[-50%] translate-y-[8%] top-[50%] bg-white backdrop-blur-2xl rounded-lg shadow-lg hidden group-hover:block">
                      {subLinks.map((subLink, index) => (
                        <Link 
                          to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} 
                          key={index}
                          className="block px-4 py-2 text-sm text-violet-900 hover:bg-richblack-200"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} className={`relative  ${match(link?.path) ? "bg-violet-600 text-white" : "hover:bg-richblack-700"}`}>
                  <p className={`${match(link?.path) ? "font-bold text-violet-500" : ""}`}>
                    {link.title}
                  </p>
                  {match(link?.path) && (
                    <span className="absolute bottom-[-10px] left-[50%] transform -translate-x-[50%] w-2 h-2 bg-violet-200 rounded-full"></span>
                  )}
                </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          {token && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/purchase-history" className="relative flex items-center">
              <IoIosCart fontSize={25} color="white" />
              {totalItems > 0 && <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs rounded-full px-2">{totalItems}</span>}
            </Link>
          )}

          {token === null ? (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="border border-richblack-700 px-3 py-1.5 bg-violet-200/10 text-violet-400 rounded-md transition-colors hover:bg-violet-300">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 px-3 py-1.5 bg-violet-200/10 text-violet-400 rounded-md transition-colors hover:bg-violet-300">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative group">
              <HiUser fontSize={25} color="white" className="cursor-pointer" />
              <div className="absolute right-0 mt-0 w-48 bg-richblack-100 rounded-md shadow-lg hidden group-hover:block">
                <Link to="/dashboard/my-profile" className="block px-4 py-2 text-sm text-richblack-300 hover:bg-richblack-5">Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-richblack-300 hover:bg-richblack-5"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
