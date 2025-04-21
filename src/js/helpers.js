//Допоміжні функції

import { refs } from './refs';
import { LS } from './storage';
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
  updateHeader();
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

export function updateHeader() {
  let cart = 0;
  let wish = 0;
  LS.getKeys().forEach(item => {
    console.log(item);
    item.qty && cart++;
    item.wish && wish++;
  });
  console.log(cart, wish);
  refs.body.querySelector('[data-cart-count]').textContent = cart;
  refs.body.querySelector('[data-wishlist-count]').textContent = wish;
}
