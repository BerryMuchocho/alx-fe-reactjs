import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import EditRecipeForm from './EditRecipeForm';

const RecipeDetails = () => {
    const { id } = useParams();
    const recipe = useRecipeStore((state) =>
        state.recipes.find((r) => r.id === Number(id))
    );

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <EditRecipeForm recipe={recipe} />
            <DeleteRecipeButton id={recipe.id} />
            <Link to="/">Back to Recipes</Link>
        </div>
    );
};

export default RecipeDetails;
