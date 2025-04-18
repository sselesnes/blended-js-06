// Функції, які передаються колбеками в addEventListners

import { nextProductsPage, applyFilter } from './helpers';
import { refs } from './refs';

export const handlers = {
  loadMore: function (event) {
    nextProductsPage();
  },
  categoriesFilter: function (event) {
    if (event.target.classList.value == 'categories__btn') {
      applyFilter(event.target.textContent, null);
    }
  },
  searchProduct: function (event) {
    event.preventDefault();
    const searchFormQuery = event.target.elements.searchValue.value;
    event.target.elements.searchValue.value = '';
    applyFilter(null, searchFormQuery);
  },
  searchClear: function (event) {
    if (
      (event.target.classList.value === 'search-form__btn-clear') &
      (event.type === 'click')
    ) {
      refs.searchForm.elements.searchValue.value = '';
    }
  },
};
