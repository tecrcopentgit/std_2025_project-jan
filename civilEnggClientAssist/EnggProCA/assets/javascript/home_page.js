document.addEventListener("DOMContentLoaded", function() {
    // Check for Dark Mode Preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        const darkModeToggle = document.getElementById("darkModeToggle");
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }

    // Welcome Message
    const defDiv = document.querySelector(".def");
    if (defDiv) {
        const welcomeMessage = document.createElement("h2");
        welcomeMessage.id = "welcome-message";
        const userName = "John Doe"; // Replace with dynamic user name if available
        welcomeMessage.textContent = `Welcome, ${userName}!`;
        defDiv.insertBefore(welcomeMessage, defDiv.firstChild);
    }

    // Redirect to Settings Page when Objects Button is Clicked
    const objectsButton = document.querySelector(".navigator a[href='#objects']");
    if (objectsButton) {
        objectsButton.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "settings_page.html";
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", function() {
            const darkMode = localStorage.getItem('darkMode');
            if (darkMode !== 'enabled') {
                enableDarkMode();
                localStorage.setItem('darkMode', 'enabled');
            } else {
                disableDarkMode();
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        const sections = document.querySelectorAll(".content section");
        sections.forEach(section => section.classList.add("dark-mode-section"));
        const footer = document.querySelector("footer");
        if (footer) {
            footer.classList.add("dark-mode-footer");
        }
        const header = document.querySelector(".header");
        if (header) {
            header.classList.add("dark-mode-header");
        }
    }

    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        const sections = document.querySelectorAll(".content section");
        sections.forEach(section => section.classList.remove("dark-mode-section"));
        const footer = document.querySelector("footer");
        if (footer) {
            footer.classList.remove("dark-mode-footer");
        }
        const header = document.querySelector(".header");
        if (header) {
            header.classList.remove("dark-mode-header");
        }
    }

    // Location Toggle
    const locationToggle = document.getElementById("locationToggle");
    if (locationToggle) {
        locationToggle.addEventListener("change", function() {
            if (locationToggle.checked) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            } else {
                // Clear location data when toggle is turned off
                sessionStorage.removeItem("location");
                const locationOutput = document.getElementById("location-output");
                if (locationOutput) {
                    locationOutput.textContent = "";
                }
            }
        });
    }

    function showPosition(position) {
        const locationOutput = document.getElementById("location-output");
        if (locationOutput) {
            locationOutput.textContent = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        }
        // Store location in session storage
        sessionStorage.setItem("location", JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }));
    }

    function showError(error) {
        const locationToggle = document.getElementById("locationToggle");
        if (locationToggle) {
            locationToggle.checked = false;
        }
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

    // Check if location is already stored in session storage
    const storedLocation = sessionStorage.getItem("location");
    if (storedLocation) {
        const location = JSON.parse(storedLocation);
        const locationOutput = document.getElementById("location-output");
        if (locationOutput) {
            locationOutput.textContent = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
        }
        if (locationToggle) {
            locationToggle.checked = true;
        }
    }
});
