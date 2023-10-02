import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Dropdown.css";


function Navbar() {

    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <li className={`dropdown ${isDropdownOpen ? "open" : ""}`}
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}>
            <Link
                to="/categories"
                className="dropdown-toggle"
                onClick={() => navigate("/categories")}>
            Categories
            </Link>
            <span className="arrow"></span>
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li className='list'>
                    <span onClick={() => navigate("/pies") }>Pies</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/cakes")}>Cakes</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/bread")}>Bread</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/salads")}>Salads</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/desserts")}>Desserts</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/drinks")}>Drinks</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/pizza")}>Pizza</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/meat")}>Meat</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/misc")}>Miscellaneous</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/cookies")}>Cookies</span>
                </li>
                <li className='list'>
                    <span onClick={() => navigate("/tarts")}>Tarts</span>
                </li>
            </ul>
        </li>
    );
}

export default Navbar;