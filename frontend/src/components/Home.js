import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";


const getRecipeOfTheDay = (recipes) => {
    const currentDate = new Date();
    const dayOfYear = Math.floor(
        (currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000
    );
    const randomIndex = dayOfYear % recipes.length;
    return recipes[randomIndex];
};


const Home = ({  recipes, setShowRecipes, setFilteredRecipes, setSearchTerm }) => {
    const [searchRecipes, setSearchRecipes] = useState("");
    const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // get the recipe of the day when the component mounts
        const selectedRecipe = getRecipeOfTheDay(recipes);
        setRecipeOfTheDay(selectedRecipe);
    }, [recipes]);

    const handleForm = (event) => {
        setSearchRecipes(event.target.value);
        setSearchTerm(event.target.value);
    };

    const findRecipe = (event) => {
        event.preventDefault();
        const searchTerm = searchRecipes.toLowerCase();

        const filtered = recipes.filter((recipe) => {
            const foundInName = recipe.name.toLowerCase().includes(searchTerm);
            const foundInDescription = (recipe.description || "").toLowerCase().includes(searchTerm);
            const foundInIngredients = recipe.ingredients && recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(searchTerm)
            );
            const foundInMethods = recipe.methods && recipe.methods.some((method) =>
                method.toLowerCase().includes(searchTerm)
            );

            return foundInName || foundInDescription || foundInIngredients || foundInMethods;
        });

        setFilteredRecipes(filtered);
        setShowRecipes(true);
        navigate("/search-results");
        setSearchRecipes("");
    };

    const text = (
        <>
            <h1 className="heading1">🌟 Welcome to Foodopiapp - Your Culinary Companion! 🌟</h1>
            <p className='paragraph'>Explore the World of Flavors, One Recipe at a Time</p>

            <p className='paragraph special'>
      🍽️ Are you ready to embark on a delicious journey through the culinary
        world? Look no further! Foodopiapp is your ultimate destination for all
        things food. Whether you`&aposre a seasoned chef or a kitchen newbie, we`&aposve
        got something special in store for you. 🍽️
            </p>

            <p className='paragraph'>
        Join the Foodopiapp community today and make every
        meal a masterpiece. Cooking has never been this fun, easy, and
        rewarding.
            </p>

            <p className='paragraph'>Get started now and let the culinary adventures begin! </p>

            <p className='paragraph'>Happy Cooking,</p>
            <p className='paragraph'>The Foodopiapp Team</p>
        </>
    );


    return(
        <>
            <div className="searchContainer">
                <div className="recipe-search-container">
                    <form onSubmit={findRecipe}>
                        <input
                            value={searchRecipes}
                            onChange={handleForm}
                            name="Search"
                            placeholder="Search for recipes..."
                        />
                        <button type="submit" disabled={!searchRecipes}>
              Search
                        </button>
                    </form>
                </div>
            </div>
            <div className='mainContainer'>
                {text}
            </div>
            {recipeOfTheDay && (
                <div className="dayrecipe-card">
                    <h2>Recipe of the Day</h2>
                    <a href={recipeOfTheDay.url} target="_blank" rel="noopener noreferrer">

                        <h3>{recipeOfTheDay.name}</h3>
                    </a>
                    <p>{recipeOfTheDay.description}</p>
                </div>
            )}
        </>
    );
};

export default Home;