// Функції для роботи з бекендом

import axios from 'axios';
import { productsPerPage } from './helpers';

export const getCategories = async category => {
  const { data } = await axios.get(
    'https://dummyjson.com/products/category-list'
  );
  return data;
};

export const getProducts = async (page, category, searchQuery) => {
  const skip = (page - 1) * productsPerPage;
  let props = `?limit=${productsPerPage}&skip=${skip}`;

  // console.log(page, category, searchQuery);

  if (category !== 'all') {
    props = `/category/${category}?limit=${productsPerPage}&skip=${skip}`;
  }

  // dummyjson doesn`t support search query pagination

  if (searchQuery) {
    props = `/search?q=${searchQuery}`;
  }

  // console.log(props);

  const { data } = await axios.get(`https://dummyjson.com/products${props}`);
  return data;
};
