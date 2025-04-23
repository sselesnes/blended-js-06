//Логіка сторінки Cart
import { LS } from './js/storage';
import { refs } from './js/refs';
import { handlers } from './js/handlers';
import { getProduct } from './js/products-api';
import { updateHeader } from './js/render-function';

function initCart() {
  updateHeader();
}

refs.searchForm.addEventListener('submit', handlers.searchProduct);
refs.searchForm.addEventListener('click', handlers.searchClear);
window.addEventListener(`DOMContentLoaded`, initCart);
