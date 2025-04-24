//Логіка сторінки Cart

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { LS } from './js/storage';
import { refs } from './js/refs';
// import { handlers } from './js/handlers';
import { getProduct } from './js/products-api';
import {
  clearWishCart,
  renderProducts,
  updateHeader,
  updateOrderSummary,
} from './js/render-function';

// dummyjson like data for renderProducts

let cart = LS.getKeys().filter(product => product.qty);

export async function initCart() {
  const data = {
    total: 0,
    sum: 0,
  };
  updateHeader();
  data.products = await cartProducts();
  data.total = data.products.length;
  data.sum = data.products.reduce((total, product) => total + product.price, 0);
  updateOrderSummary(data.total, data.sum.toFixed(2));
  renderProducts(data, 1, null, 'cart');
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
  if (cart.length) {
    iziToast.info({
      message: `Successful purchase of products`,
      position: 'bottomCenter',
      timeout: 2000,
    });

    // cleaning LS products qty + wish
    cart.forEach(product => {
      LS.remove(product.productId);
      clearWishCart();
      cart = [];
    });
  }
}

const handlers = {
  loadMore: function (event) {
    if (event.target.classList.contains('load-more-btn')) {
      nextProductsPage();
    }
  },
  categoriesFilter: function (event) {
    if (event.target.classList.value == 'categories__btn') {
      applyFilter(event.target.textContent, null);
    }
  },
  searchProduct: function (event) {
    event.preventDefault();
    const searchFormQuery = event.target.elements.searchValue.value;
    event.target.elements.searchValue.value = '';

    // if the search event does not come from home/index.html
    const urlPath = urlHandler.get();
    if (urlPath !== '/' && urlPath !== '/index.html') {
      LS.add('search', 'none', searchFormQuery);
      urlHandler.clear();
    }
    applyFilter(null, searchFormQuery);
  },
  searchClear: function (event) {
    if (event.target.classList.value === 'search-form__btn-clear') {
      refs.searchForm.elements.searchValue.value = '';
    }
  },
  productCard: function (event) {
    let targetElement = event.target;
    if (targetElement.classList.value !== 'products') {
      while (!targetElement.classList.contains('products__item')) {
        targetElement = targetElement.parentElement;
      }
      modalOpen(targetElement.dataset.id, targetElement.dataset.origin);
    }
  },
};

refs.orderSummary
  .querySelector('.cart-summary__btn')
  .addEventListener('click', cartProcessing);
refs.products.addEventListener('click', handlers.productCard);
refs.searchForm.addEventListener('submit', handlers.searchProduct);
refs.searchForm.addEventListener('click', handlers.searchClear);
window.addEventListener(`DOMContentLoaded`, initCart);
