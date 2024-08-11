// Hamburger menu
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.querySelector(".nav-links");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  let cartCountElement = document.querySelector(".cart-badge");

  // Function to update cart count
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalCount;
    }
  }

  if (productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        document.getElementById("product-content").innerHTML = `
            <h2>${product.title}</h2>
            <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            </div>
            <p>${product.description}</p>
            <h3>$${product.price.toFixed(2)}</h3>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>

            <a href="#" data-productId="${productId}" class="add-to-cart cart-width-half"><i class="fas fa-shopping-cart"></i></a>
          `;

        // Add event listener to "Add to Cart" button
        document.querySelector(".add-to-cart").addEventListener("click", (e) => {
          e.preventDefault();
          addToCart(productId);
        });
      })
      .catch((error) => console.error("Error fetching product:", error));
  } else {
    document.getElementById(
      "product-content"
    ).innerHTML = `<p>Product not found.</p>`;
  }

  // Function to add item to cart
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Initialize cart count on page load
  updateCartCount();
});
