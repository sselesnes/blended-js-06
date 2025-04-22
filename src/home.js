//Логіка сторінки Home

import { refs } from './js/refs';
import { handlers, urlHandler } from './js/handlers';
import { handleProducts } from './js/helpers';
import { getCategories } from './js/products-api';
import { renderCategories, updateHeader } from './js/render-function';
import { applyFilter } from './js/helpers';

export async function initHome() {
  updateHeader();
  //   urlHandler.init();
  try {
    const categories = await getCategories();
    if (categories) {
      renderCategories(['all', ...categories]);
      //   const searchFormQuery = urlHandler.get();
      //   console.log(searchFormQuery);
      //   if (searchFormQuery) applyFilter(null, searchFormQuery);
      handleProducts();
    }
  } catch (error) {
    console.log(error);
  }
}

refs.loadMore.addEventListener('click', handlers.loadMore);
refs.categories.addEventListener('click', handlers.categoriesFilter);
refs.searchForm.addEventListener('submit', handlers.searchProduct);
refs.searchForm.addEventListener('click', handlers.searchClear);
refs.products.addEventListener('click', handlers.productCard);
window.addEventListener(`DOMContentLoaded`, initHome);
