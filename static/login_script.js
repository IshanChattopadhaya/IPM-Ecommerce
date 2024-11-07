// Toggle between Login and Signup forms
function toggleForms() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');

  loginForm.classList.toggle('hidden');
  signupForm.classList.toggle('hidden');
  signupBtn.classList.toggle('hidden');
  loginBtn.classList.toggle('hidden');
}

// Handle Login form submission
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      // Redirect to profile page
      window.location.href = '/profile';
    } else {
      const data = await response.json();
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred while logging in.");
  }
}

// Handle Signup form submission
async function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful! Please log in.");
      toggleForms();  // Switch to login form
    } else {
      alert("Signup failed: " + data.message);
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred while signing up.");
  }
}
