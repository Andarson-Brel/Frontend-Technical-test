document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    const overlay = document.createElement('div');
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Check localStorage for dark mode status
    if (localStorage.getItem('darkMode') === 'enabled') {
        themeSwitch.checked = true; // Set the checkbox to checked
        enableDarkMode();  // Enable dark mode if it was previously enabled
    }

    // Toggle sidebar visibility
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        updateMenuIcon(); // Update the icon based on dark mode and sidebar state
    });

    // Close sidebar when clicking outside (on the overlay)
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        updateMenuIcon(); // Update the icon back
    });

    // Handle dark mode switch
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // Enable dark mode and store it in localStorage
    function enableDarkMode() {
        body.classList.add('dark-mode');
        header.classList.add("dark-mode")
        localStorage.setItem('darkMode', 'enabled'); // Save the state in localStorage
        updateMenuIcon();
    }

    // Disable dark mode and update localStorage
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        header.classList.remove("dark-mode")

        localStorage.setItem('darkMode', 'disabled'); // Save the state in localStorage
        updateMenuIcon();
    }

    // Function to update menu icon based on mode and sidebar state
    function updateMenuIcon() {
        if (body.classList.contains('dark-mode')) {
            if (sidebar.classList.contains('active')) {
                menuToggle.src = './Assets/close-dark.svg'; // Dark mode close icon
            } else {
                menuToggle.src = './Assets/hamburger-menu-dark.svg'; // Dark mode hamburger icon
            }
        } else {
            if (sidebar.classList.contains('active')) {
                menuToggle.src = './Assets/close-light.svg'; // Light mode close icon
            } else {
                menuToggle.src = './Assets/hamburger-menu-light.svg'; // Light mode hamburger icon
            }
        }
    }
});
