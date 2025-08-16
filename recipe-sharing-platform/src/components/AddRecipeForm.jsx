import { useState } from "react";

function AddRecipeForm() {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [errors, setErrors] = useState({});

    // validation function
    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Recipe title is required.";
        }
        if (!ingredients.trim()) {
            newErrors.ingredients = "Ingredients are required.";
        } else {
            const ingredientsList = ingredients.split("\n").filter((item) => item.trim() !== "");
            if (ingredientsList.length < 2) {
                newErrors.ingredients = "Please enter at least two ingredients.";
            }
        }
        if (!steps.trim()) {
            newErrors.steps = "Preparation steps are required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const newRecipe = {
            id: Date.now(),
            title,
            summary: steps.slice(0, 60) + "...",
            image: "https://via.placeholder.com/150",
            ingredients: ingredients.split("\n").filter((item) => item.trim() !== ""),
            instructions: steps.split("\n").filter((step) => step.trim() !== "")
        };

        console.log("New recipe added:", newRecipe);

        setTitle("");
        setIngredients("");
        setSteps("");
        setErrors({});
    };

    return (
        <div className="max-w-2xl mx-auto p-6 shadow-md bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
            >
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Recipe Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter recipe title"
                    />
                    {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block font-medium mb-1">Ingredients (one per line)</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 h-28 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter ingredients, one per line"
                    ></textarea>
                    {errors.ingredients && <p className="text-red-600 text-sm">{errors.ingredients}</p>}
                </div>

                {/* Steps */}
                <div>
                    <label className="block font-medium mb-1">Preparation Steps (one per line)</label>
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 h-28 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter preparation steps, one per line"
                    ></textarea>
                    {errors.steps && <p className="text-red-600 text-sm">{errors.steps}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Add Recipe
                </button>
            </form>
        </div>
    );
}

export default AddRecipeForm;
