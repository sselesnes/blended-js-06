//Функцію для створення, рендеру або видалення розмітки

import { refs } from './refs';
import { LS } from './storage';
import { productsPerPage } from './helpers';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function clearProducts(category, categorySelected) {
  refs.categories.querySelectorAll('.categories__btn').forEach(button => {
    const buttonText = button.textContent;
    if (buttonText === category) {
      button.classList.remove('categories__btn--active');
    }
    if (buttonText === categorySelected) {
      button.classList.add('categories__btn--active');
    }
  });
  refs.loadMore.style.display = 'none';
  refs.products.innerHTML = '';
}

export function renderCategories(data) {
  refs.categories.insertAdjacentHTML('beforeend', markupCategory(data));
  clearProducts('all', 'all');
}

export function renderProducts(data, page, searchQuery, origin) {
  // loadMore behavior
  // no loadmore in the wishlist or cart
  refs.loadMore && (refs.loadMore.style.display = 'none');
  refs.products.insertAdjacentHTML(
    'beforeend',
    markupProducts(data.products, origin)
  );

  if (!data.total) refs.notFound.classList.add('not-found--visible');
  else {
    refs.notFound.classList.remove('not-found--visible');
  }

  // pagination in search requests is not supported by DummyJSON
  if (!searchQuery & (data.total > productsPerPage * page)) {
    // no loadmore in the wishlist or cart
    refs.loadMore && (refs.loadMore.style.display = 'flex');
  } else {
    if (page !== 1) {
      iziToast.info({
        message: `You've reached the end of search results.`,
        position: 'bottomCenter',
        timeout: 2000,
      });
    }
  }
}

export function renderCard(data) {
  refs.modalProduct.innerHTML = markupCard(data);
}

function markupCategory(data) {
  return data
    .map(
      category =>
        `<li class="categories__item"><button class="categories__btn" type="button">${category}</button>
        </li>`
    )
    .join('');
}

function markupProducts(data, origin) {
  return data
    .map(
      product =>
        `<li class="products__item" data-id='${product.id}' data-origin='${origin}'>
            <img class="products__image" src=${product.thumbnail} alt=${product.description}/>
            <p class="products__title">${product.title}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${product.brand}</span></p>
            <p class="products__category">Category: ${product.category}</p>
            <p class="products__price">Price: $${product.price}</p>
        </li>`
    )
    .join('');
}

function markupCard(data) {
  return `<img class="modal-product__img" src="${data.thumbnail}"
  alt="${data.description}"/>    
    <div class="modal-product__content"><div><p class="modal-product__title">
        ${data.title}</p><ul class="modal-product__tags">${data.tags.join(
    ' '
  )}</ul>
        <p class="modal-product__description">${data.description}</p></div>
        <div><p class="modal-product__shipping-information">${
          data.shippingInformation
        }</p>
        <p class="modal-product__return-policy">${
          data.returnPolicy
        }</p></div></div>
        <div class="modal-product__actions">
        <button class="modal-product__btn modal-product__btn--wishlist"
        type="button">Add to Wishlist</button>
    <button class="modal-product__btn modal-product__btn--cart" type="button">
        Add to Cart</button></div>
    <div class="modal-product__price_buy"><p class="modal-product__price">Price: $${
      data.price
    }</p><button class="modal-product__btn modal-product__buy-btn" type="button">Buy It Now</button>
        </div>
        `;
  // Зайве - Shipping: Return Policy:
}

export function updateHeader() {
  let cart = 0;
  let wish = 0;
  LS.getKeys().forEach(item => {
    item.productId && item.qty && cart++;
    item.wish && wish++;
  });
  refs.body.querySelector('[data-cart-count]').textContent = cart;
  refs.body.querySelector('[data-wishlist-count]').textContent = wish;
}

export function updateOrderSummary(items, total) {
  refs.orderSummary.querySelector('[data-count]').textContent = items;
  refs.orderSummary.querySelector('[data-price]').textContent = `$${total}`;
}

export function clearWishCart() {
  updateHeader();
  updateOrderSummary(0, 0);
  refs.products.innerHTML = '';
  refs.notFound.classList.add('not-found--visible');
}
