import { useState } from "react";

function AddRecipeForm() {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!title || !ingredients || !steps) {
            setError("All fields are required.");
            return;
        }

        const ingredientsList = ingredients.split("\n").filter((item) => item.trim() !== "");
        if (ingredientsList.length < 2) {
            setError("Please enter at least two ingredients.");
            return;
        }

        // If valid
        setError("");
        const newRecipe = {
            id: Date.now(),
            title,
            summary: steps.slice(0, 60) + "...", // short summary
            image: "https://via.placeholder.com/150",
            ingredients: ingredientsList,
            instructions: steps.split("\n").filter((step) => step.trim() !== "")
        };

        console.log("New recipe added:", newRecipe);

        // Reset form
        setTitle("");
        setIngredients("");
        setSteps("");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Recipe Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter recipe title"
                    />
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block font-medium mb-1">Ingredients (one per line)</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter ingredients, one per line"
                    ></textarea>
                </div>

                {/* Steps */}
                <div>
                    <label className="block font-medium mb-1">Preparation Steps (one per line)</label>
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter preparation steps, one per line"
                    ></textarea>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Recipe
                </button>
            </form>
        </div>
    );
}

export default AddRecipeForm;
