// Функції, які передаються колбеками в addEventListners
import { nextProductsPage, applyCategory } from './helpers';

export const handlers = {
  loadMore: function (event) {
    nextProductsPage();
  },
  categoriesFilter: function (event) {
    applyCategory(event.target.textContent);
  },
};
