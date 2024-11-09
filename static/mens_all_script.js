// Array to store cart items
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update cart items in local storage
function updateCartStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to add an item to the cart
function addToCart(item) {
    cartItems.push(item);
    updateCartStorage();
    alert("Item added to cart!");
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemElement = button.parentElement;
        const item = {
            title: itemElement.querySelector('h2').textContent,
            description: itemElement.querySelector('p').textContent,
            price: itemElement.querySelector('.price').textContent.replace('Price: ₹', ''),
            image: itemElement.previousElementSibling.src
        };
        addToCart(item);
    });
});
