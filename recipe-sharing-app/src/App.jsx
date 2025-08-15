import React from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

export default function App() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
    </main>
  );
}
