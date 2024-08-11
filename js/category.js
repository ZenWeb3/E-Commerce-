//hambuger menu
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
  // Get the category from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  // Function to fetch products based on category
  async function fetchProducts(category) {
    let url = "https://fakestoreapi.com/products";

    if (category) {
      url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
        category
      )}`;
    }

    try {
      let response = await fetch(url);
      let data = await response.json();
      displayProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Function to display products
  function displayProducts(products) {
    let productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = "";

    if (products.length === 0) {
      productsContainer.innerHTML = `<p>No products found in this category.</p>`;
      return;
    }

    products.forEach((product) => {
      let description = product.description;
      let product_title = product.title;
      let formattedPrice = product.price.toFixed(2);
      let productId = product.id;

      // Generate blog post URL using query parameters
      let blogURL = `product.html?id=${productId}`;

      productsContainer.innerHTML += `
          <div class="product">
            <div class="img--section">
              <div class="product-img-container">
                <img src="${product.image}" alt="${product.title}">
              </div>
            </div>
            <div class="product--details">
              <h2 class="product--title">
                <a href="${blogURL}" target="_blank">
                  ${
                    product_title.length > 17
                      ? product_title.substring(0, 17).concat("...")
                      : product_title
                  }
                </a>
              </h2>
              <h4 class="product--category">${product.category}</h4>
              <p class="product--description">
                ${
                  description.length > 62
                    ? description.substring(0, 62).concat("... ")
                    : description
                }
              </p>
              <div class="product-price-container">
                <h3 class="price">$${formattedPrice}</h3>
                <a href="#" data-productId="${productId}" class="add-to-cart"><i class="fas fa-shopping-cart"></i></a>
              </div>
            </div>
          </div>
        `;
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        let productId = button.getAttribute("data-productId");
        addToCart(productId);
      });
    });
  }

  // Function to add item to cart
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Function to update cart count
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
    let cartCountElement = document.querySelector(".cart-badge");
    if (cartCountElement) {
      cartCountElement.textContent = totalCount;
    }
  }

  // Initialize cart count on page load
  updateCartCount();

  // Fetch products based on the category parameter
  fetchProducts(category);
});
