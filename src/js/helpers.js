//Допоміжні функції
// Functions from home.js moved to helpers.js due to a conflict with handlers.js during initialization (сyclic dependencies)

import { getProducts } from './products-api';
import { renderProducts, clearProducts } from './render-function';

let page = 1;
export const productsPerPage = 12;
let category = 'all';
let searchQuery = null;

export function nextProductsPage() {
  page++;
  handleProducts();
}

export async function handleProducts() {
  const products = await getProducts(page, category, searchQuery);
  if (products) {
    renderProducts(products, page, searchQuery);
    searchQuery = null;
  }
}

export function applyFilter(categorySelected, searchFormQuery) {
  page = 1;
  if (!searchFormQuery & (categorySelected == category)) {
    return;
  }
  if (searchFormQuery) {
    searchQuery = searchFormQuery;
    categorySelected = 'empty';
  }
  clearProducts(category, categorySelected);
  category = categorySelected;
  handleProducts();
}
