// src/components/RecipeList.jsx
import { useRecipeStore } from "../store/recipeStore";

function RecipeList() {
    const recipes = useRecipeStore((state) => state.recipes);

    return (
        <div>
            <h2>Recipe List</h2>
            {recipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                <ul>
                    {recipes.map((recipe, index) => (
                        <li key={index}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RecipeList;

