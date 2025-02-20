document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        // Example: Send the form data to the server (for demonstration only)
        const formData = {
            username: username,
            password: password
        };

        console.log('Form submitted:', formData);

        // Provide user feedback (for demonstration only)
        alert('Login successful! Username: ' + username);
        form.reset(); // Clear the form fields
    });
});
