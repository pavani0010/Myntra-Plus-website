const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    image: "images/headphones.jpg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    image: "images/watch.jpg"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49999,
    image: "images/laptop.jpg"
  },
  {
    id: 4,
    name: "Mobile Phones",
    price: 19999,
    image: "images/mobile.png"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = cart.length;
}

function displayProducts() {
  const container = document.getElementById("product-container");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  alert(product.name + " added to cart");
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  let total = 0;
  cartItems.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="product-card">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  }).join("");

  cartTotal.textContent = "Total: ₹" + total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

updateCartCount();
displayProducts();
displayCart();
