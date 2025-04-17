// Функції для роботи з бекендом

import axios from 'axios';

export const getCategories = async () => {
  const { data } = await axios.get(
    'https://dummyjson.com/products/category-list'
  );
  return data;
};

export const getProducts = async (page = 1) => {
  const skip = (page - 1) * 12;
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=12&skip=${skip}`
  );
  return data;
};
