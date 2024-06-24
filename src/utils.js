import { modifyCurrentPage } from './display.js';

const pageContent = document.querySelector('#page-content');

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function resetDisplay() {
  if (pageContent.querySelector('h2')) {
    pageContent.querySelector('h2').remove();
  }
  if (pageContent.querySelector('.recipe-details')) {
    pageContent.querySelector('.recipe-details').remove();
  }
  const recipeCardsContainer = document.querySelector(
    '#recipe-cards-container'
  );

  const paginationContainer = document.querySelector('#pagination-container');
  recipeCardsContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  modifyCurrentPage(1);
}

export function displayTitle(title) {
  if (pageContent.querySelector('h2')) {
    pageContent.querySelector('h2').remove();
  }
  const titleElement = document.createElement('h2');
  titleElement.className = 'text-2xl font-medium text-center mb-8';
  titleElement.textContent = title;
  pageContent.prepend(titleElement);
}

export function capitalize(sentence) {
  return sentence
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function favoriteRecipes() {
  const recipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
  return recipes;
}

export function addRecipeToLocalStorage(recipeID) {
  const recipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
  if (!recipes.includes(recipeID)) {
    recipes.push(recipeID);
    localStorage.setItem('favorite-recipes', JSON.stringify(recipes));
  }
}

export function removeRecipeFromLocalStorage(recipeID) {
  const recipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
  const updatedRecipes = recipes.filter((recipe) => recipe !== recipeID);
  localStorage.setItem('favorite-recipes', JSON.stringify(updatedRecipes));
}
