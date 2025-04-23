//Робота з localStorage

// ignoring keys that do not belong to our application data (without prefix)

export const LS = {
  prefix: 'b06-',

  get: function (productId) {
    return JSON.parse(localStorage.getItem(this.prefix + productId));
  },

  remove: function (productId) {
    localStorage.removeItem(this.prefix + productId);
  },

  add: function (productId, location, qty) {
    let wish = location === 'wish' ? 1 : 0;
    const exists = JSON.parse(this.get(this.prefix + productId));
    if (exists) {
      qty += exists.qty;
      wish |= exists.wish;
    }
    localStorage.setItem(
      this.prefix + productId,
      JSON.stringify({ qty: qty, wish: wish, timestamp: Date.now() })
    );
  },

  getKeys: function () {
    return Object.entries(localStorage)
      .filter(([key]) => key.startsWith(this.prefix))
      .map(([key, value]) => {
        const productId = Number(key.substring(this.prefix.length));
        const { wish, qty, timestamp } = JSON.parse(value);
        return { productId, qty, wish, timestamp }; //
      })
      .sort((a, b) => a.timestamp - b.timestamp); //
  },
};
