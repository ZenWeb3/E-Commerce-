//hamburger menu
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.querySelector(".nav-links");

// Update cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
  let cartCountElement = document.querySelector(".cart-badge");
  if (cartCountElement) {
    cartCountElement.textContent = totalCount;
  }
}

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

// Initialize cart count on page load
updateCartCount();