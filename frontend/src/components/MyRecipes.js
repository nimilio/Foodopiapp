import React, { useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import recipeService from "../services/recipes";

const MyRecipes = ({ myRecipes, setMyRecipes, user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        recipeService
            .getMy(user)
            .then(allMyRecipes => {
                setMyRecipes(allMyRecipes);
            });
    }, []);

    return (
        <div>
            <p className="paragraph special">Hello {user} ! This is your personal cooking diary 📔</p>
            <h2 className="my-recipes-title">Your Recipes</h2>
            <ul>
                {myRecipes.map((recipe, index) => (
                    <li className="recipe-name" key={index}>
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/my-recipes/${recipe.name}`)}
                        >
                            {recipe.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyRecipes;