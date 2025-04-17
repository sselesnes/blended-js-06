// Функції для роботи з бекендом

import axios from 'axios';
import { productsPerPage } from './constants';

export const getCategories = async category => {
  const { data } = await axios.get(
    'https://dummyjson.com/products/category-list'
  );
  return data;
};

export const getProducts = async (page, category) => {
  let categoryProps = '';
  console.log(category);
  if (category && category !== 'all') {
    categoryProps = `/category/${category}`;
  }
  const skip = (page - 1) * productsPerPage;
  const { data } = await axios.get(
    `https://dummyjson.com/products${categoryProps}?limit=${productsPerPage}&skip=${skip}`
  );
  return data;
};
