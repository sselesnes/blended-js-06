//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';
import { renderCard } from './render-function';

export function modalCard(productId) {
  console.log(productId);

  refs.modal.classList.add('modal--is-open');
}
