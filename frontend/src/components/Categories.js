
import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Categories.css";

const categoriesData = [
    { name: "Pies", imageSrc: "/images/pie.jpg", link: "/pies" },
    { name: "Cakes", imageSrc: "/images/cake.jpg", link: "/cakes" },
    { name: "Breads", imageSrc: "/images/bread.jpg" , link: "/bread" },
    { name: "Salads", imageSrc: "/images/salad.jpg", link: "/salads" },
    { name: "Desserts", imageSrc: "/images/dessert.jpg", link: "/desserts" },
    { name: "Drinks", imageSrc: "/images/drink.jpg" , link: "/drinks" },
    { name: "Pizza", imageSrc: "/images/pizza.jpg" , link: "/pizza" },
    { name: "Meat", imageSrc: "/images/meat.jpg" , link: "/meat" },
    { name: "Miscellaneous", imageSrc: "/images/miscellaneous.jpg" , link: "/misc" },
    { name: "Cookies", imageSrc: "/images/cookies.jpg", link: "/cookies" },
    { name: "Tarts", imageSrc: "/images/tart.jpg" , link: "/tarts" },
];

const RecipeList = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (link) => {
        navigate(link);
    };

    return (
        <div className='categoryContainer'>
            <h1 className='heading1'>Categories</h1>
            <ul className="category-list">
                {categoriesData.map((category) => (
                    <ul key={category._id}>
                        <button
                            className="category-button"
                            onClick={() => handleCategoryClick(category.link)}
                        >
                            <div className="category-image">
                                <img src={category.imageSrc} alt={category.name}/>
                            </div>
                            <div className="category-name">{category.name}</div>
                        </button>
                    </ul>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
