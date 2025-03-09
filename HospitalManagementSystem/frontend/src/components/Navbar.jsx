import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Navbar.css"

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/user/patient/logout", { withCredentials: true });
            toast.success(res.data.message);
            setIsAuthenticated(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    const gotoLogin = () => {
        navigateTo("/login")
       
    };

    return (
        <div className='navbar-container'>
            <div className="logo">
                NewHope Medical
            </div>
            <div className={show ? "navlinks showmenu" : "navlinks"}>
                <div className="links">
                    <Link to="/">HOME</Link>
                    <Link to="/appointment">APPOINTMENT</Link>
                    <Link to="/about">ABOUT US</Link>
                </div>
                {isAuthenticated ? (
                    <button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>
                ) : (
                    <button className='logoutBtn btn' onClick={gotoLogin}>LOGIN</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
