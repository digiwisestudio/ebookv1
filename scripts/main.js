// Main JavaScript file for the BookHaven Library

document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initHeader();
  initHero();
  initRequestForm();
  initDonationSection();
  initPrivacyNotice();
  initBackToTop();
  initMobileMenu();
});

// Header functionality
function initHeader() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.style.backgroundColor = 'var(--background-color)';
      header.style.boxShadow = '0 2px 10px var(--shadow-color)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      if (document.body.classList.contains('dark-mode')) {
        header.style.backgroundColor = 'rgba(26, 32, 44, 0.9)';
      }
    }
  });

  // Update active nav link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Hero section functionality
function initHero() {
  const getStartedBtn = document.getElementById('get-started');
  const learnMoreBtn = document.getElementById('learn-more');

  getStartedBtn.addEventListener('click', function() {
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
  });

  learnMoreBtn.addEventListener('click', function() {
    document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' });
  });
}

// Request form functionality
function initRequestForm() {
  const showRequestFormBtn = document.getElementById('show-request-form');
  const requestFormContainer = document.getElementById('request-form-container');

  showRequestFormBtn.addEventListener('click', function() {
    requestFormContainer.classList.toggle('hidden');
    if (!requestFormContainer.classList.contains('hidden')) {
      // Scroll to form
      requestFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Donation section functionality
function initDonationSection() {
  const donateButton = document.getElementById('donate-button');
  const thankYouMessage = document.getElementById('thank-you-message');
  const qrCode = document.getElementById('gcash-qr');

  donateButton.addEventListener('click', function() {
    // Simulate donation process
    thankYouMessage.classList.remove('hidden');
    setTimeout(function() {
      thankYouMessage.style.transform = 'scale(1)';
      thankYouMessage.style.opacity = '1';
    }, 100);

    // Hide the thank you message after 5 seconds
    setTimeout(function() {
      thankYouMessage.style.transform = 'scale(0.8)';
      thankYouMessage.style.opacity = '0';
      setTimeout(function() {
        thankYouMessage.classList.add('hidden');
      }, 500);
    }, 5000);
  });

  qrCode.addEventListener('click', function() {
    // Optionally: Open GCash app or show enlarged QR code
    alert('Scan this QR code with your GCash app to make a donation.');
  });
}

// Privacy notice functionality
function initPrivacyNotice() {
  const privacyNotice = document.getElementById('privacy-notice');
  const acceptPrivacyBtn = document.getElementById('accept-privacy');

  // Check if user has already accepted the privacy notice
  if (!localStorage.getItem('privacyAccepted')) {
    setTimeout(function() {
      privacyNotice.classList.add('active');
    }, 1000);
  }

  acceptPrivacyBtn.addEventListener('click', function() {
    privacyNotice.classList.remove('active');
    localStorage.setItem('privacyAccepted', 'true');
  });
}

// Back to top button functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a');

  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
  });

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });
}