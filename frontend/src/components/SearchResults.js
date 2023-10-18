import "../style/SearchResults.css";
import React from "react";

// eslint-disable-next-line no-unused-vars
const Results = ({ filteredRecipes, searchTerm }) => {


    const highlightText = (text, highlight) => {
        const contextLength = 20; // Number of characters to include before and after the highlight
        const regex = new RegExp(`(${highlight})`, "gi");
        let result = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
            const beforeMatch = text.slice(
                Math.max(0, match.index - contextLength),
                match.index
            );
            const afterMatch = text.slice(
                match.index + highlight.length,
                match.index + highlight.length + contextLength
            );

            result.push(
                <React.Fragment key={result.length}>
                    {beforeMatch}
                    <mark>{match[0]}</mark>
                    {afterMatch}
                </React.Fragment>
            );
        }

        // if no matches, display the entire text
        if (result.length === 0) {
            result.push(<React.Fragment key={0}>{text}</React.Fragment>);
        }

        return <span>{result}</span>;
    };


    return (
        <>{filteredRecipes.length === 0 ? (
            <div className="center-content">
                <div className="center-content-inner">
                    <h1>No results found!</h1>
                    <img
                        src= '/images/noresults.jpeg'
                        alt="img"
                        className="no-results-image"
                    />
                </div>
            </div>
        ) :
            <><h1 className='heading1'>Results for &quot;{ searchTerm }&quot;</h1><div className="recipe-cards">
                {filteredRecipes.map((recipe) => (
                    <a
                        key={recipe.id}
                        className="recipe-card"
                        href={recipe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="card-header">
                            <h3>
                                {recipe.name}
                            </h3>
                        </div>
                        <div className="card-body">
                            <p>
                                   ...{highlightText(recipe.description, searchTerm)}...
                            </p>
                        </div>
                        <div className="recipe-details">
                            <p>
                                <span className="light-text">Category:</span> {recipe.category}
                            </p>
                            <p>
                                <span className="light-text">By</span> {highlightText(recipe.author, searchTerm)}
                            </p>
                        </div>
                    </a>
                ))}
            </div></>}
        </>
    );
};


export default Results;