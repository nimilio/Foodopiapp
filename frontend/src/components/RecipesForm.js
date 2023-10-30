import React, { useState } from "react";
import recipeService from "../services/recipes";
import "../style/RecipesForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";
import ErrorNotification from "./Notification";

const RecipeForm = ({ user }) => {
    const [newRecipe, setNewRecipe] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newMethod, setNewMethod] = useState([]);
    const [newDescription, setNewDescription] = useState("");
    const [newIngred, setNewIngred] = useState([]);
    const [ingredientInput, setIngredientInput] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [checked, setCheck] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const addIngredient = () => {
        if (ingredientInput.trim() !== "") {
            setNewIngred([...newIngred, ingredientInput]);
            setIngredientInput("");
        }
    };

    const removeIngredient = (index) => {
        const updatedIngredients = [...newIngred];
        updatedIngredients.splice(index, 1);
        setNewIngred(updatedIngredients);
    };

    const handleNewIngredients = (event) => {
        // setNewIngred(event.target.value);
        setIngredientInput(event.target.value);
    };

    const handleNewRecipe = (event) => {
        setNewRecipe(event.target.value);
    };

    const handleNewUrl = (event) => {
        setNewUrl(event.target.value);
    };

    const handleNewAuthor = (event) => {
        setNewAuthor(event.target.value);
    };

    const handleNewMethod = (event) => {
        const text = event.target.value;
        const paragraphs = text.split("\n");
        setNewMethod([...paragraphs]);
    };

    const handleNewDescription = (event) => {
        setNewDescription(event.target.value);
    };


    const handleNewCategory = (event) => {
        setNewCategory(event.target.value);
    };

    const addRecipe = async (event) => {
        event.preventDefault();

        const recipeObject = {
            category: newCategory,
            description: newDescription,
            name: newRecipe,
            ingredients: newIngred,
            method: newMethod,
            author: newAuthor,
            url: newUrl,
            visible: checked,
            username: user
        };

        try {
            const response = await recipeService
                .create(
                    recipeObject
                );
                setErrorMessage(response.message);
            window.location.reload();
        } catch (error) {
            setErrorMessage(error.response.data.error);
            console.error (error);
        }
    };

    return (
        <div>
            <img src="/images/white-floral.avif" alt="Flowers" className="flower-image" />
            <form className="recipes-form" onSubmit={addRecipe}>
                <div>
                    <h3 className="form-title">Create a new recipe!</h3>
                </div>
                <input
                    type="text"
                    name="name"
                    value={newRecipe.name}
                    onChange={handleNewRecipe}
                    placeholder="Recipe Name"
                />
                <br/>

                <input
                    type="text"
                    name="category"
                    value={newRecipe.category}
                    onChange={handleNewCategory}
                    placeholder="Category"
                />

                <textarea
                    name="description"
                    value={newRecipe.description}
                    onChange={handleNewDescription}
                    placeholder="Description"
                />

                <div>
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
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                onClick={addIngredient}
                            >
                                <div className="tooltip">
                                    <span>Add another ingredient</span>
                                </div>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    <ul className="ing-ul">
                        {newIngred.map((ingredient, index) => (
                            <li key={index}>
                                <div className="ingredient">
                                    <FontAwesomeIcon icon={faUtensilSpoon}/>
                                    <span>{ingredient}</span>
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onMouseEnter={() => setShowTooltip(index)}
                                        onMouseLeave={() => setShowTooltip(null)}
                                        onClick={() => removeIngredient(index)}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                    {showTooltip === index && (
                                        <div className="delete-tooltip">
                                            <span>Delete Ingredient</span>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <textarea
                    name="method"
                    value={newMethod.join("\n")}
                    onChange={handleNewMethod}
                    placeholder="Method"
                />


                <input
                    type="text"
                    name="author"
                    value={newRecipe.author}
                    onChange={handleNewAuthor}
                    placeholder="Author"
                />

                <input
                    type="text"
                    name="url"
                    value={newRecipe.url}
                    onChange={handleNewUrl}
                    placeholder="Recipe URL"
                />

                <button type="submit" className="recipes-form-button" disabled={!newRecipe}>Add Recipe</button>
                {errorMessage && (
                    <ErrorNotification errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                )}
            </form>
        </div>
    );
};

export default RecipeForm;