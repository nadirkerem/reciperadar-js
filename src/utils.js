export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function resetDisplay() {
  const recipeCardsContainer = document.querySelector(
    '#recipe-cards-container'
  );
  recipeCardsContainer.innerHTML = '';
}
