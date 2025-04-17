//Допоміжні функції

import { getCategories, getProducts } from './products-api';
import {
  renderCategories,
  renderProducts,
  clearProducts,
} from './render-function';

let page = 16;
let category = 'all';

export async function loadPage() {
  try {
    const categories = await getCategories();
    renderCategories(['all', ...categories]);
  } catch (error) {
    console.log(error);
  }
  handleProducts();
}

async function handleProducts() {
  try {
    const products = await getProducts(page, category);
    renderProducts(products, page);
  } catch (error) {
    console.log(error);
  }
}

export function nextProductsPage() {
  page++;
  handleProducts();
}

export function applyCategory(categorySelected) {
  category = categorySelected;
  page = 1;
  clearProducts();
  handleProducts();
}
