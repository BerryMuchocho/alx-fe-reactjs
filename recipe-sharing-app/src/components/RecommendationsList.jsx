import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
    const recommendations = useRecipeStore((s) => s.recommendations);
    const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

    useEffect(() => {
        generateRecommendations();
    }, [generateRecommendations]);

    if (!recommendations.length) {
        return <p>No recommendations available yet.</p>;
    }

    return (
        <div>
            <h2>Recommended for You</h2>
            {recommendations.map((recipe) => (
                <div key={recipe.id}>
                    <h3>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </h3>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

export default RecommendationsList;
