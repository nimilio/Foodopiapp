import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";
import recipeService from "../services/recipes";

const EditRecipesForm = ({ recipe, recName, onCancel }) => {
    const [editedRecipe, setEditedRecipe] = useState({ ...recipe, name: recName });
    const [newName, setNewName] = useState(recName);
    const [ingredientInput, setIngredientInput] = useState("");
    const [newIngred, setNewIngred] = useState(recipe.ingredients || []); // Initialize with existing ingredients
    const [newMethod, setNewMethod] = useState(recipe.method || []); // Initialize with existing method

    // eslint-disable-next-line no-unused-vars
    const { ingredients, method, user, visible, ...editProperties } = recipe;
    const navigate = useNavigate();

    useEffect(() => {
        setEditedRecipe({ ...editedRecipe, oldName: recName });
    }, [newName]);

    const handleNewName = (event) => {
        const updatedName = event.target.value;
        setNewName(updatedName);
        setEditedRecipe({ ...editedRecipe, name: updatedName });
    };

    const handleNewIngredients = (event) => {
        setIngredientInput(event.target.value);
    };

    const addIngredient = () => {
        if (ingredientInput.trim() !== "") {
            const updatedIngredients = [...newIngred, ingredientInput];
            setNewIngred(updatedIngredients);
            setEditedRecipe({ ...editedRecipe, ingredients: updatedIngredients });
            setIngredientInput("");
        }
    };


    const removeIngredient = (index) => {
        const updatedIngredients = [...newIngred];
        updatedIngredients.splice(index, 1);
        setNewIngred(updatedIngredients);

        setEditedRecipe({ ...editedRecipe, ingredients: updatedIngredients });
    };

    const handleNewMethod = (event) => {
        const text = event.target.value;
        const paragraphs = text.split("\n");
        setNewMethod([...paragraphs]);
        setEditedRecipe({ ...editedRecipe, method: paragraphs });
    };

    const handleChange = (key, value) => {
        setEditedRecipe({
            ...editedRecipe,
            [key]: value,
        });
    };


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            recipeService
                .update(
                    editedRecipe
                );
            // setErrorMessage(response.message);
        } catch (error) {
            // setErrorMessage(error.response.data.error);
            console.error (error);
        }
        navigate("/my-recipes");
    };

    return (
        <form className="recipes-form" onSubmit={handleFormSubmit}>
            <div>
                <h3 className="paragraph special">Edit your recipe</h3>
            </div>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    id="newName"
                    name="newName"
                    value={newName}
                    onChange={handleNewName}
                />
            </div>
            <div>
                {Object.keys(editProperties).map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{capitalizeFirstLetter(key)}</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={editedRecipe[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div>
                <label htmlFor="ingredients">Ingredients</label>
                <div className="input-group">
                    <input
                        type="text"
                        name="ingredients"
                        value={ingredientInput}
                        onChange={handleNewIngredients}
                        placeholder="Ingredient (e.g., 1 ts honey)"
                    />
                    <div className="add-button-container">
                        <button
                            type="button"
                            className="add-button"
                            onClick={addIngredient}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                <ul className="ing-ul">
                    {newIngred.map((ingredient, index) => (
                        <li key={index}>
                            <div className="ingredient">
                                <FontAwesomeIcon icon={faUtensilSpoon} />
                                <span>{ingredient}</span>
                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeIngredient(index)}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <label htmlFor="method">Method</label>
            <textarea
                name="method"
                value={newMethod.join("\n")}
                onChange={handleNewMethod}
                placeholder="Method"
                style={{ resize: "vertical" }}
            />
            <div className="delrec-button-container">
                <button className="edit-button" type="submit">Save</button>
                <button className="delrec-button" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditRecipesForm;
