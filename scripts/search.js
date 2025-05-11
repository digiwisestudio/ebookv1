// Search functionality for the BookHaven Library

document.addEventListener('DOMContentLoaded', function() {
  initSearchBar();
  initFilterTabs();
});

// Initialize search bar functionality
function initSearchBar() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  // Search on input change with debounce
  let debounceTimer;
  searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length >= 2) {
        performSearch(query);
      } else if (query.length === 0) {
        resetSearch();
      }
    }, 300);
  });

  // Search on button click
  searchBtn.addEventListener('click', function() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length >= 2) {
      performSearch(query);
    }
  });

  // Search on enter key
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length >= 2) {
        performSearch(query);
      }
    }
  });
}

// Perform search across books
function performSearch(query) {
  const bookCards = document.querySelectorAll('.book-card');
  let resultsFound = false;

  bookCards.forEach(card => {
    const title = card.querySelector('.book-title').textContent.toLowerCase();
    const author = card.querySelector('.book-author').textContent.toLowerCase();
    const category = card.querySelector('.book-category').textContent.toLowerCase();
    
    if (title.includes(query) || author.includes(query) || category.includes(query)) {
      card.style.display = 'block';
      resultsFound = true;
      
      // Highlight matching text
      highlightText(card.querySelector('.book-title'), query);
      highlightText(card.querySelector('.book-author'), query);
      highlightText(card.querySelector('.book-category'), query);
    } else {
      card.style.display = 'none';
    }
  });

  // Update UI to show search results status
  updateSearchResultsStatus(resultsFound, query);
}

// Initialize filter tabs
function initFilterTabs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Filter books by category
      const filter = this.dataset.filter;
      filterBooksByCategory(filter);
    });
  });
}

// Filter books by category
function filterBooksByCategory(category) {
  const bookCards = document.querySelectorAll('.book-card');
  
  if (category === 'all') {
    bookCards.forEach(card => {
      card.style.display = 'block';
    });
  } else {
    bookCards.forEach(card => {
      const bookCategory = card.dataset.category;
      if (bookCategory === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Reset pagination
  currentPage = 1;
  updatePagination();
}

// Highlight matching text in search results
function highlightText(element, query) {
  const originalText = element.textContent;
  const lowerText = originalText.toLowerCase();
  const index = lowerText.indexOf(query);
  
  if (index >= 0) {
    const before = originalText.substring(0, index);
    const match = originalText.substring(index, index + query.length);
    const after = originalText.substring(index + query.length);
    
    element.innerHTML = `${before}<span class="highlight">${match}</span>${after}`;
  }
}

// Reset search and remove highlights
function resetSearch() {
  const bookCards = document.querySelectorAll('.book-card');
  
  bookCards.forEach(card => {
    card.style.display = 'block';
    
    // Remove highlights
    const elements = [
      card.querySelector('.book-title'),
      card.querySelector('.book-author'),
      card.querySelector('.book-category')
    ];
    
    elements.forEach(el => {
      if (el) {
        el.innerHTML = el.textContent;
      }
    });
  });

  // Reset the active filter
  document.querySelector('.filter-tab[data-filter="all"]').click();
}

// Update search results status
function updateSearchResultsStatus(resultsFound, query) {
  // Get or create status element
  let statusElement = document.getElementById('search-status');
  if (!statusElement) {
    statusElement = document.createElement('div');
    statusElement.id = 'search-status';
    statusElement.style.textAlign = 'center';
    statusElement.style.margin = '1rem 0';
    statusElement.style.fontStyle = 'italic';
    
    const booksContainer = document.getElementById('books-container');
    booksContainer.parentNode.insertBefore(statusElement, booksContainer);
  }
  
  if (!resultsFound) {
    statusElement.textContent = `No results found for "${query}". Try a different search term.`;
    statusElement.style.display = 'block';
  } else {
    statusElement.style.display = 'none';
  }
}