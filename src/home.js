//Логіка сторінки Home

// import { refs } from './js/refs';
import { getCategories, getProducts } from './js/products-api';
import { renderCategories, renderProducts } from './js/render-function';
let page = 17;
const loadPage = async () => {
  try {
    const categories = await getCategories();
    renderCategories(['all', ...categories]);
    const products = await getProducts(page);
    // console.log(products);
    renderProducts(products, page);
  } catch (error) {
    console.log(error);
  }
};

// loadPage();
window.addEventListener(`DOMContentLoaded`, loadPage);
