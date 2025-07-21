// utils/utils.js

/**
 * Format cooking time from minutes to human-readable string
 * @param {number} minutes - Time in minutes
 * @returns {string} Formatted time string
 */
export const formatCookingTime = (minutes) => {
	if (!minutes || minutes <= 0) return "N/A";

	if (minutes < 60) {
		return `${minutes} min`;
	}

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (remainingMinutes === 0) {
		return `${hours}h`;
	}

	return `${hours}h ${remainingMinutes}m`;
};

/**
 * Format price per serving
 * @param {number} priceInCents - Price in cents
 * @returns {string} Formatted price string
 */
export const formatPrice = (priceInCents) => {
	if (!priceInCents || priceInCents <= 0) return "N/A";

	const dollars = priceInCents / 100;
	return `$${dollars.toFixed(2)}`;
};

/**
 * Get diet badges for a recipe
 * @param {Object} recipe - Recipe object
 * @returns {Array} Array of diet badge strings
 */
export const getDietBadges = (recipe) => {
	const badges = [];

	if (recipe.vegetarian) badges.push("Vegetarian");
	if (recipe.vegan) badges.push("Vegan");
	if (recipe.glutenFree) badges.push("Gluten-Free");
	if (recipe.dairyFree) badges.push("Dairy-Free");
	if (recipe.ketogenic) badges.push("Keto");
	if (recipe.paleo) badges.push("Paleo");
	if (recipe.lowFodmap) badges.push("Low FODMAP");
	if (recipe.sustainable) badges.push("Sustainable");

	return badges;
};

/**
 * Clean HTML tags from text
 * @param {string} html - HTML string
 * @returns {string} Clean text
 */
export const stripHtmlTags = (html) => {
	if (!html) return "";
	return html.replace(/<[^>]*>/g, "");
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
	if (!text) return "";

	const cleanText = stripHtmlTags(text);

	if (cleanText.length <= maxLength) {
		return cleanText;
	}

	return cleanText.substring(0, maxLength).trim() + "...";
};

/**
 * Get recipe difficulty based on ready time and ingredient count
 * @param {Object} recipe - Recipe object
 * @returns {string} Difficulty level
 */
export const getRecipeDifficulty = (recipe) => {
	const readyTime = recipe.readyInMinutes || 0;
	const ingredientCount = recipe.extendedIngredients?.length || 0;

	// Simple scoring system
	let score = 0;

	if (readyTime > 120) score += 2;
	else if (readyTime > 60) score += 1;

	if (ingredientCount > 15) score += 2;
	else if (ingredientCount > 10) score += 1;

	if (score >= 3) return "Hard";
	if (score >= 1) return "Medium";
	return "Easy";
};

/**
 * Generate recipe URL slug
 * @param {string} title - Recipe title
 * @param {number} id - Recipe ID
 * @returns {string} URL slug
 */
export const generateRecipeSlug = (title, id) => {
	const slug = title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim("-");

	return `${slug}-${id}`;
};

/**
 * Calculate recipe score based on various factors
 * @param {Object} recipe - Recipe object
 * @returns {number} Score out of 100
 */
export const calculateRecipeScore = (recipe) => {
	let score = 0;
	let factors = 0;

	// Health score (30% weight)
	if (recipe.healthScore) {
		score += recipe.healthScore * 0.3;
		factors += 0.3;
	}

	// Spoonacular score (25% weight)
	if (recipe.spoonacularScore) {
		score += recipe.spoonacularScore * 0.25;
		factors += 0.25;
	}

	// Likes (20% weight) - normalize to 0-100 scale
	if (recipe.aggregateLikes) {
		const likesScore = Math.min(recipe.aggregateLikes / 10, 100);
		score += likesScore * 0.2;
		factors += 0.2;
	}

	// Ready time bonus (15% weight) - shorter is better
	if (recipe.readyInMinutes) {
		const timeScore = Math.max(0, 100 - recipe.readyInMinutes / 2);
		score += timeScore * 0.15;
		factors += 0.15;
	}

	// Price bonus (10% weight) - cheaper is better
	if (recipe.pricePerServing) {
		const priceScore = Math.max(0, 100 - recipe.pricePerServing / 10);
		score += priceScore * 0.1;
		factors += 0.1;
	}

	return factors > 0 ? Math.round(score / factors) : 50;
};

/**
 * Group recipes by cuisine
 * @param {Array} recipes - Array of recipes
 * @returns {Object} Recipes grouped by cuisine
 */
export const groupRecipesByCuisine = (recipes) => {
	return recipes.reduce((groups, recipe) => {
		const cuisines = recipe.cuisines || ["Other"];

		cuisines.forEach((cuisine) => {
			if (!groups[cuisine]) {
				groups[cuisine] = [];
			}
			groups[cuisine].push(recipe);
		});

		return groups;
	}, {});
};

/**
 * Filter recipes by dietary restrictions
 * @param {Array} recipes - Array of recipes
 * @param {Array} restrictions - Array of dietary restrictions
 * @returns {Array} Filtered recipes
 */
export const filterRecipesByDiet = (recipes, restrictions) => {
	if (!restrictions || restrictions.length === 0) {
		return recipes;
	}

	return recipes.filter((recipe) => {
		return restrictions.every((restriction) => {
			switch (restriction.toLowerCase()) {
				case "vegetarian":
					return recipe.vegetarian;
				case "vegan":
					return recipe.vegan;
				case "gluten-free":
				case "glutenfree":
					return recipe.glutenFree;
				case "dairy-free":
				case "dairyfree":
					return recipe.dairyFree;
				case "ketogenic":
				case "keto":
					return recipe.ketogenic;
				case "paleo":
					return recipe.paleo;
				case "low-fodmap":
				case "lowfodmap":
					return recipe.lowFodmap;
				default:
					return true;
			}
		});
	});
};

/**
 * Sort recipes by specified criteria
 * @param {Array} recipes - Array of recipes
 * @param {string} sortBy - Sort criteria
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted recipes
 */
export const sortRecipes = (recipes, sortBy, order = "asc") => {
	const sortedRecipes = [...recipes];

	sortedRecipes.sort((a, b) => {
		let valueA, valueB;

		switch (sortBy) {
			case "title":
				valueA = a.title.toLowerCase();
				valueB = b.title.toLowerCase();
				break;
			case "readyTime":
				valueA = a.readyInMinutes || 0;
				valueB = b.readyInMinutes || 0;
				break;
			case "healthScore":
				valueA = a.healthScore || 0;
				valueB = b.healthScore || 0;
				break;
			case "likes":
				valueA = a.aggregateLikes || 0;
				valueB = b.aggregateLikes || 0;
				break;
			case "price":
				valueA = a.pricePerServing || 0;
				valueB = b.pricePerServing || 0;
				break;
			case "score":
				valueA = calculateRecipeScore(a);
				valueB = calculateRecipeScore(b);
				break;
			default:
				return 0;
		}

		if (typeof valueA === "string") {
			return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
		}

		return order === "asc" ? valueA - valueB : valueB - valueA;
	});

	return sortedRecipes;
};

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
	let timeout;

	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

/**
 * Generate shopping list from recipes
 * @param {Array} recipes - Array of recipes
 * @returns {Array} Shopping list items
 */
export const generateShoppingList = (recipes) => {
	const ingredientMap = new Map();

	recipes.forEach((recipe) => {
		if (recipe.extendedIngredients) {
			recipe.extendedIngredients.forEach((ingredient) => {
				const key = ingredient.name.toLowerCase();

				if (ingredientMap.has(key)) {
					const existing = ingredientMap.get(key);
					// Simple quantity addition (this could be more sophisticated)
					existing.amount += ingredient.amount || 0;
					existing.recipes.push(recipe.title);
				} else {
					ingredientMap.set(key, {
						name: ingredient.name,
						amount: ingredient.amount || 0,
						unit: ingredient.unit || "",
						aisle: ingredient.aisle || "Other",
						recipes: [recipe.title],
					});
				}
			});
		}
	});

	return Array.from(ingredientMap.values()).sort((a, b) => a.aisle.localeCompare(b.aisle));
};

/**
 * Validate environment variables
 * @returns {Object} Validation result
 */
export const validateEnvironment = () => {
	const requiredVars = ["NEXT_PUBLIC_SPOONACULAR_API_KEY"];
	const missing = [];

	requiredVars.forEach((varName) => {
		if (!process.env[varName]) {
			missing.push(varName);
		}
	});

	return {
		isValid: missing.length === 0,
		missing,
	};
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
	get: (key, defaultValue = null) => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.error(`Error reading from localStorage (${key}):`, error);
			return defaultValue;
		}
	},

	set: (key, value) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.error(`Error writing to localStorage (${key}):`, error);
			return false;
		}
	},

	remove: (key) => {
		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			console.error(`Error removing from localStorage (${key}):`, error);
			return false;
		}
	},
};
