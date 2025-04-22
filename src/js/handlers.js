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
    // console.log(window.location.pathname);
    // if (window.location.pathname !== '/')
    //   window.location.pathname = `/q=${searchFormQuery}`;
    // console.log(urlHandler(get));
    // urlHandler.set(searchFormQuery);
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
  params: null,

  init: function () {
    this.params = new URL(window.location.pathname);
  },

  get: function () {
    return this.params.get('');
  },

  set: function (query) {
    this.params.set(`/q=${query}`);
    this.update();
  },

  update: function () {
    this.url.search = this.params.toString();
    window.history.pushState({}, '', `${this.url}`);
  },

  remove: function () {
    this.params.delete('q');
    this.update();
  },
};
