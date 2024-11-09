// Function to display cart items
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p class="price">Price: ₹${item.price}</p>
                <button class="delete-button" data-index="${index}">Delete</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += parseFloat(item.price);

        // Add event listener for the delete button
        const deleteButton = cartItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteCartItem(index);
        });
    });

    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
}

// Function to delete an item from the cart
function deleteCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemPrice = parseFloat(cartItems[index].price);
    cartItems.splice(index, 1); // Remove the item from the cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
    displayCartItems(); // Refresh the cart display
}

// Call the function to display items when the page loads
window.onload = displayCartItems;
