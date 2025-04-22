//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';
import { LS } from './storage';
import { getProduct } from './products-api';
import { renderCard, updateHeader } from './render-function';
let modalClickListener;

export async function modalOpen(productId) {
  const product = await getProduct(productId);
  if (product) {
    renderCard(product);
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
  if (event.target.classList.contains('modal-product__btn--cart')) {
    LS.add(productId, 'cart');
  }
  if (event.target.classList.contains('modal-product__btn--wishlist')) {
    LS.add(productId, 'wish');
  }
  if (event.target.classList.contains('modal-product__buy-btn')) {
    console.log('Buy It Now', productId);
  }
  updateHeader();
}
