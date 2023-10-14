import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Recipes from "./components/Recipes";
import RecipesForm from "./components/RecipesForm";
import Results from "./components/SearchResults";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Footer, Copyright } from "./components/Footer";
import Confirmation from "./components/Confirm";
import Reset from "./components/Reset";

import categoriesService from "./services/categories";
import usersService from "./services/users";

import "./style/NavBar.css";
import "./style/MyRecipes.css";


const AllRoutes = ({ recipes, user, setUser, setRecipes }) => {

    // eslint-disable-next-line no-unused-vars
    const [showRecipes, setShowRecipes] = useState(false);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/sign");
        setUser(null);
        window.localStorage.removeItem("loggedUser");
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await usersService.remove({
                user
            });
            setUser(null);
        } catch (error) {
            console.error (error);
        }
    };

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path='/' element={<Home
                    recipes={recipes}
                    setShowRecipes={setShowRecipes}
                    setFilteredRecipes={setFilteredRecipes}
                    setSearchTerm={setSearchTerm} />} />

                <Route path="/categories" element={<Categories recipes={recipes} />} />
                <Route path="/pies" element={<Category categoryUrl={categoriesService.piesUrl} cat={"Pies"} />} />
                <Route path="/cakes" element={<Category categoryUrl={categoriesService.cakesUrl} cat={"Cakes"} />} />
                <Route path="/bread" element={<Category categoryUrl={categoriesService.breadsUrl} cat={"Bread"} />} />
                <Route path="/salads" element={<Category categoryUrl={categoriesService.saladsUrl} cat={"Salads"} />} />
                <Route path="/desserts" element={<Category categoryUrl={categoriesService.dessertsUrl} cat={"Desserts"} />} />
                <Route path="/drinks" element={<Category categoryUrl={categoriesService.drinksUrl} cat={"Drinks"} />} />
                <Route path="/pizza" element={<Category categoryUrl={categoriesService.pizzasUrl} cat={"Pizza"} />} />
                <Route path="/meat" element={<Category categoryUrl={categoriesService.meatsUrl} cat={"Meat"} />} />
                <Route path="/misc" element={<Category categoryUrl={categoriesService.miscellaneoussUrl} cat={"Miscellaneous"} />} />
                <Route path="/cookies" element={<Category categoryUrl={categoriesService.cookiesUrl} cat={"Cookies"} />} />
                <Route path="/tarts" element={<Category categoryUrl={categoriesService.tartsUrl} cat={"Tarts"} />} />


                <Route path='/recipes' element={<Recipes recipes={recipes} />} />

                <Route path='/my-recipes' element={user ?
                    user && <div>
                        <p>Hello {user} !</p>
                        <RecipesForm setRecipes={setRecipes} recipes={recipes} />
                        <button onClick={handleLogout}>Sign out</button>
                        <button onClick={handleDelete}>Delete Account</button>
                    </div> : <div className="login-message fade-in">
                    You need to login to access this page!
                    </div>} />

                <Route path='/about' element={<About />} />
                <Route path='/confirm' element={<Confirmation />} />

                <Route path='/search-results' element={<Results
                    setFilteredRecipes={setFilteredRecipes}
                    filteredRecipes={filteredRecipes}
                    searchTerm={searchTerm}
                     />} />

                <Route path='/sign' element={!user ? (
                    <div className="login-container">
                        <LoginForm
                            setUser={setUser} />
                        <SignupForm />
                    </div>
                ) : null} />
                <Route path='/reset' element={<Reset />} />
            </Routes>
            <Footer />
            <Copyright />
        </>
    );
};

export default AllRoutes;