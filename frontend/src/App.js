import { useState, useEffect } from "react";
import recipeService from "./services/recipes";
import Routers from "./AppRouter";


function App() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        recipeService
            .getAll()
            .then(initialRecipes => {
                setRecipes(initialRecipes);
            });
    }, []);


    return (

        <Routers recipes={recipes} setRecipes={setRecipes} />

    );
}

export default App;
