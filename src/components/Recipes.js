import { React, useState } from "react";
import "../style/Recipes.css";

const RecipeList = ({ recipes }) => {

    const resultsPerPage = 15;

    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(recipes.length / resultsPerPage);

    // Calculate the range of recipes to display for the current page
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    // Slice the recipes array to display only the current page's recipes
    const displayedRecipes = recipes.slice(startIndex, endIndex);

    // Function to handle the previous page button click
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            scrollToTop();
        }
    };

    // Function to handle the next page button click
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            scrollToTop();
        }
    };

    // Function to handle the "First Page" button click
    const handleFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
            scrollToTop();
        }
    };

    // Function to handle the "Last Page" button click
    const handleLastPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(totalPages);
            scrollToTop();
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="recipe-list-container">

            <h1 className="recipe-list-title">Recipes</h1>
            <p className="result-count">
        Results {startIndex + 1} - {Math.min(endIndex, recipes.length)} out of {recipes.length}
            </p>
            <ul className="recipe-list-ul">
                {displayedRecipes.map((recipe) => (
                    <a
                        key={recipe._id}
                        className="ref"
                        href={recipe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <li className="recipe-list-item">
                            <div className="recipe-name">
                                {recipe.name}
                            </div>
                            <div className="recipe-description">{recipe.description}</div>
                        </li>
                    </a>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={handleFirstPage} className="first-page-button" disabled={currentPage === 1}>
          First Page
                </button>
                <button onClick={handlePrevPage} className="prev-button" disabled={currentPage === 1}>
          Previous
                </button>
                <span className="page-number">
          Page {currentPage} out of {totalPages}
                </span>
                <button onClick={handleNextPage} className="next-button" disabled={currentPage === totalPages}>
          Next
                </button>
                <button onClick={handleLastPage} className="last-page-button" disabled={currentPage === totalPages}>
          Last Page
                </button>
            </div>
        </div>
    );
};

export default RecipeList;