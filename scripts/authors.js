// Authors functionality for the BookHaven Library

document.addEventListener('DOMContentLoaded', function() {
  loadAuthors();
  initAuthorSearch();
});

// Load authors data
function loadAuthors() {
  // List of authors provided by the user
  const authors = [
    'Agatha Christie',
    'Albany Walker',
    'Alex Bostwick',
    'Amanda Lovelace',
    'Anthony Robbins',
    'Barbara Ann Kipfer',
    'Benjamin Graham',
    'Bo Sanchez',
    'Brandon Sanderson',
    'Brian Tracy',
    'Brianna Wiest',
    'Charlaine Harris',
    'Charles Duhigg',
    'Chinkee Tan',
    'Colleen Hoover',
    'CS Lewis',
    'Dale Carnegie',
    'Dan Brown',
    'Dean Koontz',
    'Donald Miller',
    'Gary Chapman',
    'Grant Cardone',
    'Gregg Braden',
    'Heidi McLaughlin',
    'Helen Fisher',
    'Iris Johansen',
    'J.K Rowling',
    'James Clear',
    'James Patterson',
    'Jean Sasson',
    'Jeffrey Gitomer',
    'Jim Rohn',
    'Joe Dispenza',
    'Joel Osteen',
    'John Eldredge',
    'John Grisham',
    'John Maxwell',
    'Jordan Belfort',
    'Julia Quinn',
    'Junji Ito',
    'Kevin Kwan',
    'Lang Leav',
    'Leil Lowndes',
    'Linwood Barclay',
    'Lisa Jewell',
    'Lisa Kleypas',
    'Lynne Graham',
    'Mackenzi Lee',
    'Margaret Truman',
    'Mark Manson',
    'Marty Neumeier',
    'Max Lucado',
    'Michelle Hodkin',
    'Mitch Albom',
    'Napoleon Hill',
    'Nicholas Sparks',
    'Ozamu Dazai',
    'Paula Hawkins',
    'Paulo Coelho',
    'Percy Jackson',
    'Peter Swanson',
    'Philip Yancey',
    'R.L. Stine',
    'Rainbow Rowell',
    'Rainer Maria Rilke',
    'Reid Taylor Jenkins',
    'Rhonda Byrne',
    'Rick Riordan',
    'Rick Warren',
    'Robert Greene',
    'Robert Kiyosaki',
    'Robin Sharma',
    'Robyn Schneider',
    'Sebastian Fitzek',
    'Sidney Sheldon',
    'Simon Sinek',
    'Somaiya Daud',
    'Sophie Kinsella',
    'Stasi Eldredge',
    'Stephen Covey',
    'Stephen King',
    'Steve Burns',
    'Steve Chandler',
    'Steve Harvey',
    'Toni Morrison',
    'Warren Buffet',
    'Zig Ziglar'
  ];
  
  // Generate random book count for each author (in a real app, this would come from actual data)
  const authorsWithData = authors.map(author => {
    return {
      name: author,
      bookCount: Math.floor(Math.random() * 30) + 1 // Random books count between 1 and 30
    };
  });
  
  // Sort authors by book count (most books first)
  authorsWithData.sort((a, b) => b.bookCount - a.bookCount);
  
  // Render authors
  renderAuthors(authorsWithData);
}

// Render authors list
function renderAuthors(authors) {
  const authorsList = document.getElementById('authors-list');
  authorsList.innerHTML = '';
  
  authors.forEach(author => {
    const authorCard = createAuthorCard(author);
    authorsList.appendChild(authorCard);
  });
}

// Create an author card element
function createAuthorCard(author) {
  const authorCard = document.createElement('div');
  authorCard.className = 'author-card';
  
  const authorName = document.createElement('h3');
  authorName.className = 'author-name';
  authorName.textContent = author.name;
  
  const authorBooks = document.createElement('p');
  authorBooks.className = 'author-books';
  authorBooks.textContent = `${author.bookCount} ${author.bookCount === 1 ? 'book' : 'books'}`;
  
  authorCard.appendChild(authorName);
  authorCard.appendChild(authorBooks);
  
  // Add click event to show author's books (placeholder for now)
  authorCard.addEventListener('click', function() {
    showAuthorBooks(author);
  });
  
  return authorCard;
}

// Show author's books (placeholder for now)
function showAuthorBooks(author) {
  console.log('Author books:', author);
  // In a real application, this would filter the books to show only this author's books
  alert(`Books by ${author.name}: ${author.bookCount} ${author.bookCount === 1 ? 'book' : 'books'}`);
  
  // Scroll to books section
  document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
  
  // Set the search input to the author's name
  document.getElementById('search-input').value = author.name;
  // Trigger the search
  document.getElementById('search-btn').click();
}

// Initialize author search
function initAuthorSearch() {
  const authorSearchInput = document.getElementById('author-search');
  
  authorSearchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    filterAuthors(query);
  });
}

// Filter authors based on search query
function filterAuthors(query) {
  const authorCards = document.querySelectorAll('.author-card');
  let resultsFound = false;
  
  authorCards.forEach(card => {
    const authorName = card.querySelector('.author-name').textContent.toLowerCase();
    
    if (authorName.includes(query)) {
      card.style.display = 'block';
      resultsFound = true;
      
      // Highlight matching text if query is not empty
      if (query) {
        highlightAuthorName(card.querySelector('.author-name'), query);
      } else {
        // Remove highlight if query is empty
        card.querySelector('.author-name').innerHTML = card.querySelector('.author-name').textContent;
      }
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show message if no results found
  updateAuthorSearchStatus(resultsFound, query);
}

// Highlight matching text in author name
function highlightAuthorName(element, query) {
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

// Update author search status
function updateAuthorSearchStatus(resultsFound, query) {
  // Get or create status element
  let statusElement = document.getElementById('author-search-status');
  if (!statusElement && query) {
    statusElement = document.createElement('div');
    statusElement.id = 'author-search-status';
    statusElement.style.textAlign = 'center';
    statusElement.style.margin = '1rem 0';
    statusElement.style.fontStyle = 'italic';
    
    const authorsList = document.getElementById('authors-list');
    authorsList.parentNode.insertBefore(statusElement, authorsList);
  }
  
  if (statusElement) {
    if (!resultsFound && query) {
      statusElement.textContent = `No authors found matching "${query}".`;
      statusElement.style.display = 'block';
    } else {
      statusElement.style.display = 'none';
    }
  }
}