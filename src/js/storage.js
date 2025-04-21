//Робота з localStorage

// ignoring keys that do not belong to our application data (do not start with a prefix)

export const LS = {
  prefix: 'b06-',

  add: function (productId, location, qty) {
    let wish = location === 'wish' ? 1 : 0;
    // if location == cart && qty == null {qty=1}
    qty = location === 'cart' && !qty ? 1 : qty ?? 0;

    const exists = JSON.parse(this.get(productId));
    if (exists) {
      qty += exists.qty;
      wish |= exists.wish;
    }
    localStorage.setItem(
      this.prefix + productId,
      JSON.stringify({ wish: wish, qty: qty, timestamp: Date.now() })
    );
  },
  get: function (productId) {
    return localStorage.getItem(this.prefix + productId);
  },
  remove: function (productId) {
    localStorage.removeItem(productId);
  },
  getKeys: function () {
    return (
      Object.entries(localStorage)
        .filter(([key]) => key.startsWith(this.prefix))
        .map(([key, value]) => [
          key,
          JSON.parse(value).wish,
          JSON.parse(value).qty,
          JSON.parse(value).timestamp,
        ])
        // sorting by timestamp
        .sort((a, b) => a[3] - b[3])
    );
  },
};
