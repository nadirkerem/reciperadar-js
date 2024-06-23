import {
  initialFetch,
  searchForRecipe,
  fetchCategories,
  randomRecipe,
} from './fetch.js';

const searchRecipeForm = document.querySelector('#search-recipe-form');
const logo = document.querySelector('#logo');
const homeButton = document.querySelector('#home-button');
const categoriesButton = document.querySelector('#categories-button');
const surpriseMeButton = document.querySelector('#surprise-me-button');

document.addEventListener('DOMContentLoaded', initialFetch);

searchRecipeForm.addEventListener('submit', searchForRecipe);

logo.addEventListener('click', initialFetch);

homeButton.addEventListener('click', initialFetch);

categoriesButton.addEventListener('click', fetchCategories);

surpriseMeButton.addEventListener('click', randomRecipe);
