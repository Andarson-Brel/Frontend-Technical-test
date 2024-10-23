document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const tds = document.querySelectorAll('td');
    const eventHistory = document.querySelector('.events-history');
    const mainContent = document.querySelector('.main-content');
    const sortLabel = document.querySelector('.sort-label');
    const dots = document.querySelector('.dots-vertical');
    const dataCount = document.querySelector('.display-count');
    const activeLink = document.querySelector('.active-link');
    const activeLinkImage = activeLink.querySelector('img');
    const cards = document.querySelectorAll('.card');
    const chartCards = document.querySelectorAll('.chart-card');
    const inputs = document.querySelectorAll('input, select');
    const cardHeading = document.querySelectorAll('.card-hearding');
    const buttons = document.querySelectorAll('button, .prev-btn, .next-btn, .page-btn');
    const pagination = document.querySelectorAll('.pagination, .pagination-container select');
    const tableHead = document.querySelectorAll('.table-head');

    // Modal related elements
    const modal = document.getElementById('eventModal');
    const modalContent = document.querySelector('.modal-content');
    const modalActions = document.querySelector('.modal-actions');
    const modalCloseBtn = document.querySelector('.close-btn');
    
    const darkModeImageSrc = './Assets/nav-icons/home-dark.svg'; 
    const lightModeImageSrc = './Assets/nav-icons/home-active.svg'; 

    // Check if dark mode was previously enabled and set the switch state
    if (localStorage.getItem('darkMode') === 'enabled') {
        themeSwitch.checked = true;
        enableDarkMode();  // Enable dark mode if it was previously enabled
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
        // Trigger hard reload after updating dark mode state
        setTimeout(() => {
            location.reload();
        }, 100);  // Delay the reload to allow localStorage to update
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        sidebar.classList.add('dark-mode');
        cards.forEach(card => card.classList.add('dark-mode'));
        chartCards.forEach(chartCard => chartCard.classList.add('dark-mode'));
        inputs.forEach(input => input.classList.add('dark-mode'));
        buttons.forEach(button => button.classList.add('dark-mode'));
        pagination.forEach(pag => pag.classList.add('dark-mode'));
        mainContent.classList.add('dark-mode');
        activeLink.classList.add('dark-mode');
        eventHistory.classList.add('dark-mode');
        dataCount.classList.add('dark-mode');
        sortLabel.classList.add('dark-mode');
        dots.classList.add('dark-mode');
        tds.forEach(td => td.classList.add('dark-mode'));
        cardHeading.forEach(td => td.classList.add('dark-mode'));
        tableHead.forEach(th => th.classList.add('dark-mode'));

        // Modal dark mode
        modal.classList.add('dark-mode');
        modalContent.classList.add('dark-mode');
        modalActions.classList.add('dark-mode');
        modalCloseBtn.classList.add('dark-mode');

        // Change the active link image to dark mode version
        if (activeLinkImage) {
            activeLinkImage.src = darkModeImageSrc;
        }

        localStorage.setItem('darkMode', 'enabled');  // Save preference
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        sidebar.classList.remove('dark-mode');
        cards.forEach(card => card.classList.remove('dark-mode'));
        chartCards.forEach(chartCard => chartCard.classList.remove('dark-mode'));
        inputs.forEach(input => input.classList.remove('dark-mode'));
        buttons.forEach(button => button.classList.remove('dark-mode'));
        pagination.forEach(pag => pag.classList.remove('dark-mode'));
        mainContent.classList.remove('dark-mode');
        activeLink.classList.remove('dark-mode');
        eventHistory.classList.remove('dark-mode');
        dataCount.classList.remove('dark-mode');
        sortLabel.classList.remove('dark-mode');
        dots.classList.remove('dark-mode');
        tds.forEach(td => td.classList.remove('dark-mode'));
        cardHeading.forEach(td => td.classList.remove('dark-mode'));
        tableHead.forEach(th => th.classList.remove('dark-mode'));

        // Modal dark mode removal
        modal.classList.remove('dark-mode');
        modalContent.classList.remove('dark-mode');
        modalActions.classList.remove('dark-mode');
        modalCloseBtn.classList.remove('dark-mode');

        // Change the active link image to light mode version
        if (activeLinkImage) {
            activeLinkImage.src = lightModeImageSrc;
        }

        localStorage.setItem('darkMode', 'disabled');  // Save preference
    }
});
