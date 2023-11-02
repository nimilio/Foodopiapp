import React from "react";
import { useParams } from "react-router-dom";
import "../style/RecipeDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import recipeService from "../services/recipes";



const RecipeDetails = ({ myRecipes }) => {
    const { recipeName } = useParams();
    const navigate = useNavigate();
    const recipe = myRecipes.find(recipe => recipe.name === decodeURIComponent(recipeName));

    const { name, user, visible, ...otherProperties } = recipe;

    const deleteClick = async (event) => {
        event.preventDefault();
        console.log(recipe.name);
        try {
            const response = await recipeService
                .remove(
                    recipe.name
                );
            navigate("/my-recipes");
        } catch (error) {
            console.error (error);
        }
    };

    const renderProperty = (key, value) => {
        if (value) {
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    return (
                        <div className="property" key={key}>
                            <span className="property-label">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                            <ul className="property-value-list">
                                {value.map((item, index) => (
                                    <li key={index} className="property-value-list-item">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                }
            } else {
                return (
                    <div className="property" key={key}>
                        <span className="property-label">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>
                        <span className="property-value">{value}</span>
                    </div>
                );
            }
        }
        return null; // empty value -> skip rendering
    };


    return (
        <div className="recipe-details">
            <h2 className="recipe_name">{recipe.name}</h2>
            <div className="property-list">
                {Object.keys(otherProperties).map((key) => renderProperty(key, otherProperties[key]))}
            </div>
            <div className="delrec-button-container">
                <button onClick={deleteClick} className="delrec-button">
                    <i className="fas fa-trash-alt"><FontAwesomeIcon icon={faTrash} /></i>
                    Delete recipe
                </button>
            </div>
        </div>
    );
};


export default RecipeDetails;