import { initialFetch, searchForRecipe } from './fetch.js';

const searchRecipeForm = document.querySelector('#search-recipe-form');

searchRecipeForm.addEventListener('submit', searchForRecipe);

document.addEventListener('DOMContentLoaded', initialFetch);
