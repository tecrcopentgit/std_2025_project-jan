document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const generatedPasswordInput = document.getElementById('generatedPassword');
    const generatedPasswordContainer = document.getElementById('generatedPasswordContainer');
    const submitButton = document.getElementById('SignUp_button');
    const generatePasswordButton = document.getElementById('generatePasswordButton');

    // Function to check if the form is valid
    function checkFormValidity() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Regular expression to validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Regular expression to validate password (at least one uppercase letter and one special character)
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).+$/;

        // Check if email and password are valid
        if (emailPattern.test(email) && passwordPattern.test(password)) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#4CAF50'; // Green button color when enabled
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = 'gray'; // Change button color when disabled
        }
    }

    // Function to generate a random password
    function generateRandomPassword() {
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialCharacters = '!@#$%^&*()-_=+{};:,<.>';
        const allCharacters = 'abcdefghijklmnopqrstuvwxyz' + upperCaseLetters + '0123456789' + specialCharacters;
        
        let password = '';

        // Ensure at least one uppercase letter
        password += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
        // Ensure at least one special character
        password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
        // Generate remaining characters
        for (let i = password.length; i < 8; i++) {
            password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }

        // Shuffle the password to ensure randomness
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        return password;
    }

    // Initial check
    checkFormValidity();

    // Add event listeners for input changes
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('Please enter a valid email address (exampleName@gmail.com).');
            return;
        }

        if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).+$/.test(password)) {
            alert('Password must contain at least one uppercase letter and one special character.');
            return;
        }

        // Example: Send the form data to the server (for demonstration only)
        const formData = {
            email: email,
            password: password
        };

        console.log('Form submitted:', formData);

        // Provide user feedback (for demonstration only)
        alert('Form submitted successfully! Email: ' + email);
        form.reset(); // Clear the form fields
        checkFormValidity(); // Recheck form validity after resetting
        generatedPasswordContainer.style.display = 'none'; // Hide the generated password container
        generatePasswordButton.style.display = 'block'; // Ensure the generate button is shown for next submission
    });

    generatePasswordButton.addEventListener('click', function() {
        const randomPassword = generateRandomPassword();
        passwordInput.value = randomPassword;
        generatedPasswordInput.value = randomPassword;
        generatedPasswordContainer.style.display = 'block'; // Show the generated password container
        generatePasswordButton.style.display = 'none'; // Hide the generate password button
        checkFormValidity(); // Recheck form validity with the new password
    });
});

