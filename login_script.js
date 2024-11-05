// script.js
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulating login validation (add actual validation in a real application)
    if (email && password) {
        alert('Login successful!');
        window.location.href = 'index.html';  // Redirect to the main page
    } else {
        alert('Please enter valid credentials');
    }
}
