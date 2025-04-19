//Функцію для створення, рендеру або видалення розмітки

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';
import { productsPerPage } from './helpers';

export function clearProducts() {
  refs.loadMore.style.display = 'none';
  refs.products.innerHTML = '';
}

export function renderCategories(data) {
  refs.categories.insertAdjacentHTML('beforeend', markupCategory(data));
}

export function renderProducts(data, page, searchQuery) {
  refs.loadMore.style.display = 'none';
  refs.products.insertAdjacentHTML('beforeend', markupProducts(data.products));

  if (!data.total) refs.notFound.classList.add('not-found--visible');
  else {
    refs.notFound.classList.remove('not-found--visible');
  }

  // loadmore behavior
  // dummyjson doesn`t support search pagination

  if (!searchQuery & (data.total > productsPerPage * page)) {
    refs.loadMore.style.display = 'flex';
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
  console.log(data);
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

function markupProducts(data) {
  return data
    .map(
      product =>
        `<li class="products__item" data-id="${product.id}">
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
  return `<img class="modal-product__img" src="${data.thumbnail}" alt="${
    data.description
  }"/>
        <div class="modal-product__content"><p class="modal-product__title">${
          data.title
        }</p>
        <ul class="modal-product__tags">${data.tags.join(' ')}</ul>
        <p class="modal-product__description">${data.description}</p>
        <p class="modal-product__shipping-information">${
          data.shippingInformation
        }</p>
        <p class="modal-product__return-policy">${data.returnPolicy}</p>
        <p class="modal-product__price">Price: ${data.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
        </div>`;
}

// Зайве
// Shipping:
// Return Policy:
