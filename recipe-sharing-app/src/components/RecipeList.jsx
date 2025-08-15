import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
    const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
    const allRecipes = useRecipeStore((s) => s.recipes);
    const searchTerm = useRecipeStore((s) => s.searchTerm);
    const filterRecipes = useRecipeStore((s) => s.filterRecipes);

    useEffect(() => {
        filterRecipes();
    }, [searchTerm, allRecipes, filterRecipes]);

    if (!filteredRecipes.length) {
        return <p>No recipes match your search.</p>;
    }

    return (
        <ul>
            {filteredRecipes.map((r) => (
                <li key={r.id}>{r.title}</li>
            ))}
        </ul>
    );
};

export default RecipeList;


