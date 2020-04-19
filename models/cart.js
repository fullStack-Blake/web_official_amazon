module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id, quantity) {
    let storedItem = this.items[id];

    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
      this.totalQty++;
    } else {
      this.totalPrice -= storedItem.price;
    }

    storedItem.qty = quantity;

    storedItem.price = storedItem.item.price * quantity;

    this.totalPrice += storedItem.price;
  };

  this.removeItem = function(id) {
    this.totalQty--;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };

  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
