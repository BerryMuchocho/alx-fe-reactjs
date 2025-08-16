import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data.json"; // assuming recipes live here

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const selectedRecipe = data.recipes.find((r) => r.id.toString() === id);
        setRecipe(selectedRecipe);
    }, [id]);

    if (!recipe) {
        return <p className="text-center text-gray-600 mt-10">Recipe not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
            <img
                src={recipe.image}
                alt={recipe.name}
                className="rounded-lg shadow-md w-full h-64 object-cover mb-6"
            />
            <p className="text-gray-700 mb-6">{recipe.description}</p>

            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {recipe.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default RecipeDetail;
