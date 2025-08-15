import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();
    return <div>Recipe Detail for ID: {id}</div>;
};

export default RecipeDetail;

