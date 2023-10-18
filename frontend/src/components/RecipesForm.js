import React, { useState } from "react";
import recipeService from "../services/recipes";

const RecipeForm = ({ setRecipes, recipes }) => {
    const [newRecipe, setNewRecipe] = useState("");

    const handleNewRecipe = (event) => {
        setNewRecipe(event.target.value);
    };

    const addRecipe = (event) => {
        event.preventDefault();
        const recipeObject = {
            Name: newRecipe,
            url: "",
            Description: "",
            Author: "",
            Ingredients: "",
            Method: ""
        };

        recipeService
            .create(recipeObject)
            .then(returnedRecipe => {
                console.log(recipeObject);
                setRecipes(recipes.concat(returnedRecipe));
                setNewRecipe("");
                console.log(recipes);
            });
    };


    return (
        <div>
            <p>Hello {user} !</p>
            <form onSubmit={addRecipe}>
                <input
                    value={newRecipe}
                    onChange={handleNewRecipe}
                />
                <button type="submit" disabled>Add</button>
            </form>
            <iframe
                src="https://giphy.com/embed/EIiJp9cQ3GeEU"
                width="180"
                height="180"
                className="giphy-embed"
                allowFullScreen
                title="Animated GIF"
                style={{
                    display: "block",
                    margin: "0 auto",
                }}
            ></iframe>
        </div>
    );
};

export default RecipeForm;