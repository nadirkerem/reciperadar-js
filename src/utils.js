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
  const recipeCardsContainer = document.querySelector(
    '#recipe-cards-container'
  );
  recipeCardsContainer.innerHTML = '';
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
