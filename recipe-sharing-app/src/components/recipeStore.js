import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const term = searchTerm.trim().toLowerCase();

    const filtered = term
      ? recipes.filter((r) =>
          (r.title || '').toLowerCase().includes(term)
        )
      : recipes;

    set({ filteredRecipes: filtered });
  },

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  setRecipes: (recipes) => set({ recipes }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter(
        (recipe) => recipe.id !== id
      );

      const term = state.searchTerm.trim().toLowerCase();
      const filtered = term
        ? recipes.filter((r) =>
            (r.title || '').toLowerCase().includes(term)
          )
        : recipes;

      return { recipes, filteredRecipes: filtered };
    }),

  // ⭐ Favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // 🔮 Recommendations (mock based on favorites)
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(
      (recipe) =>
        favorites.includes(recipe.id) && Math.random() > 0.5
    );

    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;
