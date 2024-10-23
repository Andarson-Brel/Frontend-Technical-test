document.addEventListener('DOMContentLoaded', () => {
      const themeSwitch = document.getElementById('theme-switch');
      const body = document.body;
      const bottomNav = document.querySelector('.bottom-nav');
      const bottomNavIcons = document.querySelectorAll('.nav-icon'); // Select all bottom nav icons
  
      // Define light and dark icons for bottom navigation
      const iconSrcs = {
          light: [
          './Assets/nav-icons/home-dark.svg',
              './Assets/calendar.svg',
              './Assets/speakers.svg',
              './Assets/reports.svg',
              './Assets/user-circle.svg'
              
          ],
          dark: [
             './Assets/nav-icons/home-active.svg',
              './Assets/calender-dark.svg',
              './Assets/speaker-dark.svg',
              './Assets/report-dark.svg',
              './Assets/user-circle-dark.svg'
          ]
      };
  
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'enabled') {
          enableDarkMode();
      }
  
      themeSwitch.addEventListener('change', () => {
          if (themeSwitch.checked) {
              enableDarkMode();
          } else {
              disableDarkMode();
          }
      });
  
      function enableDarkMode() {
          body.classList.add('dark-mode');
          bottomNav.classList.add('dark-mode');  // Add dark mode to bottom nav
          switchIcons('dark');
          localStorage.setItem('darkMode', 'enabled');
      }
  
      function disableDarkMode() {
          body.classList.remove('dark-mode');
          bottomNav.classList.remove('dark-mode');  // Remove dark mode from bottom nav
          switchIcons('light');
          localStorage.setItem('darkMode', 'disabled');
      }
  
      function switchIcons(mode) {
          bottomNavIcons.forEach((icon, index) => {
              icon.src = iconSrcs[mode][index];
          });
      }
  });
