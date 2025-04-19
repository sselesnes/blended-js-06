// Функції для роботи з бекендом

import axios from 'axios';
import { productsPerPage } from './helpers';

export async function getCategories(category) {
  const { data } = await axios.get(
    'https://dummyjson.com/products/category-list'
  );
  return data;
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
  const { data } = await axios.get(`https://dummyjson.com/products${props}`);
  return data;
}

export async function getProduct(productId) {
  console.log(productId);
  const { data } = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );
  return data;
}
