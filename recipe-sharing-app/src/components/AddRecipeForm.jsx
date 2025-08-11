// src/components/AddRecipeForm.jsx
import { useState } from "react";
import { useRecipeStore } from "../store/recipeStore";

function AddRecipeForm() {
    const addRecipe = useRecipeStore((state) => state.addRecipe);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        addRecipe({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Recipe description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Add Recipe</button>
        </form>
    );
}

export default AddRecipeForm;
