"use client"

// IMPORTS
import { useState, useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import FormFavorites from '../components/FormFavorites';
import RecipeList from '../components/RecipeList';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    setFilteredRecipes(favorites);
  }, [favorites]);

  const handleFilter = (filters) => {
    setActiveFilters(filters);
    let filtered = [...favorites];

    // Apply cuisine filter
    if (filters.cuisine && filters.cuisine !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.cuisines && recipe.cuisines.some(cuisine => 
          cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())
        )
      );
    }

    // Apply diet filters
    if (filters.diets && filters.diets.length > 0) {
      filtered = filtered.filter(recipe => 
        recipe.diets && filters.diets.every(diet => 
          recipe.diets.some(recipeDiet => 
            recipeDiet.toLowerCase().includes(diet.toLowerCase())
          )
        )
      );
    }

    // Apply ready time filter
    if (filters.maxReadyTime) {
      filtered = filtered.filter(recipe => 
        recipe.readyInMinutes <= filters.maxReadyTime
      );
    }

    // Apply ingredient search
    if (filters.includeIngredients) {
      const searchTerms = filters.includeIngredients.toLowerCase().split(',').map(term => term.trim());
      filtered = filtered.filter(recipe => 
        recipe.extendedIngredients && searchTerms.some(term =>
          recipe.extendedIngredients.some(ingredient =>
            ingredient.name.toLowerCase().includes(term)
          )
        )
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'readyTime':
            return a.readyInMinutes - b.readyInMinutes;
          case 'title':
            return a.title.localeCompare(b.title);
          case 'healthScore':
            return (b.healthScore || 0) - (a.healthScore || 0);
          default:
            return 0;
        }
      });
    }

    setFilteredRecipes(filtered);
  };

  const handleRemoveFavorite = (recipe) => {
    removeFromFavorites(recipe.id);
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      favorites.forEach(recipe => removeFromFavorites(recipe.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Favorite Recipes
          </h1>
          <p className="text-gray-600">
            Your saved recipes, ready for cooking
          </p>
          {favorites.length > 0 && (
            <div className="mt-4 flex justify-center items-center gap-4">
              <span className="text-sm text-gray-500">
                {favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved
              </span>
              <button
                onClick={clearAllFavorites}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Clear All
              </button>
            </div>
          )}
        </header>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Favorites Yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start exploring recipes and save your favorites to see them here!
            </p>
            <a
              href="/query"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Discover Recipes
            </a>
          </div>
        ) : (
          <>
            {/* Filter Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <FormFavorites 
                onFilter={handleFilter} 
                totalRecipes={favorites.length}
                filteredCount={filteredRecipes.length}
              />
            </div>

            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredRecipes.length} of {favorites.length} favorite recipes
              </p>
              {Object.keys(activeFilters).length > 0 && (
                <button
                  onClick={() => {
                    setActiveFilters({});
                    setFilteredRecipes(favorites);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Recipe List */}
            <RecipeList 
              recipes={filteredRecipes}
              favorites={favorites}
              onToggleFavorite={handleRemoveFavorite}
              showFavoriteButton={false}
              showCookingModal={true}
            />

            {/* No Results After Filtering */}
            {filteredRecipes.length === 0 && favorites.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No recipes match your current filters. Try adjusting your criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

