import { shuffle, resetDisplay, displayTitle, capitalize } from './utils.js';
import { displayCategories, displayRecipe } from './display.js';

const searchRecipeForm = document.querySelector('#search-recipe-form');
const searchRecipeInput = searchRecipeForm.elements['recipe-input'];
const pageContent = document.querySelector('#page-content');

export async function initialFetch() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
    );
    const recipes = await response.json();
    resetDisplay();
    const shuffledRecipes = shuffle(recipes.meals);
    shuffledRecipes.forEach((recipe) => displayRecipe(recipe));
  } catch (error) {
    console.error(error);
  }
}

export async function searchForRecipe(e) {
  e.preventDefault();

  try {
    if (searchRecipeInput.value.length === 0) {
      throw new Error('Please enter a recipe name');
    }
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRecipeInput.value}`
    );
    const recipes = await response.json();

    if (recipes.meals === null) {
      alert('No recipe found! Please try another recipe name.');
      return;
    }
    resetDisplay();

    displayTitle(`Search Results For: ${capitalize(searchRecipeInput.value)}`);

    const shuffledRecipes = shuffle(recipes.meals);
    shuffledRecipes.forEach((recipe) => displayRecipe(recipe));
    searchRecipeInput.value = '';
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
    const categories = await response.json();

    resetDisplay();
    displayTitle('Categories');
    categories.categories.forEach((category) => displayCategories(category));
    searchRecipeInput.value = '';
  } catch (error) {
    console.error(error);
  }
}
