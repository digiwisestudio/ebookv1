// Dark mode functionality for the BookHaven Library

document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
});

// Initialize dark mode
function initDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check if user has already set a preference
  const darkModePreference = localStorage.getItem('darkMode');
  
  // Also check for system preference if no local storage preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial state based on preference
  if (darkModePreference === 'true' || (darkModePreference === null && prefersDarkMode)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
    updateHeaderForDarkMode(true);
  }
  
  // Add event listener for toggle changes
  darkModeToggle.addEventListener('change', function() {
    toggleDarkMode();
  });
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // Only auto-switch if user hasn't set a preference yet
    if (localStorage.getItem('darkMode') === null) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
      } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
      }
      updateHeaderForDarkMode(e.matches);
    }
  });
}

// Toggle dark mode
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  updateHeaderForDarkMode(isDarkMode);
  
  // Add animation class to enhance transition
  document.body.classList.add('theme-transition');
  setTimeout(function() {
    document.body.classList.remove('theme-transition');
  }, 1000);
  
  // Announce theme change for screen readers
  announceThemeChange(isDarkMode);
}

// Update header background for dark mode
function updateHeaderForDarkMode(isDarkMode) {
  const header = document.getElementById('header');
  if (isDarkMode) {
    if (window.scrollY < 100) {
      header.style.backgroundColor = 'rgba(26, 32, 44, 0.9)';
    }
  } else {
    if (window.scrollY < 100) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
  }
}

// Announce theme change for accessibility
function announceThemeChange(isDarkMode) {
  // Create announcement element for screen readers
  let announcement = document.getElementById('theme-announcement');
  if (!announcement) {
    announcement = document.createElement('div');
    announcement.id = 'theme-announcement';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.style.clip = 'rect(0, 0, 0, 0)';
    document.body.appendChild(announcement);
  }
  
  // Set the announcement text
  announcement.textContent = isDarkMode 
    ? 'Dark mode enabled' 
    : 'Light mode enabled';
  
  // Clear the announcement after a delay
  setTimeout(function() {
    announcement.textContent = '';
  }, 3000);
}