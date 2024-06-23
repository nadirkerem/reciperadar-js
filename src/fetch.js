import { shuffle, resetDisplay } from './utils.js';
import { displayRecipe } from './display.js';

const searchRecipeForm = document.querySelector('#search-recipe-form');
const searchRecipeInput = searchRecipeForm.elements['recipe-input'];

export async function initialFetch() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
    );
    const recipes = await response.json();
    const shuffledRecipes = shuffle(recipes.meals);
    shuffledRecipes.forEach((recipe) => displayRecipe(recipe));
  } catch (error) {
    console.error(error);
  }
}
