// Функції, які передаються колбеками в addEventListners
import { nextProductsPage } from './helpers';

export const handlers = {
  loadMore: function (event) {
    nextProductsPage();
  },
};
