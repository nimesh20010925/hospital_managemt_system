import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { FiHome } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { FaHospitalUser } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';
import "./Sidebar.css"

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false); // Toggle sidebar expansion
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleNavigation = (path) => {
        navigateTo(path);
        setIsExpanded(false);  // Collapse sidebar after navigation
    };

    const handleLogout = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/user/admin/logout", { withCredentials: true });
            toast.success(res.data.message);
            setIsAuthenticated(false);
            navigateTo("/Login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <>
            <nav style={!isAuthenticated ? {display:"none"} : {display:"flex"}} className={isExpanded ? "sidebar expanded" : "sidebar"}>
                <ul>
                    <li onClick={() => handleNavigation("/")}>
                        <FiHome className="icon" />
                        <span className='nav-item'>Dashboard</span>
                    </li>
                    <li onClick={() => handleNavigation("/doctors")}>
                        <FaUserDoctor className="icon" />
                        <span className='nav-item'>All Doctors</span>
                    </li>
                    <li onClick={() => handleNavigation("/messages")}>
                        <TiMessages className="icon" />
                        <span className='nav-item'>All Messages</span>
                    </li>
                    <li onClick={() => handleNavigation("/doctor/addnew")}>
                        <FaHospitalUser className="icon" />
                        <span className='nav-item'>Add New Doctor</span>
                    </li>
                    <li onClick={() => handleNavigation("/admin/addnew")}>
                        <MdAddModerator className="icon" />
                        <span className='nav-item'>Add New Admin</span>
                    </li>
                    <li onClick={handleLogout}>
                        <CiLogout className="icon" />
                        <span className='nav-item'>Log Out</span>
                    </li>
                </ul>
            </nav>
            <div className='wrapper'>
                <GiHamburgerMenu className='hamburger' style={!isAuthenticated ? {display:"none"} : {display:"flex"}} onClick={toggleSidebar} />
            </div>
        </>
    );
};

export default Sidebar;
