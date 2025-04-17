//Функцію для створення, рендеру або видалення розмітки
import { refs } from './refs';
import { productsPerPage } from './constants';

export function renderCategories(data) {
  refs.categories.insertAdjacentHTML('beforeend', markupCategory(data));
}

export function renderProducts(data, page) {
  refs.loadMore.style.display = 'none';
  refs.products.insertAdjacentHTML('beforeend', markupProducts(data.products));
  //   console.log(data.total, productsPerPage * page);
  if (data.total > productsPerPage * page) {
    // console.log(`load more`);
    refs.loadMore.style.display = 'flex';
  }
}

function markupCategory(data) {
  return data
    .map(
      category =>
        `<li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
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
