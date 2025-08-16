import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
    const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
    const allRecipes = useRecipeStore((s) => s.recipes);
    const searchTerm = useRecipeStore((s) => s.searchTerm);
    const filterRecipes = useRecipeStore((s) => s.filterRecipes);

    const favorites = useRecipeStore((s) => s.favorites);
    const addFavorite = useRecipeStore((s) => s.addFavorite);
    const removeFavorite = useRecipeStore((s) => s.removeFavorite);

    useEffect(() => {
        filterRecipes();
    }, [searchTerm, allRecipes, filterRecipes]);

    if (!filteredRecipes.length) {
        return <p>No recipes match your search.</p>;
    }

    return (
        <ul>
            {filteredRecipes.map((r) => {
                const isFavorite = favorites.includes(r.id);
                return (
                    <li key={r.id}>
                        <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                        <button onClick={() => (isFavorite ? removeFavorite(r.id) : addFavorite(r.id))}>
                            {isFavorite ? '★ Remove Favorite' : '☆ Add Favorite'}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default RecipeList;




