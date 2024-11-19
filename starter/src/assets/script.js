// products available in the store
const products = [
  {
    name: "Cherry",
    price: 2.99,
    quantity: 0,
    productId: 0,
    image: "images/cherry.jpg",
  },
  {
    name: "Orange",
    price: 1.99,
    quantity: 0,
    productId: 1,
    image: "images/orange.jpg",
  },
  {
    name: "Strawberry",
    price: 3.99,
    quantity: 0,
    productId: 2,
    image: "images/strawberry.jpg",
  },
];

// array that contains list of products in shopping cart
let cart = [];

// helper function to get product by it's ID
function getProductById(productId, productList){
  return productList.find(product => product.productId === productId);
};
// function for adding products to cart
function addProductToCart(productId) {
  let whichProduct = getProductById(productId, products);

  if (whichProduct.quantity === 0) {
    cart.push(whichProduct);
  }

  whichProduct.quantity += 1;
}
// increase quantity of a product in the cart
function increaseQuantity(productId) {
  let whichProduct = getProductById(productId, products);
  whichProduct.quantity += 1;
}
// decrease the quantity of a product in the cart
function decreaseQuantity(productId) {
  let whichProduct = getProductById(productId, products);
  whichProduct.quantity -= 1;
  if (whichProduct.quantity <= 0) {
    removeProductFromCart(productId);
  }
}

// remove a product from the cart
function removeProductFromCart(productId) {
  let whichProductToRemove = getProductById(productId, products);
  
  const index = cart.findIndex(product => product.productId === whichProductToRemove.productId);
  if(index !== -1){
  cart.splice(index, 1);
  whichProductToRemove.quantity = 0;
  //  whichProduct.quantity = 0;
  }
}  


// CHECKOUT AREA
let totalPaid = 0;

// function to calculate total cost of items in cart
function cartTotal() {
  let totalCartCost = 0;
  for (let i = 0; i < cart.length; i++) {
    totalCartCost = totalCartCost + cart[i].price * cart[i].quantity;
  }
  return totalCartCost;
}
// function for empty cart button, to empty the cart
function emptyCart() {
  cart.length = 0;
  for (let i = 0; i < products.length; i++) {
    products[i].quantity = 0;
  }
}
// pay function, evaluates amount received and returns change
function pay(amount) {
  if (totalPaid === 0) {
    totalPaid = cartTotal();
  }
  //
  totalPaid -= amount;
  //
  if (totalPaid < 0) {
    let change = Math.abs(totalPaid);
    totalPaid = 0;
    emptyCart();
    return change;
  } else if (totalPaid > 0) {
    return -totalPaid;
  } else {
    return 0;
  }
}


// module exports
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  //  currency
};
