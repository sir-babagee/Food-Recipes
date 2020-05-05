import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
    const APP_ID = "7db1fab4";
    const APP_KEY = "c8a303a8686e5a18918ce95eb4550ad5";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = (async) => {
        fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        ).then((response) => {
            response.json().then((data) => {
                setRecipes(data.hits);
                console.log(data.hits);
            });
        });
    };

    const getSearch = (event) => {
        event.preventDefault();
        setQuery(search);
        setSearch("");
    };

    const updateSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className="App">
            <header>
                <h1 style={{ color: "white" }}>Babagee's Food Recipe Site</h1>
            </header>
            <form onSubmit={getSearch} className="search-form">
                <input
                    className="search-bar"
                    type="text"
                    value={search}
                    onChange={updateSearch}
                />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
            <div className="recipes">
                {recipes.map((recipe) => (
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
