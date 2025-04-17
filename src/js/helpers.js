//Допоміжні функції
import { refs } from './refs';
import { getCategories, getProducts } from './products-api';
import { renderCategories, renderProducts } from './render-function';

let page = 16;

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
    const products = await getProducts(page);
    // console.log(products);
    renderProducts(products, page);
  } catch (error) {
    console.log(error);
  }
}

export function nextProductsPage() {
  page++;
  handleProducts();
}
