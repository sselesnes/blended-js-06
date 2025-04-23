// Функції для роботи з бекендом

import axios from 'axios';
import { productsPerPage } from './helpers';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function getCategories(category) {
  try {
    const { data } = await axios.get(
      'https://dummyjson.com/products/category-list'
    );
    return data;
  } catch (error) {
    uiMessage(`Categories fetch: ${error}`);
    return null;
  }
}

export async function getProducts(page, category, searchQuery) {
  const skip = (page - 1) * productsPerPage;
  let props = `?limit=${productsPerPage}&skip=${skip}`;
  if (category !== 'all') {
    props = `/category/${category}?limit=${productsPerPage}&skip=${skip}`;
  }

  // dummyjson doesn`t support search query pagination
  if (searchQuery) {
    props = `/search?q=${searchQuery}`;
  }
  try {
    const { data } = await axios.get(`https://dummyjson.com/products${props}`);
    return data;
  } catch (error) {
    uiMessage(`Products fetch: ${error}`);
    return null;
  }
}

export async function getProduct(productId) {
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );
    return data;
  } catch (error) {
    uiMessage(`Product ID ${productId} fetch: ${error}`);
    return null;
  }
}

function uiMessage(error) {
  iziToast.error({
    message: error,
    position: 'bottomCenter',
    timeout: 2000,
  });
}
