import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

export const SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName] || Icons.VscQuestion; // Fallback to a default icon
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div>
            <NavLink 
                to={link.path} 
                className={`relative flex items-center px-2 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-violet-400/30 w-full" : "bg-opacity-0"}`}
            >
                <span className={`absolute w-1 h-full left-0 ${matchRoute(link.path) ? "bg-violet-700" : "bg-opacity-0"}`} />
                
                <div className='flex items-center gap-x-2'>
                    <Icon className="text-lg" />
                    <span className='text-md'>
                        {link.name}
                    </span>
                </div>
            </NavLink>
        </div>
    );
};
