// components/FormFavorites.js
import { useState } from 'react';

export default function FormFavorites({ onFilter, totalRecipes, filteredCount }) {
  const [formData, setFormData] = useState({
    cuisine: 'all',
    maxReadyTime: '',
    includeIngredients: '',
    sortBy: ''
  });

  const [dietFilters, setDietFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    ketogenic: false
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const cuisineOptions = [
    'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
    'Spanish', 'Thai', 'Vietnamese'
  ];

  const sortOptions = [
    { value: '', label: 'Default Order' },
    { value: 'title', label: 'Recipe Name (A-Z)' },
    { value: 'readyTime', label: 'Cooking Time (Shortest First)' },
    { value: 'healthScore', label: 'Health Score (Highest First)' }
  ];

  const timeOptions = [
    { value: '', label: 'Any Time' },
    { value: '15', label: 'Under 15 minutes' },
    { value: '30', label: 'Under 30 minutes' },
    { value: '45', label: 'Under 45 minutes' },
    { value: '60', label: 'Under 1 hour' },
    { value: '120', label: 'Under 2 hours' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    applyFilters(newFormData, dietFilters);
  };

  const handleDietChange = (e) => {
    const { name, checked } = e.target;
    const newDietFilters = {
      ...dietFilters,
      [name]: checked
    };
    setDietFilters(newDietFilters);
    applyFilters(formData, newDietFilters);
  };

  const applyFilters = (formFilters, dietaryFilters) => {
    const filters = {
      ...formFilters,
      diets: Object.entries(dietaryFilters)
        .filter(([_, checked]) => checked)
        .map(([diet, _]) => diet)
    };
    
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFormData = {
      cuisine: 'all',
      maxReadyTime: '',
      includeIngredients: '',
      sortBy: ''
    };
    
    const resetDietFilters = {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      ketogenic: false
    };
    
    setFormData(resetFormData);
    setDietFilters(resetDietFilters);
    applyFilters(resetFormData, resetDietFilters);
  };

  const hasActiveFilters = () => {
    return formData.cuisine !== 'all' ||
           formData.maxReadyTime !== '' ||
           formData.includeIngredients !== '' ||
           formData.sortBy !== '' ||
           Object.values(dietFilters).some(checked => checked);
  };

  return (
    <div className="favorites-filter-form">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Filter Your Favorites
          </h2>
          <p className="text-sm text-gray-600">
            {filteredCount} of {totalRecipes} recipes shown
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {hasActiveFilters() && (
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear All Filters
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Filters (Always Visible) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={formData.sortBy}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="maxReadyTime" className="block text-sm font-medium text-gray-700 mb-1">
            Cooking Time
          </label>
          <select
            id="maxReadyTime"
            name="maxReadyTime"
            value={formData.maxReadyTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {timeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
            Cuisine
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">All Cuisines</option>
            {cuisineOptions.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {/* Ingredient Search */}
          <div>
            <label htmlFor="includeIngredients" className="block text-sm font-medium text-gray-700 mb-2">
              Search by Ingredients
            </label>
            <input
              type="text"
              id="includeIngredients"
              name="includeIngredients"
              value={formData.includeIngredients}
              onChange={handleInputChange}
              placeholder="e.g., chicken, tomatoes, cheese"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Find recipes containing specific ingredients
            </p>
          </div>

          {/* Dietary Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Dietary Preferences
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(dietFilters).map(([diet, checked]) => (
                <label key={diet} className="flex items-center">
                  <input
                    type="checkbox"
                    name={diet}
                    checked={checked}
                    onChange={handleDietChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {diet === 'glutenFree' ? 'Gluten-Free' :
                     diet === 'dairyFree' ? 'Dairy-Free' :
                     diet.charAt(0).toUpperCase() + diet.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters() && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-800">
                    Active filters applied
                  </span>
                </div>
                <span className="text-sm text-blue-600">
                  {filteredCount} result{filteredCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

