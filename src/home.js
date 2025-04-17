//Логіка сторінки Home

import { refs } from './js/refs';
import { getCategories, getProducts } from './js/products-api';
import { renderCategories, renderProducts } from './js/render-function';
import { handlers } from './js/handlers';
import { loadPage } from './js/helpers';

// loadPage();
window.addEventListener(`DOMContentLoaded`, loadPage);
refs.loadMore.addEventListener('click', handlers.loadMore);
