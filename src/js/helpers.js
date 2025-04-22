//Допоміжні функції

// import { refs } from './refs';
// import { LS } from './storage';
import { getCategories, getProducts } from './products-api';
import {
  renderCategories,
  renderProducts,
  clearProducts,
  updateHeader,
} from './render-function';

export const productsPerPage = 12;
let page = 1;
let category = 'all';
let searchQuery = null;

export async function loadPage() {
  updateHeader();
  const categories = await getCategories();
  if (categories) {
    renderCategories(['all', ...categories]);
    handleProducts();
  }
}

async function handleProducts() {
  const products = await getProducts(page, category, searchQuery);
  if (products) {
    renderProducts(products, page, searchQuery);
    searchQuery = null;
  }
}

export function nextProductsPage() {
  page++;
  handleProducts();
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
