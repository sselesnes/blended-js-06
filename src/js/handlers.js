// Функції, які передаються колбеками в addEventListners

import { refs } from './refs';
import { modalOpen } from './modal';
import { nextProductsPage, applyFilter } from './helpers';

export const handlers = {
  loadMore: function (event) {
    if (event.target.classList.contains('load-more-btn')) {
      nextProductsPage();
    }
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
    if (urlHandler.get() !== '/') {
      urlHandler.set(searchFormQuery);
    }
    applyFilter(null, searchFormQuery);
  },
  searchClear: function (event) {
    if (event.target.classList.value === 'search-form__btn-clear') {
      refs.searchForm.elements.searchValue.value = '';
    }
  },
  productCard: function (event) {
    let targetElement = event.target;
    if (targetElement.classList.value !== 'products') {
      while (!targetElement.classList.contains('products__item')) {
        targetElement = targetElement.parentElement;
      }
      modalOpen(targetElement.dataset.id);
    }
  },
};

export const urlHandler = {
  get: function () {
    const currentURL = window.location.pathname;
    if (currentURL.startsWith('/q=')) return currentURL.substring(3);
    return currentURL;
  },
  set: function (newPathname) {
    const newURL = `/q=${newPathname}`;
    window.location.href = newURL;
  },
};
