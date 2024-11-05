// cart.js

// Sample products
const products = [
    { id: 1, name: 'Leaf Curtain', price: 389, img: 'deal1.jpg' },
    { id: 2, name: 'Women\'s Clothing', price: 689, img: 'deal2.jpg' }
];

// Cart array
let cart = [];

// Load cart items on page load
document.addEventListener('DOMContentLoaded', loadCart);

// Function to load cart items
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: <button onclick="updateQuantity(${item.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${item.id}, 1)">+</button></p>
            </div>
        `;
        cartItems.appendChild(itemDiv);
    });
    updateTotal();
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    loadCart();
}

// Function to update item quantity
function updateQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    product.quantity += change;

    if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    loadCart();
}

// Function to update the cart total
function updateTotal() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('cartTotal').textContent = total;
}

// Function to proceed to payment
function proceedToPayment() {
    if (cart.length > 0) {
        alert("Proceeding to payment...");
        window.location.href = 'payment.html';
    } else {
        alert("Your cart is empty!");
    }
}
