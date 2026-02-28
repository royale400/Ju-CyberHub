// theme.js

// Function to toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Set theme preference in local storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Function to set the initial theme based on stored preference
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        body.classList.add('light'); // Default to light mode
    }
}

// Load the initial theme when the document is ready
document.addEventListener('DOMContentLoaded', setInitialTheme);

// Example of how to use the toggleTheme
// You can call toggleTheme() on a button click
