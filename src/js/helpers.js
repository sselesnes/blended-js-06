//Допоміжні функції

import { getCategories, getProducts } from './products-api';
import {
  renderCategories,
  renderProducts,
  clearProducts,
} from './render-function';

export const productsPerPage = 12;
let page = 1;
let category = 'all';
let searchQuery = null;

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
    const products = await getProducts(page, category, searchQuery);
    renderProducts(products, page, searchQuery);
    searchQuery = null;
  } catch (error) {
    console.log(error);
  }
}

export function nextProductsPage() {
  page++;
  handleProducts();
}

export function applyFilter(categorySelected, searchFormQuery) {
  if (searchFormQuery) {
    searchQuery = searchFormQuery;
    category = 'all';
  }
  if (categorySelected == category) {
    return;
  }
  page = 1;
  category = categorySelected;
  clearProducts();
  handleProducts();
}
