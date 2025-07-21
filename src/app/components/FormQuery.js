// FORM FOR THE API QUERY
import { useState } from "react";

export default function FormQuery({ onSearch, loading }) {
	// BASE FORM OPTIONS
	const [formData, setFormData] = useState({
		query: "",
		cuisine: "",
		includeIngredients: "",
		excludeIngredients: "",
		diet: "",
		intolerances: "",
		maxReadyTime: "",
		minCalories: "",
		maxCalories: "",
		sort: "popularity",
	});

	// CUISINE OPTIONS
	const cuisineOptions = [
		"African",
		"American",
		"British",
		"Cajun",
		"Caribbean",
		"Chinese",
		"Eastern European",
		"European",
		"French",
		"German",
		"Greek",
		"Indian",
		"Irish",
		"Italian",
		"Japanese",
		"Jewish",
		"Korean",
		"Latin American",
		"Mediterranean",
		"Mexican",
		"Middle Eastern",
		"Nordic",
		"Southern",
		"Spanish",
		"Thai",
		"Vietnamese",
	];

	const dietOptions = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"];

	const intoleranceOptions = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];

	const sortOptions = [
		{ value: "popularity", label: "Popularity" },
		{ value: "healthiness", label: "Healthiness" },
		{ value: "price", label: "Price" },
		{ value: "time", label: "Cooking Time" },
		{ value: "random", label: "Random" },
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	
	const handleSubmit = (e) => {
		e.preventDefault();

		// BUILD SEARCH PARAMETERS
		const searchParams = {};

		// BASIC SEARCH QUERY
		if (formData.query.trim()) {
			searchParams.query = formData.query.trim();
		}

		// CUISINE
		if (formData.cuisine) {
			searchParams.cuisine = formData.cuisine;
		}

		// INGREDIENTS
		if (formData.includeIngredients.trim()) {
			searchParams.includeIngredients = formData.includeIngredients.trim();
		}

		if (formData.excludeIngredients.trim()) {
			searchParams.excludeIngredients = formData.excludeIngredients.trim();
		}

		// DIET
		if (formData.diet) {
			searchParams.diet = formData.diet;
		}

		// INTOLERANCES
		if (formData.intolerances) {
			searchParams.intolerances = formData.intolerances;
		}

		// TIME AND CALORIES
		if (formData.maxReadyTime) {
			searchParams.maxReadyTime = formData.maxReadyTime;
		}

		if (formData.minCalories) {
			searchParams.minCalories = formData.minCalories;
		}

		if (formData.maxCalories) {
			searchParams.maxCalories = formData.maxCalories;
		}


		// SORT
		searchParams.sort = formData.sort;

		onSearch(searchParams);
	};

	const handleReset = () => {
		setFormData({
			query: "",
			cuisine: "",
			includeIngredients: "",
			excludeIngredients: "",
			diet: "",
			intolerances: "",
			maxReadyTime: "",
			minCalories: "",
			maxCalories: "",
			sort: "popularity",
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6"
		>
			<div className="text-center mb-6">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">Find Your Perfect Recipe</h2>
				<p className="text-gray-600 text-sm">Use the filters below to discover recipes that match your preferences</p>
			</div>

			{/* Main Search */}
			<div>
				<label
					htmlFor="query"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Search Recipes
				</label>
				<input
					type="text"
					id="query"
					name="query"
					value={formData.query}
					onChange={handleInputChange}
					placeholder="e.g., pasta, chicken, chocolate cake..."
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				/>
			</div>

			{/* Two Column Layout for Filters */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Left Column */}
				<div className="space-y-4">
					{/* Cuisine */}
					<div>
						<label
							htmlFor="cuisine"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Cuisine Type
						</label>
						<select
							id="cuisine"
							name="cuisine"
							value={formData.cuisine}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">Any Cuisine</option>
							{cuisineOptions.map((cuisine) => (
								<option
									key={cuisine}
									value={cuisine}
								>
									{cuisine}
								</option>
							))}
						</select>
					</div>

					{/* Include Ingredients */}
					<div>
						<label
							htmlFor="includeIngredients"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Include Ingredients
						</label>
						<input
							type="text"
							id="includeIngredients"
							name="includeIngredients"
							value={formData.includeIngredients}
							onChange={handleInputChange}
							placeholder="e.g., tomatoes, cheese, basil"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<p className="text-xs text-gray-500 mt-1">Separate multiple ingredients with commas</p>
					</div>

					{/* Exclude Ingredients */}
					<div>
						<label
							htmlFor="excludeIngredients"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Exclude Ingredients
						</label>
						<input
							type="text"
							id="excludeIngredients"
							name="excludeIngredients"
							value={formData.excludeIngredients}
							onChange={handleInputChange}
							placeholder="e.g., nuts, shellfish"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-4">
					{/* Diet */}
					<div>
						<label
							htmlFor="diet"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Diet Type
						</label>
						<select
							id="diet"
							name="diet"
							value={formData.diet}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">Any Diet</option>
							{dietOptions.map((diet) => (
								<option
									key={diet}
									value={diet}
								>
									{diet}
								</option>
							))}
						</select>
					</div>

					{/* Intolerances */}
					<div>
						<label
							htmlFor="intolerances"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Food Intolerances
						</label>
						<select
							id="intolerances"
							name="intolerances"
							value={formData.intolerances}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">No Restrictions</option>
							{intoleranceOptions.map((intolerance) => (
								<option
									key={intolerance}
									value={intolerance}
								>
									{intolerance}
								</option>
							))}
						</select>
					</div>

					{/* Max Ready Time */}
					<div>
						<label
							htmlFor="maxReadyTime"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Max Cooking Time (minutes)
						</label>
						<input
							type="number"
							id="maxReadyTime"
							name="maxReadyTime"
							value={formData.maxReadyTime}
							onChange={handleInputChange}
							placeholder="e.g., 30"
							min="1"
							max="300"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
				</div>
			</div>


			{/* Calories Range */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="minCalories"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Min Calories
					</label>
					<input
						type="number"
						id="minCalories"
						name="minCalories"
						value={formData.minCalories}
						onChange={handleInputChange}
						placeholder="e.g., 200"
						min="0"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="maxCalories"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Max Calories
					</label>
					<input
						type="number"
						id="maxCalories"
						name="maxCalories"
						value={formData.maxCalories}
						onChange={handleInputChange}
						placeholder="e.g., 800"
						min="0"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
			</div>

			{/* Sort Options */}
			<div>
				<label
					htmlFor="sort"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Sort Results By
				</label>
				<select
					id="sort"
					name="sort"
					value={formData.sort}
					onChange={handleInputChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				>
					{sortOptions.map((option) => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</select>
			</div>

			{/* Action Buttons */}
			<div className="flex gap-4 pt-4">
				<button
					type="submit"
					disabled={loading}
					className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
				>
					{loading ? "Searching..." : "Search Recipes"}
				</button>
				<button
					type="button"
					onClick={handleReset}
					className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
				>
					Reset
				</button>
			</div>
		</form>
	);
}
