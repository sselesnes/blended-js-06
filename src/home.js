//Логіка сторінки Home

import { getCategories, getProducts } from './js/products-api';

const loadPage = async () => {
  try {
    const categories = await getCategories();
    console.log(categories);
    const { products } = await getProducts();
    console.log(products);
  } catch (error) {
    console.log(error);
  }
};

// loadPage();
window.addEventListener(`DOMContentLoaded`, loadPage);
