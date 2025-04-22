//Логіка сторінки Wishlist
import { updateHeader } from './js/render-function';
import { LS } from './js/storage';
import { getProduct } from './js/products-api';
import { renderProducts } from './js/render-function';

const data = {
  data: [],
  total: 0,
};

async function wishListProducts() {
  const wishListLS = LS.getKeys().filter(product => product.wish);
  const productPromises = wishListLS.map(product =>
    getProduct(product.productId)
  );
  data.total = wishListLS.length;
  try {
    const wishlistProductsData = await Promise.all(productPromises);
    return wishlistProductsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function initWishlist() {
  window.addEventListener(`DOMContentLoaded`, updateHeader);
  data.products = await wishListProducts();
  renderProducts(data, 1);
}

initWishlist();
