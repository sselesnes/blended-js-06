//Логіка сторінки Wishlist

import { LS } from './js/storage';
import { refs } from './js/refs';
import { getProduct } from './js/products-api';
import { renderProducts, updateHeader } from './js/render-function';

// import { handlers } from './js/handlers';
import { modalOpen } from './js/modal';

export async function initWishlist() {
  console.trace();
  updateHeader();
  // dummyjson like data for renderProducts
  const data = {
    total: 0,
  };

  data.products = await wishListProducts();
  data.total = data.products.length;
  renderProducts(data, 1, null, 'wishlist');
}

async function wishListProducts() {
  const wishList = LS.getKeys().filter(product => product.wish);
  const productPromises = wishList.map(product =>
    getProduct(product.productId)
  );

  try {
    const data = await Promise.all(productPromises);
    return data;
  } catch (error) {
    console.error(error);
    return [];
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

refs.products.addEventListener('click', handlers.productCard);
refs.searchForm.addEventListener('submit', handlers.searchProduct);
refs.searchForm.addEventListener('click', handlers.searchClear);
// window.addEventListener(`DOMContentLoaded`, initWishlist);
// initWishlist();
