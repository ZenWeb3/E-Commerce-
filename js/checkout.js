// checkout.js
document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const totalAmountElement = document.getElementById("total-amount");
    const purchaseButton = document.getElementById("purchase-btn");

    function loadCartSummary() {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        let total = 0;
        orderSummary.innerHTML = ""; // Clear previous summary

        Promise.all(Object.keys(cart).map(async (productId) => {
            let quantity = cart[productId];
            let product = await fetchProductDetails(productId);
            let price = product.price;
            let itemTotal = price * quantity;
            total += itemTotal;

            // Append product details to order summary
            orderSummary.innerHTML += `
                <div class="order-item">
                    <p>${product.title} x ${quantity}</p>
                    <p>$${(price * quantity).toFixed(2)}</p>
                </div>
            `;
        })).then(() => {
            totalAmountElement.textContent = `$${total.toFixed(2)}`;
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

    purchaseButton.addEventListener("click", () => {
        alert("Purchase has been made! || CodeByZen");
        // Optionally, you can also clear the cart or redirect the user
        localStorage.removeItem("cart");
    });

    loadCartSummary();
});
