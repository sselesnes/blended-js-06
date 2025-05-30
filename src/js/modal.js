//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
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
    actionBtnsText(productId);
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
  // don't change 'wish' when clicked `add to cart`
  if (event.target.classList.contains(cartBtn)) {
    if (productStorageInfo) {
      if (!productStorageInfo.qty) {
        LS.add(productId, productStorageInfo.wish ? 'wish' : 'cart', 1);
      } else {
        LS.add(productId, productStorageInfo.wish ? 'wish' : 'cart', 0);
      }
    } else {
      LS.add(productId, 'cart', 1);
    }
    actionBtnsText(productId);
  }

  // don't change 'qty' when clicked `add to wishlist`
  if (event.target.classList.contains(wishlistBtn)) {
    if (productStorageInfo) {
      if (!productStorageInfo.wish) {
        LS.add(productId, 'wish', productStorageInfo.qty);
      } else {
        LS.add(productId, 'none', productStorageInfo.qty);
      }
    } else {
      LS.add(productId, 'wish', 0);
    }
    actionBtnsText(productId);
  }

  if (event.target.classList.contains('modal-product__buy-btn')) {
    buyItNowProcessing(productId);
  }
  updateHeader();
}

function actionBtnsText(productId) {
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

function buyItNowProcessing() {
  iziToast.info({
    message: `Successful purchase of product`,
    position: 'bottomCenter',
    timeout: 2000,
  });
}
