//Логіка сторінки Home

import { refs } from './js/refs';
import { handlers } from './js/handlers';
import { loadPage } from './js/helpers';

window.addEventListener(`DOMContentLoaded`, loadPage);
refs.loadMore.addEventListener('click', handlers.loadMore);
refs.categories.addEventListener('click', handlers.categoriesFilter);
refs.searchForm.addEventListener('submit', handlers.searchProduct);
