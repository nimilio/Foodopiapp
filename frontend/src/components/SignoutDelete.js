import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersService from "../services/users";
import { FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import "../style/SignoutDelete.css";

const SignoutDelete = ({ user, setUser }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        navigate("/sign");
        setUser(null);
        window.localStorage.removeItem("loggedUser");
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                await usersService.remove({
                    user
                });
                setUser(null);
                window.localStorage.removeItem("loggedUser");
                window.alert("Account successfully deleted");
                navigate("/sign");
            } catch (error) {
                console.error (error);
            }
        }
    };

    return(
        <div>
            <div className="logo-container">
                <div
                    className="logged-in"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                >
                    <span className={"dropdown-user-toggle"}> {user} logged in </span>
                    {showDropdown && (
                        <div className="dropdown-user">
                            <ul onClick={handleLogout}>
                                <div className="icon-and-text">
                  Sign out
                                    <FaSignOutAlt className="icon" />
                                </div>
                            </ul>
                            <ul onClick={handleDelete}>
                                <div className="icon-and-text">
                  Delete Account
                                    <FaTrashAlt className="icon" />
                                </div>
                            </ul>
                        </div>
                    )}
                </div>
                <img src='/images/login.png' alt="Food" className="logo-sign" />
            </div>
        </div>
    );
};

export default SignoutDelete;