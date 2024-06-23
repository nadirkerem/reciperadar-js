import { fetchCategoryRecipes } from './fetch.js';

const recipeCardsContainer = document.querySelector('#recipe-cards-container');

export function displayRecipes(recipe) {
  const {
    strMeal,
    strMealThumb,
    strArea,
    strCategory,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strYoutube,
  } = recipe;

  const cardTemplate = document.createElement('div');
  cardTemplate.className = 'overflow-hidden shadow-lg flex flex-col';
  cardTemplate.innerHTML = `
            <div class="relative">
              <img class="w-full" src=${strMealThumb} alt=${strMeal}>
              <div
                class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
              </div>
              <button
                class="text-xs absolute top-0 right-0 bg-orange-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-orange-600 transition duration-300">
                ${strArea}
              </button>
              <button
                class="text-xs absolute top-0 left-0 bg-orange-600 px-4 py-2 text-white mt-3 ml-3 hover:bg-white hover:text-orange-600 transition duration-300">
                ${strCategory}
              </button>
            </div>
            <div class="px-6 py-4 mb-auto">
              <a href="#"
                class="font-medium text-lg hover:text-orange-600 transition duration-300 inline-block mb-2">${strMeal}</a>
              <p class="text-gray-500 text-sm">
                ${strIngredient1}, ${strIngredient2}, ${strIngredient3}, ${strIngredient4}, ${strIngredient5}...
              </p>
              <p class="text-gray-500 text-sm mt-3">
                ${strInstructions.slice(0, 150)}...
              </p>
            </div>
            <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <button
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 transition duration-300">
                See Full Recipe
              </button>
              <a href=${strYoutube} target="_blank"
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 transition duration-300">
                Watch Tutorial <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
          `;
  recipeCardsContainer.appendChild(cardTemplate);
}

export function displayCategories(category) {
  const { strCategory, strCategoryThumb, strCategoryDescription } = category;

  const cardTemplate = document.createElement('div');
  cardTemplate.className = 'overflow-hidden shadow-lg flex flex-col';
  cardTemplate.innerHTML = `
            <div class="relative">
              <img class="w-full" src=${strCategoryThumb} alt=${strCategory}>
              <div
                class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
              </div>
            </div>
            <div class="px-6 py-4 mb-auto">
              <a href="#"
                class="font-medium text-lg hover:text-orange-600 transition duration-300 inline-block mb-2">${strCategory}</a>
              <p class="text-gray-500 text-sm">
                ${strCategoryDescription.slice(0, 200)}...
              </p>
            </div>
            <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <button
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 transition duration-300 see-recipes-button">
                See Recipes for ${strCategory}
              </button>
            </div>
          `;
  recipeCardsContainer.appendChild(cardTemplate);

  const seeRecipesButtons = cardTemplate.querySelectorAll(
    '.see-recipes-button'
  );
  seeRecipesButtons.forEach((button) => {
    button.addEventListener('click', () => fetchCategoryRecipes(strCategory));
  });
}

export function displayRecipesByCategories(recipe) {
  const { strMeal, strMealThumb } = recipe;

  const cardTemplate = document.createElement('div');
  cardTemplate.className = 'overflow-hidden shadow-lg flex flex-col';
  cardTemplate.innerHTML = `
            <div class="relative">
              <img class="w-full" src=${strMealThumb} alt=${strMeal}>
              <div
                class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
              </div>
            </div>
            <div class="px-6 py-4 mb-auto">
              <a href="#"
                class="font-medium text-lg hover:text-orange-600 transition duration-300 inline-block mb-2">${strMeal}</a>
            </div>
            <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <button
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 transition duration-300">
                See Full Recipe
              </button>
            </div>
          `;
  recipeCardsContainer.appendChild(cardTemplate);

  const seeRecipesButtons = cardTemplate.querySelectorAll(
    '.see-recipes-button'
  );
  seeRecipesButtons.forEach((button) => {
    button.addEventListener('click', () => fetchCategoryRecipes(strCategory));
  });
}
