import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import AddRecipeForm from './AddRecipeForm';

const RecipeList = () => {
    const recipes = useRecipeStore((state) => state.recipes);

    return (
        <div>
            <h2>All Recipes</h2>
            <AddRecipeForm />
            {recipes.length === 0 && <p>No recipes yet.</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
