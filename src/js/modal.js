//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';
import { getProduct } from './products-api';
import { renderCard } from './render-function';

export async function modalOpen(productId) {
  try {
    const product = await getProduct(productId);
    renderCard(product);
    refs.modal.classList.add('modal--is-open');
    refs.modalCloseBtn.addEventListener('click', modalClose);
    refs.body.addEventListener('click', modalOutside);
  } catch (error) {
    console.log(error);
  }
}

function modalClose() {
  refs.modal.classList.remove('modal--is-open');
  refs.modalCloseBtn.removeEventListener('click', modalClose);
  refs.body.removeEventListener('click', modalOutside);
}

function modalOutside(event) {
  if (event.target === refs.modal) {
    modalClose();
  }
}
