// Функції для роботи з бекендом

import axios from 'axios';
import { productsPerPage } from './constants';

export const getCategories = async () => {
  const { data } = await axios.get(
    'https://dummyjson.com/products/category-list'
  );
  return data;
};

export const getProducts = async (page = 1) => {
  const skip = (page - 1) * productsPerPage;
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
  );
  return data;
};
