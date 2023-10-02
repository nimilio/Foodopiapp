import axios from "axios";

const categories = ["pies", "cakes", "breads", "salads", "desserts", "drinks", "pizzas", "meats", "miscellaneouss", "cookies", "tarts"];

// Create an object to store the category URLs
const categoryUrls = {};
categories.forEach((category) => {
    categoryUrls[category] = `api/categories/${category}`;
});

const categoryFunctions = {};
categories.forEach((category) => {
    categoryFunctions[`${category}Url`] = async () => {
        const request = axios.get(categoryUrls[category]);
        const response = await request;
        return response.data;
    };
});

export default categoryFunctions;
