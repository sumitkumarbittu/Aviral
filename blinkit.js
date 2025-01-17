// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    if (!email || !password) {
      errorMessage.textContent = "Please enter both email and password.";
      return;
    }
  
    // Dummy email and password validation (replace with your own logic)
    const validEmail = "maheshwariaviral05@gmail.com";
    const validPassword = "123";
  
    if (email === validEmail && password === validPassword) {
      window.location.href = "https://ambhijoshi.github.io/Aviral2/"; // Redirect to your e-commerce website
    } else {
      errorMessage.textContent = "Invalid email or password.";
    }
  });
  
  // Handle Create Account Form Submission
  document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
  
    if (!newEmail || !newPassword || !confirmPassword) {
      errorMessage.textContent = "Please fill in all fields.";
      return;
    }
  
    if (newPassword !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match.";
      return;
    }
  
    // Dummy registration (replace with actual server-side logic)
    // You can also add validation for email format here if needed
    window.location.href = "https://ambhijoshi.github.io/Aviral2/"; // Redirect after successful registration
  });
  
  // Show Create Account Form
  function showCreateAccountForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('create-account-form').style.display = 'block';
  }
  
  // Hide Create Account Form
  function hideCreateAccountForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('create-account-form').style.display = 'none';
  }
  
