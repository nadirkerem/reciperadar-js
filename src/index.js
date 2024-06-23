import { initialFetch, searchForRecipe, fetchCategories } from './fetch.js';

const searchRecipeForm = document.querySelector('#search-recipe-form');
const categoriesButton = document.querySelector('#categories-button');
const homeButton = document.querySelector('#home-button');

document.addEventListener('DOMContentLoaded', initialFetch);

homeButton.addEventListener('click', initialFetch);

searchRecipeForm.addEventListener('submit', searchForRecipe);

categoriesButton.addEventListener('click', fetchCategories);
