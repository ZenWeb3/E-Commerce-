// cart.js
document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout-btn");
    const cartCountElement = document.querySelector(".cart-badge"); 

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        let total = 0;
        let itemCount = 0;
        cartItemsContainer.innerHTML = ""; 

        Promise.all(Object.keys(cart).map(async (productId) => {
            let quantity = cart[productId];
            let product = await fetchProductDetails(productId);
            let price = product.price;
            let itemTotal = price * quantity;
            total += itemTotal;
            itemCount += quantity;
            let productHead = `${product.title}`;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                   <div class="cart-img">
                     <img src="${product.image}" alt="${product.title}">
                   </div>
                    <div class="item-details">
                        <h3>${productHead.length > 30 ? productHead.substring(0, 30).concat("...") : productHead}</h3>
                        <p>$${price.toFixed(2)}</p>
                        <input type="number" value="${quantity}" min="1" data-product-id="${productId}" class="quantity-input">
                        <button data-product-id="${productId}" class="remove-btn">Remove</button>
                    </div>
                </div>
            `;
        })).then(() => {
            updateSummary(total);
            updateCartCount(itemCount); 
        });
    }

    async function fetchProductDetails(productId) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    function updateSummary(total) {
        let discount = total * 0.10;
        let shipping = total * 0.01;
        let finalTotal = total - discount + shipping;

        subtotalElement.textContent = total.toFixed(2);
        discountElement.textContent = discount.toFixed(2);
        shippingElement.textContent = shipping.toFixed(2);
        totalElement.textContent = finalTotal.toFixed(2);
    }

    function updateCartCount(count) {
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            let productId = e.target.getAttribute("data-product-id");
            removeFromCart(productId);
        }
    });

    cartItemsContainer.addEventListener("input", (e) => {
        if (e.target.classList.contains("quantity-input")) {
            let productId = e.target.getAttribute("data-product-id");
            let quantity = parseInt(e.target.value, 10);
            updateQuantity(productId, quantity);
        }
    });

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        delete cart[productId];
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    function updateQuantity(productId, quantity) {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            cart[productId] = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    }

    checkoutButton.addEventListener("click", () => {
        alert("Proceed to checkout || CodeByZen");
        window.location.href = "./checkout.html";
    });

    loadCart();
});
