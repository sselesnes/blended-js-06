//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';
import { LS } from './storage';
import { getProduct } from './products-api';
import { renderCard, updateHeader } from './render-function';
let modalClickListener;
const wishlistBtn = 'modal-product__btn--wishlist';
const cartBtn = 'modal-product__btn--cart';

export async function modalOpen(productId) {
  const product = await getProduct(productId);
  if (product) {
    // dummyjson images Cache-control: public, max-age=0
    renderCard(product);
    actionBtnsPrepare(productId);
    refs.modal.classList.add('modal--is-open');
    refs.body.addEventListener('click', modalOutside);
    modalClickListener = modalClick.bind(null, productId);
    refs.modal.addEventListener('click', modalClickListener);
  }
}

function modalClose() {
  refs.modal.classList.remove('modal--is-open');
  refs.modal.removeEventListener('click', modalClickListener);
  refs.body.removeEventListener('click', modalOutside);
}

function modalOutside(event) {
  if (event.target === refs.modal) {
    modalClose();
  }
}

function modalClick(productId, event) {
  if (event.target.classList.contains('modal__close-btn')) {
    modalClose();
  }

  const productStorageInfo = LS.get(productId);
  if (event.target.classList.contains(cartBtn)) {
    //   if (!productStorageInfo) {
    //     if (!productStorageInfo.qty) {
    LS.add(productId, 'cart');
    actionBtnsPrepare(productId);
    // }
    // }
  }

  if (event.target.classList.contains(wishlistBtn)) {
    // if (!productStorageInfo) {
    //   if (!productStorageInfo.wish) {
    LS.add(productId, 'wish');
    actionBtnsPrepare(productId);
    // }
    // }
  }

  if (event.target.classList.contains('modal-product__buy-btn')) {
    console.log('Buy It Now', productId);
  }
  updateHeader();
}

function actionBtnsPrepare(productId) {
  const productStorageInfo = LS.get(productId);
  if (productStorageInfo) {
    if (productStorageInfo.wish) {
      refs.modal.querySelector(`.` + wishlistBtn).textContent =
        'Remove from Wishlist';
    } else {
      refs.modal.querySelector(`.` + wishlistBtn).textContent =
        'Add to Wishlist';
    }
    if (productStorageInfo.qty) {
      refs.modal.querySelector(`.` + cartBtn).textContent = 'Remove from Cart';
    } else {
      refs.modal.querySelector(`.` + cartBtn).textContent = 'Add to Cart';
    }
  }
}
