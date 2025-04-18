// Функції, які передаються колбеками в addEventListners

import { nextProductsPage, applyCategory, applyQuery } from './helpers';
import { refs } from './refs';

export const handlers = {
  loadMore: function (event) {
    nextProductsPage();
  },
  categoriesFilter: function (event) {
    applyCategory(event.target.textContent);
  },
  searchProduct: function (event) {
    event.preventDefault();
    const searchFormQuery = event.target.elements.searchValue.value;
    event.target.elements.searchValue.value = '';
    applyQuery(searchFormQuery);
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
