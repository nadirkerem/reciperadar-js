import {
  initialFetch,
  searchForRecipe,
  fetchCategories,
  randomRecipe,
  fetchFavoriteRecipes,
} from './fetch.js';

const searchRecipeForm = document.querySelector('#search-recipe-form');
const logo = document.querySelector('.brand-logo');
const homeButton = document.querySelector('#home-button');
const categoriesButton = document.querySelector('#categories-button');
const favoritesButton = document.querySelector('#favorites-button');
const surpriseMeButton = document.querySelector('#surprise-me-button');

document.addEventListener('DOMContentLoaded', initialFetch);

searchRecipeForm.addEventListener('submit', searchForRecipe);

logo.addEventListener('click', initialFetch);

homeButton.addEventListener('click', initialFetch);

categoriesButton.addEventListener('click', fetchCategories);

favoritesButton.addEventListener('click', fetchFavoriteRecipes);

surpriseMeButton.addEventListener('click', randomRecipe);
