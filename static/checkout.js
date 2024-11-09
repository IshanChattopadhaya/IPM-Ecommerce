// Function to display checkout items
function displayCheckoutItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const finalTotalElement = document.getElementById('final-total');
    let totalPrice = 0;

    checkoutItemsContainer.innerHTML = '';

    cartItems.forEach((item) => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="checkout-item-image">
            <div class="checkout-item-details">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p class="price">Price: ₹${item.price}</p>
            </div>
        `;
        checkoutItemsContainer.appendChild(checkoutItem);
        totalPrice += parseFloat(item.price);
    });

    finalTotalElement.textContent = `₹${totalPrice.toFixed(2)}`;
}

// Function to handle order confirmation
function confirmOrder(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const fullName = document.getElementById('full-name').value;
    const addressLine1 = document.getElementById('address-line1').value;
    const addressLine2 = document.getElementById('address-line2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zip-code').value;

    if (fullName && addressLine1 && city && state && zipCode) {
        alert(`Order confirmed! Thank you, ${fullName}. Your order will be shipped to ${addressLine1}, ${addressLine2 ? addressLine2 + ',' : ''} ${city}, ${state}, ${zipCode}.`);
        // Clear the cart after confirmation
        localStorage.removeItem('cartItems');
        window.location.href = '/'; // Redirect to homepage or any other page after confirmation
    } else {
        alert('Please complete all required fields.');
    }
}

// Call the function to display items when the page loads
window.onload = displayCheckoutItems;

// Add event listener for the form submission
document.getElementById('address-form').addEventListener('submit', confirmOrder);
