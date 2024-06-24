import { fetchCategoryRecipes, fetchRecipeDetails } from './fetch.js';
import {
  addRecipeToLocalStorage,
  removeRecipeFromLocalStorage,
  favoriteRecipes,
  resetDisplay,
} from './utils.js';

const pageContent = document.querySelector('#page-content');
const recipeCardsContainer = document.querySelector('#recipe-cards-container');

const recipesPerPage = 6;
export let currentPage = 1;

export function createCardTemplate(recipe) {
  const {
    idMeal,
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

  const isFavorite = favoriteRecipes().includes(idMeal);

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
                class="text-xs absolute top-0 left-0 bg-orange-600 px-4 py-2 text-white mt-3 ml-3 hover:bg-white hover:text-orange-600 transition duration-300 category-button">
                ${strCategory}
              </button>
            ${
              isFavorite
                ? `<button class="text-4xl absolute bottom-0 right-0 text-orange-500 mb-3 mr-3 hover:text-orange-400 transition duration-300"><i class="fa-solid fa-star"></i></button>`
                : ''
            }
            </div>
            <div class="px-6 py-4 mb-auto">
              <button
                class="font-medium text-lg hover:text-orange-600 transition duration-300 inline-block mb-2 see-recipe-button">${strMeal}</button>
              <p class="text-gray-500 text-sm">
                ${strIngredient1}, ${strIngredient2}, ${strIngredient3}, ${strIngredient4}, ${strIngredient5}...
              </p>
              <p class="text-gray-500 text-sm mt-3">
                ${strInstructions.slice(0, 150)}...
              </p>
            </div>
            <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <button
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300 see-recipe-button">
                See Full Recipe
              </button>
              <a href=${strYoutube} target="_blank"
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300">
                Watch Tutorial <i class="fab fa-youtube"></i>
              </a>
            </div>
          `;
  return cardTemplate;
}

export function displayRecipes(recipesArray, pageNumber = 1) {
  recipeCardsContainer.innerHTML = '';
  const start = (pageNumber - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  const paginatedRecipes = recipesArray.slice(start, end);
  paginatedRecipes.forEach((recipe) => {
    const cardTemplate = createCardTemplate(recipe);
    cardTemplate.querySelectorAll('.see-recipe-button').forEach((button) => {
      button.addEventListener('click', () => {
        fetchRecipeDetails(recipe.idMeal);
      });
    });
    cardTemplate
      .querySelector('.category-button')
      .addEventListener('click', () => {
        fetchCategoryRecipes(recipe.strCategory);
      });
    recipeCardsContainer.appendChild(cardTemplate);
  });
  createPaginationButtons(recipesArray, 'search');
}

export function createPaginationButtons(recipesArray, type) {
  const numberOfPages = Math.ceil(recipesArray.length / recipesPerPage);
  const paginationContainer = document.querySelector('#pagination-container');

  paginationContainer.innerHTML = '';

  if (numberOfPages === 1) return;

  for (let i = 1; i <= numberOfPages; i++) {
    const button = document.createElement('button');
    button.className = `px-3 py-2 text-sm font-medium text-center  rounded-lg transition-all duration-300 ring-1 ring-inset ring-gray-300 ${
      currentPage === i
        ? 'bg-orange-600 hover:bg-orange-700 text-white'
        : 'hover:bg-gray-50 text-orange-600'
    }`;
    button.textContent = i;
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage = i;
      if (type === 'search') {
        displayRecipes(recipesArray, i);
      } else if (type === 'categories') {
        displayRecipesByCategories(recipesArray, i);
      }
    });
    paginationContainer.appendChild(button);
  }
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
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300 see-recipes-button">
                See Recipes for ${strCategory}
              </button>
            </div>
          `;
  recipeCardsContainer.appendChild(cardTemplate);

  const seeRecipesButtons = cardTemplate.querySelectorAll(
    '.see-recipes-button'
  );
  seeRecipesButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchCategoryRecipes(strCategory);
    });
  });
}

export function displayRecipesByCategories(recipesArray, pageNumber = 1) {
  recipeCardsContainer.innerHTML = '';
  const start = (pageNumber - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  const paginatedRecipes = recipesArray.slice(start, end);
  paginatedRecipes.forEach((recipe) => {
    const cardTemplate = createCardCategoryRecipeTemplate(recipe);
    cardTemplate
      .querySelector('.see-recipe-button')
      .addEventListener('click', () => {
        fetchRecipeDetails(recipe.idMeal);
      });
    recipeCardsContainer.appendChild(cardTemplate);
  });
  createPaginationButtons(recipesArray, 'categories');
}

export function createCardCategoryRecipeTemplate(recipe) {
  const { idMeal, strMeal, strMealThumb } = recipe;

  const cardTemplate = document.createElement('div');
  cardTemplate.className = 'overflow-hidden shadow-lg flex flex-col';
  const isFavorite = favoriteRecipes().includes(idMeal);
  cardTemplate.innerHTML = `
              <div class="relative">
                <img class="w-full" src=${strMealThumb} alt=${strMeal}>
                <div
                  class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                </div>
                ${
                  isFavorite
                    ? `<button class="text-4xl absolute bottom-0 right-0 text-orange-500 mb-3 mr-3 hover:text-orange-400 transition duration-300"><i class="fa-solid fa-star"></i></button>`
                    : ''
                }
              </div>
              <div class="px-6 py-4 mb-auto">
                <a href="#"
                  class="font-medium text-lg hover:text-orange-600 transition duration-300 inline-block mb-2">${strMeal}</a>
              </div>
              <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <button
                  class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300 see-recipe-button">
                  See Full Recipe
                </button>
              </div>
            `;
  return cardTemplate;
}

export function displayRecipeDetails(recipe) {
  const {
    idMeal,
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
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
    strYoutube,
  } = recipe;

  const recipeTemplate = document.createElement('div');

  const isFavorite = favoriteRecipes().includes(idMeal);

  recipeTemplate.innerHTML = `
          <div class="flex flex-col md:flex-row recipe-details gap-y-8 md:gap-x-8">
          <div class="min-w-[300px] md:min-w-[500px]">
          <div class="relative">
            <img src="${strMealThumb}" alt="${strMeal}" class="w-full rounded-lg" />
            <button
                class="text-xs absolute top-0 right-0 bg-orange-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-orange-600 transition duration-300">
                ${strArea}
              </button>
              <button
                class="text-xs absolute top-0 left-0 bg-orange-600 px-4 py-2 text-white mt-3 ml-3 hover:bg-white hover:text-orange-600 transition duration-300">
                ${strCategory}
              </button>
              ${
                isFavorite
                  ? `<button class="text-4xl absolute bottom-0 right-0 text-orange-500 mb-3 mr-3 hover:text-orange-400 transition duration-300"><i class="fa-solid fa-star"></i></button>`
                  : ''
              }
          </div>
          </div>
          <div class="flex flex-col gap-y-8">
            <h2 class="text-4xl md:text-5xl font-bold">${strMeal}</h2>
            <div class="flex items-center gap-x-4">
              <span class="text-orange-700">
              ${strIngredient1 ? `${strIngredient1}: ${strMeasure1},` : ''}
              ${strIngredient2 ? `${strIngredient2}: ${strMeasure2},` : ''}
              ${strIngredient3 ? `${strIngredient3}: ${strMeasure3},` : ''}
              ${strIngredient4 ? `${strIngredient4}: ${strMeasure4},` : ''}
              ${strIngredient5 ? `${strIngredient5}: ${strMeasure5},` : ''}
              ${strIngredient6 ? `${strIngredient6}: ${strMeasure6},` : ''}
              ${strIngredient7 ? `${strIngredient7}: ${strMeasure7},` : ''}
              ${strIngredient8 ? `${strIngredient8}: ${strMeasure8},` : ''}
              ${strIngredient9 ? `${strIngredient9}: ${strMeasure9},` : ''}
              ${strIngredient10 ? `${strIngredient10}: ${strMeasure10},` : ''}
              ${strIngredient11 ? `${strIngredient11}: ${strMeasure11},` : ''}
              ${strIngredient12 ? `${strIngredient12}: ${strMeasure12},` : ''}
              ${strIngredient13 ? `${strIngredient13}: ${strMeasure13},` : ''}
              ${strIngredient14 ? `${strIngredient14}: ${strMeasure14},` : ''}
              ${strIngredient15 ? `${strIngredient15}: ${strMeasure15},` : ''}
              ${strIngredient16 ? `${strIngredient16}: ${strMeasure16},` : ''}
              ${strIngredient17 ? `${strIngredient17}: ${strMeasure17},` : ''}
              ${strIngredient18 ? `${strIngredient18}: ${strMeasure18},` : ''}
              ${strIngredient19 ? `${strIngredient19}: ${strMeasure19},` : ''}
              ${strIngredient20 ? `${strIngredient20}: ${strMeasure20}` : ''}
              </span>
            </div>
            <p class="text-gray-600">${strInstructions}</p>
            <div class="flex items-center gap-x-4">
              <button
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300 ${
                  isFavorite ? 'remove-favorite-button' : 'add-favorite-button'
                }">
                ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <a href="${strYoutube}" target="_blank"
                class="px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300">
                Watch Tutorial <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
          `;

  if (isFavorite) {
    recipeTemplate
      .querySelector('.remove-favorite-button')
      .addEventListener('click', () => {
        removeRecipeFromLocalStorage(idMeal);
        resetDisplay();
        displayRecipeDetails(recipe);
      });
  } else {
    recipeTemplate
      .querySelector('.add-favorite-button')
      .addEventListener('click', () => {
        addRecipeToLocalStorage(idMeal);
        resetDisplay();
        displayRecipeDetails(recipe);
      });
  }

  pageContent.appendChild(recipeTemplate);
}

// immutable exported module values
export function modifyCurrentPage(page) {
  currentPage = page;
}
