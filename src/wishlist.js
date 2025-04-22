//Логіка сторінки Wishlist

import { LS } from './js/storage';
import { refs } from './js/refs';
import { getProduct } from './js/products-api';
import { renderProducts, updateHeader } from './js/render-function';

async function initWishlist() {
  // dummyjson data for renderProducts
  const data = {
    data: [],
    total: 0,
  };
  window.addEventListener(`DOMContentLoaded`, updateHeader);
  data.products = await wishListProducts();
  data.total = data.products.length;
  renderProducts(data, 1);
}

async function wishListProducts() {
  const wishList = LS.getKeys().filter(product => product.wish);
  const productPromises = wishList.map(product =>
    getProduct(product.productId)
  );

  try {
    const wishlistProducts = await Promise.all(productPromises);
    return wishlistProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

initWishlist();
