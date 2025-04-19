//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';
import { getProduct } from './products-api';
import { renderCard } from './render-function';

export async function modalCard(productId) {
  try {
    const product = await getProduct(productId);
    renderCard(product);
    refs.modal.classList.add('modal--is-open');
  } catch (error) {
    console.log(error);
  }
}
