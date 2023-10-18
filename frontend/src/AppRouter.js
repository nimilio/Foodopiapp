import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Date from "./components/Date";
import CategoryDropdown from "./components/DropdownMenu";
import ScrollToTop from "./components/ScrollToTop";
import AllRoutes from "./AppRoutes";
import SignoutDelete from "./components/SignoutDelete"
import recipesService from "./services/recipes";


import "./style/navBar.css";


const Routers = ({ recipes,  setRecipes }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedUser");
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser(user.username);
            recipesService.setToken(user.token);
        }
    }, []);

    
    return (
        <Router>
            <ScrollToTop />
            <div className="header">
                <div className="logo-container">
                    <Link to='/'>
                        <img src='images/home.png' alt="Food" className="logo" />
                    </Link>
                    <div className="logo-text">
                        <Link to='/'>Foodopiapp</Link>
                    </div>
                </div>

                <div className="navbar">
                    <Link to='/recipes'>Recipes</Link>
                    <CategoryDropdown />
                    <Link to='/my-recipes'>My recipes</Link>
                    <Link to='/about'>About</Link>

                    <div>
                        {user ? (
                            <SignoutDelete user={user} setUser={setUser}/>
                        ) : (
                            <Link to='/sign' className="navbar-link sign-in">
                Sign in
                                <img src='/images/login.png' alt="Food" className="logo-sign" />
                            </Link>
                        )}
                    </div>
                </div>

                <Date />
            </div>
            <AllRoutes user={user} recipes={recipes} setRecipes={setRecipes} setUser={setUser} />
        </Router>
    );
};

export default Routers;