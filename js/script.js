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

// product api call
document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products");
  let cartCountElement = document.querySelector(".cart-badge");

  async function fetchProduct(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();
      console.log(response);

      for (let i = 0; i < response.length; i++) {
        let description = response[i].description;
        let product_title = response[i].title;
        let productId = response[i].id;

        // Format the price to always show two decimal places
        let formattedPrice = response[i].price.toFixed(2);

        //generate blog post url for products using product id
        let blogURL = `./product.html?id=${productId}`;

        products.innerHTML += `
            <div class="product">
                <div class="img--section">
                    <div class="product-img-container">
                       <img src="${response[i].image}" alt="" class="title">
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
                    <h4 class="product--category">${response[i].category}</h4>
                    <p class="product--description">${
                      description.length > 62
                        ? description.substring(0, 62).concat("... ")
                        : description
                    }</p>
                    <div class="product-price-container">
                    <h3 class="price">$${formattedPrice}</h3>
                    <a href="#" data-productId="${
                      response[i].id
                    }" class="add-to-cart"><i class="fas fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div>
           `;
      }

      // Add event listeners to "Add to Cart" buttons
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          let productId = button.getAttribute("data-productId");
          addToCart(productId);
        });
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Add item to cart
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Update cart count
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
    cartCountElement.textContent = totalCount;
  }

  // Initialize cart count on page load
  updateCartCount();
  fetchProduct("https://fakestoreapi.com/products?limit=5");
});
