//Логіка сторінки Cart

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { LS } from './js/storage';
import { refs } from './js/refs';
import { handlers } from './js/handlers';
import { getProduct } from './js/products-api';
import {
  renderProducts,
  updateHeader,
  updateOrderSummary,
} from './js/render-function';

// dummyjson like data for renderProducts

const cart = LS.getKeys().filter(product => product.qty);

async function initCart() {
  const data = {
    total: 0,
    sum: 0,
  };
  updateHeader();
  data.products = await cartProducts();
  data.total = data.products.length;
  data.sum = data.products.reduce((total, product) => total + product.price, 0);
  updateOrderSummary(data.total, data.sum.toFixed(2));
  renderProducts(data, 1);
}

async function cartProducts() {
  const productPromises = cart.map(product => getProduct(product.productId));

  try {
    const cartProducts = await Promise.all(productPromises);
    return cartProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function cartProcessing() {
  iziToast.info({
    message: `Successful purchase of products`,
    position: 'bottomCenter',
    timeout: 2000,
  });

  // cleaning LS products qty
  cart.forEach(product => {
    LS.add(product.productId, product.wish, 0);
  });
}

refs.orderSummary
  .querySelector('.cart-summary__btn')
  .addEventListener('click', cartProcessing);
refs.products.addEventListener('click', handlers.productCard);
refs.searchForm.addEventListener('submit', handlers.searchProduct);
refs.searchForm.addEventListener('click', handlers.searchClear);
window.addEventListener(`DOMContentLoaded`, initCart);
