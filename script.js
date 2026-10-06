// DOM Elements
const searchBox = document.querySelector(".searchBox");
const searchForm = document.querySelector("#searchForm");
const recipeContainer = document.querySelector(".recipe-container");
const categoryFilter = document.querySelector("#categoryFilter");
const allBtn = document.querySelector("#allBtn");
const clearBtn = document.querySelector("#clearBtn");
const surpriseBtn = document.querySelector("#surpriseBtn");
const popularButtons = document.querySelectorAll(".popular-btn");
const resultsTitle = document.querySelector("#resultsTitle");
const recipeCount = document.querySelector("#recipeCount");
const popupOverlay = document.querySelector("#popupOverlay");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// API
const API = "https://www.themealdb.com/api/json/v1/1";

// Show loading
const showLoading = (message = "Loading recipes...") => {
    recipeContainer.innerHTML = `<div class="loader">${message}</div>`;
    recipeCount.textContent = "";
};

// Show error
const showError = (error) => {
    console.error(error);
    recipeContainer.innerHTML = `
        <div class="message">
            Unable to load recipes. Please try again.
        </div>
    `;
    recipeCount.textContent = "";
};

// Display recipes
const displayRecipes = (meals, title = "Recipes") => {
    recipeContainer.innerHTML = "";
    resultsTitle.textContent = title;

    if (!meals || meals.length === 0) {
        recipeContainer.innerHTML = `<div class="message">No recipes found.</div>`;
        recipeCount.textContent = "0 recipes";
        return;
    }

    recipeCount.textContent = `${meals.length} ${meals.length === 1 ? "recipe" : "recipes"}`;

    meals.forEach((meal) => {
        const recipe = document.createElement("article");
        recipe.classList.add("recipe");

        recipe.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">

            <div class="recipe-content">
                <h3>${meal.strMeal}</h3>

                ${
                    meal.strArea
                        ? `<p>Cuisine: <span>${meal.strArea}</span></p>`
                        : ""
                }

                ${
                    meal.strCategory
                        ? `<p>Category: <span>${meal.strCategory}</span></p>`
                        : ""
                }

                <button type="button" class="view-recipe-btn">
                    View Recipe
                </button>
            </div>
        `;

        recipe.querySelector(".view-recipe-btn").addEventListener("click", () => {
            loadRecipeDetails(meal.idMeal);
        });

        recipeContainer.appendChild(recipe);
    });
};

// Homepage recipes
const loadHomeRecipes = async () => {
    showLoading("Discovering delicious recipes...");
    resultsTitle.textContent = "Discover Recipes";

    try {
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

        const requests = letters.map((letter) =>
            fetch(`${API}/search.php?f=${letter}`).then((response) => {
                if (!response.ok) {
                    throw new Error("Homepage request failed.");
                }

                return response.json();
            })
        );

        const results = await Promise.all(requests);

        let meals = [];

        results.forEach((result) => {
            if (result.meals) {
                meals.push(...result.meals);
            }
        });

        // Remove duplicate recipes
        meals = [...new Map(meals.map((meal) => [meal.idMeal, meal])).values()];

        displayRecipes(meals, "Discover Recipes");
    } catch (error) {
        showError(error);
    }
};

// Search recipe
const searchRecipes = async (query) => {
    showLoading(`Searching for "${query}"...`);

    try {
        const response = await fetch(
            `${API}/search.php?s=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Search request failed.");
        }

        const data = await response.json();

        displayRecipes(data.meals, `Search Results for "${query}"`);
    } catch (error) {
        showError(error);
    }
};

// Filter by category
const loadByCategory = async (category) => {
    showLoading(`Loading ${category} recipes...`);
    resultsTitle.textContent = `${category} Recipes`;

    try {
        const response = await fetch(
            `${API}/filter.php?c=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
            throw new Error("Category request failed.");
        }

        const data = await response.json();

        displayRecipes(data.meals, `${category} Recipes`);
    } catch (error) {
        showError(error);
    }
};

// Random recipe
const loadRandomRecipe = async () => {
    resetSelection();
    allBtn.classList.remove("active-filter");

    showLoading("Choosing a surprise recipe...");

    try {
        const response = await fetch(`${API}/random.php`);

        if (!response.ok) {
            throw new Error("Random recipe request failed.");
        }

        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
            displayRecipes(data.meals, "Surprise Recipe 🎲");
            openRecipePopup(data.meals[0]);
        }
    } catch (error) {
        showError(error);
    }
};

// Load full recipe details
const loadRecipeDetails = async (mealId) => {
    try {
        const response = await fetch(`${API}/lookup.php?i=${mealId}`);

        if (!response.ok) {
            throw new Error("Recipe details request failed.");
        }

        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
            openRecipePopup(data.meals[0]);
        }
    } catch (error) {
        console.error("Recipe details error:", error);
    }
};

// Create ingredients list
const getIngredients = (meal) => {
    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients += `
                <li>
                    ${measure ? measure.trim() : ""} ${ingredient.trim()}
                </li>
            `;
        }
    }

    return ingredients;
};

// Open recipe popup
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>

        <div class="recipe-meta">
            ${meal.strArea ? `${meal.strArea} Cuisine` : ""}
            ${meal.strArea && meal.strCategory ? " • " : ""}
            ${meal.strCategory || ""}
        </div>

        <h3>Ingredients</h3>

        <ul class="ingredientList">
            ${getIngredients(meal)}
        </ul>

        <div class="recipeInstructions">
            <h3>Instructions</h3>
            <p>${meal.strInstructions || "Instructions are not available."}</p>
        </div>
    `;

    popupOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
};

// Close popup
const closePopup = () => {
    popupOverlay.style.display = "none";
    document.body.style.overflow = "auto";
};

// Remove active state from popular buttons
const clearPopularSelection = () => {
    popularButtons.forEach((button) => {
        button.classList.remove("active-popular");
    });
};

// Reset search/category selection
const resetSelection = () => {
    categoryFilter.value = "";
    searchBox.value = "";
    clearPopularSelection();
};

// Search form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchBox.value.trim();

    if (!query) {
        return;
    }

    categoryFilter.value = "";
    clearPopularSelection();
    allBtn.classList.remove("active-filter");

    searchRecipes(query);
});

// Category filter
categoryFilter.addEventListener("change", () => {
    const category = categoryFilter.value;

    searchBox.value = "";
    clearPopularSelection();

    if (!category) {
        allBtn.classList.add("active-filter");
        loadHomeRecipes();
        return;
    }

    allBtn.classList.remove("active-filter");
    loadByCategory(category);
});

// All button
allBtn.addEventListener("click", () => {
    resetSelection();
    allBtn.classList.add("active-filter");
    loadHomeRecipes();
});

// Clear button
clearBtn.addEventListener("click", () => {
    resetSelection();
    allBtn.classList.add("active-filter");
    loadHomeRecipes();
});

// Popular category buttons
popularButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        searchBox.value = "";
        clearPopularSelection();

        button.classList.add("active-popular");
        categoryFilter.value = category;
        allBtn.classList.remove("active-filter");

        loadByCategory(category);
    });
});

// Surprise Me
surpriseBtn.addEventListener("click", loadRandomRecipe);

// Close popup
recipeCloseBtn.addEventListener("click", closePopup);

// Close popup when clicking outside
popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
        closePopup();
    }
});

// Close popup using Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closePopup();
    }
});

// Start application
loadHomeRecipes();