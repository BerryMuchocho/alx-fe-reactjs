import React from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
    const favorites = useRecipeStore((state) =>
        state.favorites.map((id) => state.recipes.find((recipe) => recipe.id === id))
    );

    if (!favorites.length) {
        return <p>No favorite recipes yet.</p>;
    }

    return (
        <div>
            <h2>My Favorites</h2>
            {favorites.map(
                (recipe) =>
                    recipe && (
                        <div key={recipe.id}>
                            <h3>
                                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                            </h3>
                            <p>{recipe.description}</p>
                        </div>
                    )
            )}
        </div>
    );
};

export default FavoritesList;
