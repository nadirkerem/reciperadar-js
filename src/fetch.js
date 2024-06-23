import { shuffle, resetDisplay, displayTitle, capitalize } from './utils.js';
import {
  displayCategories,
  displayRecipes,
  displayRecipesByCategories,
} from './display.js';

const searchRecipeForm = document.querySelector('#search-recipe-form');
const searchRecipeInput = searchRecipeForm.elements['recipe-input'];

export async function initialFetch() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
    );
    const recipes = await response.json();
    resetDisplay();
    const shuffledRecipes = shuffle(recipes.meals);
    shuffledRecipes.forEach((recipe) => displayRecipes(recipe));
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
    shuffledRecipes.forEach((recipe) => displayRecipes(recipe));
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

export async function fetchCategoryRecipes(category) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const recipes = await response.json();
    resetDisplay();
    displayTitle(capitalize(`${category} Recipes`));
    const shuffledRecipes = shuffle(recipes.meals);
    shuffledRecipes.forEach((recipe) => displayRecipesByCategories(recipe));
  } catch (error) {
    console.error(error);
  }
}

export async function randomRecipe() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    const recipe = await response.json();
    resetDisplay();
    displayRecipes(recipe.meals[0]);
  } catch (error) {
    console.error(error);
  }
}
