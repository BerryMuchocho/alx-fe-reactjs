import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
    recipes: [],

    // NEW: search + filtered results
    searchTerm: '',
    filteredRecipes: [],

    // NEW: update the search term and immediately recompute filtered
    setSearchTerm: (term) => {
        set({ searchTerm: term });
        get().filterRecipes();
    },

    // NEW: compute filtered recipes based on current searchTerm
    filterRecipes: () => {
        const { recipes, searchTerm } = get();
        const term = searchTerm.trim().toLowerCase();

        const filtered = term
            ? recipes.filter((r) => (r.title || '').toLowerCase().includes(term))
            : recipes;

        set({ filteredRecipes: filtered });
    },

    // Keep filtered in sync when adding a recipe
    addRecipe: (newRecipe) =>
        set((state) => {
            const recipes = [...state.recipes, newRecipe];
            const term = state.searchTerm.trim().toLowerCase();
            const filtered = term
                ? recipes.filter((r) => (r.title || '').toLowerCase().includes(term))
                : recipes;
            return { recipes, filteredRecipes: filtered };
        }),

    // Keep filtered in sync when deleting a recipe
    deleteRecipe: (id) =>
        set((state) => {
            const recipes = state.recipes.filter((recipe) => recipe.id !== id);
            const term = state.searchTerm.trim().toLowerCase();
            const filtered = term
                ? recipes.filter((r) => (r.title || '').toLowerCase().includes(term))
                : recipes;
            return { recipes, filteredRecipes: filtered };
        }),
}));
