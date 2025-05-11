// UI enhancement functionality for the BookHaven Library

document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
  adjustLayoutOnResize();
  enhanceAccessibility();
});

// Initialize animations
function initAnimations() {
  // Animate elements when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Elements to animate
  const animatedElements = document.querySelectorAll('.section-title, .book-card, .author-card');
  animatedElements.forEach(el => {
    observer.observe(el);
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Add the animation class
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      .pulse {
        animation: pulse 2s infinite;
      }
    </style>
  `);
  
  // Add pulse animation to CTA buttons
  const ctaButtons = document.querySelectorAll('.primary-btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.classList.add('pulse');
    });
    btn.addEventListener('mouseleave', function() {
      this.classList.remove('pulse');
    });
  });
}

// Adjust layout based on screen size
function adjustLayoutOnResize() {
  // Function to handle layout changes
  function handleResize() {
    const width = window.innerWidth;
    
    // Adjust books per page based on screen size
    if (width < 576) {
      booksPerPage = 4;
    } else if (width < 768) {
      booksPerPage = 6;
    } else if (width < 992) {
      booksPerPage = 8;
    } else {
      booksPerPage = 12;
    }
    
    // Re-render books with new pagination
    if (typeof currentBooks !== 'undefined' && currentBooks.length > 0) {
      totalPages = Math.ceil(currentBooks.length / booksPerPage);
      if (currentPage > totalPages) currentPage = totalPages;
      renderBooks(currentBooks, currentPage);
      updatePagination();
    }
  }
  
  // Initial adjustment
  handleResize();
  
  // Listen for window resize events
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });
}

// Enhance accessibility
function enhanceAccessibility() {
  // Add aria labels to interactive elements
  document.querySelectorAll('button, a').forEach(el => {
    if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
      const icon = el.querySelector('i');
      if (icon) {
        const iconClass = Array.from(icon.classList).find(cls => cls.startsWith('fa-'));
        if (iconClass) {
          const label = iconClass.replace('fa-', '').replace(/-/g, ' ');
          el.setAttribute('aria-label', label);
        }
      }
    }
  });
  
  // Add skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.setAttribute('tabindex', '0');
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add styles for skip link
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        padding: 8px;
        background-color: var(--primary-color);
        color: white;
        z-index: 1000;
        transition: top 0.3s;
      }
      .skip-link:focus {
        top: 0;
      }
      
      /* Focus styles */
      a:focus, button:focus, input:focus {
        outline: 2px solid var(--secondary-color);
        outline-offset: 2px;
      }
      
      /* Highlight style */
      .highlight {
        background-color: var(--secondary-light);
        padding: 0 2px;
        border-radius: 2px;
      }
    </style>
  `);
  
  // Add main-content id to books section
  document.getElementById('books').id = 'main-content';
  
  // Ensure all interactive elements are keyboard accessible
  document.querySelectorAll('.book-card, .author-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}