import React, { useState, useEffect } from "react";
import "../style/Category.css";

const Category = ({ categoryUrl, cat }) => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        categoryUrl()
            .then(catType => {
                setCategory(catType);
            });
    }, [categoryUrl]);
    // categoryUrl is a function that doesn't change during the component's lifecycle

    if (category.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className='heading1-category'>{cat}</h1>
            <div className='category-cards'>
                {category.map((recipe) => (
                    <a
                        key={recipe._id}
                        className="category-card"
                        href={recipe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="category-card-header">
                            <h3>
                                {recipe.name}
                            </h3>
                        </div>
                        <div className="category-card-body">
                            <p>
                                {recipe.description}
                            </p>
                            <p>
                                <span className="light-text">Category:</span> {recipe.category}
                            </p>
                            <p>
                                <span className="light-text">By</span> {recipe.author}
                            </p>
                        </div>
                    </a>

                ))}
            </div>
        </div>
    );
};


export default Category;