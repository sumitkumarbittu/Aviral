let cart = [];
let total = 0;

function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += price;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    total += price;
    displayCart();
}

function removeFromCart(index) {
    const item = cart[index];
    total -= item.price;
    cart.splice(index, 1);
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart
        .map((item, index) => `
            <p>${item.product} (${item.quantity}) - ₹${item.price} 
            <button onclick="removeFromCart(${index})">Remove</button></p>`)
        .join('');
    document.getElementById('totalAmount').innerText = `Total: ₹${total}`;
}



function searchProducts() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const productContainer = document.getElementById("productContainer");
    const products = productContainer.getElementsByClassName("product");

    Array.from(products).forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        const productDescription = product.querySelector("p")?.textContent.toLowerCase() || "";

        // Check if the search input matches either the name or description
        if (productName.includes(searchInput) || productDescription.includes(searchInput)) {
            product.style.display = "block";

            // Highlight matching text in the product name
            const highlightedName = productName.replace(
                new RegExp(searchInput, "gi"),
                match => `<mark>${match}</mark>`
            );
            product.querySelector("h3").innerHTML = highlightedName;
        } else {
            product.style.display = "none"; // Hide non-matching products
        }
    });
}

// Debounce function to optimize search performance
let debounceTimer;
document.getElementById("searchBar").addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => searchProducts(), 300); // Adjust debounce time as needed
});
const users = [
    { email: "user@example.com", password: "password123", name: "John Doe" },
    { email: "admin@example.com", password: "admin123", name: "Admin User" }
];

// Check login status when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userName = localStorage.getItem("userName");

    if (isLoggedIn && userName) {
        alert(`Welcome back, ${userName}!`);
        window.location.href = "index.html"; // Redirect if already logged in
    }
});

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Clear any previous error message

    if (!email || !password) {
        errorMessage.textContent = "Please fill in both email and password.";
        return;
    }

    // Find the user in the `users` array
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Save user login details in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", user.name);

        alert(`Welcome, ${user.name}!`);
        window.location.href = "index.html"; // Redirect to the main website
    } else {
        errorMessage.textContent = "Invalid email or password. Please try again.";
    }
});

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    alert("You have been logged out.");
    window.location.href = "login.html"; // Redirect back to login page
}

// Open the account modal
function openAccountModal() {
    const modal = document.getElementById("accountModal");
    modal.style.display = "flex"; // Show the modal
}

// Close the account modal
function closeAccountModal() {
    const modal = document.getElementById("accountModal");
    modal.style.display = "none"; // Hide the modal
}

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("accountModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
// Add order details to localStorage during checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    saveOrderDetails(cart);
    alert(`Thank you for your purchase! Total: ₹${total}`);
    cart = [];
    total = 0;
    displayCart();
}

function saveOrderDetails(order) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(...order);
    localStorage.setItem("orders", JSON.stringify(orders));
}


// Retrieve orders for the My Account modal
function getOrderDetails() {
    return JSON.parse(localStorage.getItem("orders")) || [];
}

// Populate the Orders section in My Account
function populateOrders() {
    const orders = getOrderDetails();
    const ordersList = document.querySelector(".modal-content ul");
    ordersList.innerHTML = "";

    orders.forEach(order => {
        const listItem = document.createElement("li");
        listItem.textContent = `${order.product} (${order.quantity}) - ₹${order.price}`;
        ordersList.appendChild(listItem);
    });
}
// Open the account modal and populate orders
function openAccountModal() {
    populateOrders(); // Ensure orders are updated
    const modal = document.getElementById("accountModal");
    modal.style.display = "flex"; // Show the modal
}

// Close the account modal
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeAccountModal();
    }
});
// Example: Simulate order placement during checkout
function placeOrder() {
    cart.forEach(item => saveOrderDetails(item));
    alert("Order placed successfully!");
    cart = [];
    total = 0;
    displayCart();
}
function filterByCategory(category) {
    const productContainer = document.getElementById("productContainer");
    const products = productContainer.getElementsByClassName("product");
    const categories = document.querySelectorAll(".category");

    // Update active category style
    categories.forEach(cat => cat.classList.remove("active"));
    categories.forEach(cat => {
        if (cat.textContent.includes(category)) cat.classList.add("active");
    });

    // Filter products
    Array.from(products).forEach(product => {
        const productCategory = product.getAttribute("data-category");

        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
// On successful login
localStorage.setItem("isLoggedIn", "true");

