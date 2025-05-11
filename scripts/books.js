// Books functionality for the BookHaven Library

// Global variables for pagination
let currentPage = 1;
let booksPerPage = 12;
let totalPages = 1;
let currentBooks = [];

document.addEventListener('DOMContentLoaded', function() {
  loadBooks();
  initPagination();
});

// Load books data
function loadBooks() {
  // Book categories mapped to our filter tabs
  const categories = {
    'popular': 'Popular and Best Sellers',
    'education': 'Education and Learning',
    'fiction': 'Fiction and Literature',
    'self-improvement': 'Self-Improvement and Motivation',
    'business': 'Business and Professional Skills'
  };

  // Sample books data (in a real application, this would come from an API or database)
  const sampleBooks = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'self-improvement',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'business',
      image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Deep Work',
      author: 'Cal Newport',
      category: 'self-improvement',
      image: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      category: 'education',
      image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      category: 'fiction',
      image: 'https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'fiction',
      image: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      category: 'business',
      image: 'https://images.pexels.com/photos/256453/pexels-photo-256453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      category: 'fiction',
      image: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      category: 'self-improvement',
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: 'education',
      image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      category: 'fiction',
      image: 'https://images.pexels.com/photos/2064487/pexels-photo-2064487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Zero to One',
      author: 'Peter Thiel',
      category: 'business',
      image: 'https://images.pexels.com/photos/1738053/pexels-photo-1738053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Educated',
      author: 'Tara Westover',
      category: 'education',
      image: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The Four Agreements',
      author: 'Don Miguel Ruiz',
      category: 'self-improvement',
      image: 'https://images.pexels.com/photos/3747455/pexels-photo-3747455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      category: 'business',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Dune',
      author: 'Frank Herbert',
      category: 'fiction',
      image: 'https://images.pexels.com/photos/3646105/pexels-photo-3646105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      category: 'self-improvement',
      image: 'https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      category: 'education',
      image: 'https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Start with Why',
      author: 'Simon Sinek',
      category: 'business',
      image: 'https://images.pexels.com/photos/3747497/pexels-photo-3747497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: '1984',
      author: 'George Orwell',
      category: 'fiction',
      image: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Man\'s Search for Meaning',
      author: 'Viktor E. Frankl',
      category: 'self-improvement',
      image: 'https://images.pexels.com/photos/3182821/pexels-photo-3182821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Principles',
      author: 'Ray Dalio',
      category: 'business',
      image: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      category: 'self-improvement',
      image: 'https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Outliers',
      author: 'Malcolm Gladwell',
      category: 'education',
      image: 'https://images.pexels.com/photos/3747498/pexels-photo-3747498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  // Add "popular" category to some books
  sampleBooks.forEach((book, index) => {
    if (index % 5 === 0) {
      book.isPopular = true;
      if (!book.categories) book.categories = [];
      book.categories.push('popular');
    }
  });

  // Mark all books for the "all" category
  sampleBooks.forEach(book => {
    book.categories = book.categories || [];
    book.categories.push('all');
    book.displayCategory = categories[book.category] || book.category;
  });

  // Store books and render first page
  currentBooks = sampleBooks;
  totalPages = Math.ceil(currentBooks.length / booksPerPage);
  renderBooks(currentBooks, currentPage);
  updatePagination();
}

// Render books with pagination
function renderBooks(books, page) {
  const booksContainer = document.getElementById('books-container');
  booksContainer.innerHTML = '';
  
  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;
  const booksToShow = books.slice(start, end);
  
  if (booksToShow.length === 0) {
    const noBooks = document.createElement('p');
    noBooks.textContent = 'No books found matching your criteria.';
    noBooks.style.textAlign = 'center';
    noBooks.style.width = '100%';
    noBooks.style.padding = '2rem';
    booksContainer.appendChild(noBooks);
    return;
  }
  
  booksToShow.forEach(book => {
    const bookCard = createBookCard(book);
    booksContainer.appendChild(bookCard);
  });
}

// Create a book card element
function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  bookCard.dataset.category = book.category;
  if (book.isPopular) bookCard.dataset.popular = true;
  
  const bookCover = document.createElement('div');
  bookCover.className = 'book-cover';
  
  const coverImg = document.createElement('img');
  coverImg.src = book.image;
  coverImg.alt = `${book.title} cover`;
  bookCover.appendChild(coverImg);
  
  const bookInfo = document.createElement('div');
  bookInfo.className = 'book-info';
  
  const bookTitle = document.createElement('h3');
  bookTitle.className = 'book-title';
  bookTitle.textContent = book.title;
  
  const bookAuthor = document.createElement('p');
  bookAuthor.className = 'book-author';
  bookAuthor.textContent = `By ${book.author}`;
  
  const bookCategory = document.createElement('span');
  bookCategory.className = 'book-category';
  bookCategory.textContent = book.displayCategory;
  
  bookInfo.appendChild(bookTitle);
  bookInfo.appendChild(bookAuthor);
  bookInfo.appendChild(bookCategory);
  
  bookCard.appendChild(bookCover);
  bookCard.appendChild(bookInfo);
  
  // Add click event to show book details (could expand to a modal in a real app)
  bookCard.addEventListener('click', function() {
    showBookDetails(book);
  });
  
  return bookCard;
}

// Show book details (placeholder for now)
function showBookDetails(book) {
  console.log('Book details:', book);
  // In a real application, this would show a modal with book details
  alert(`Title: ${book.title}\nAuthor: ${book.author}\nCategory: ${book.displayCategory}`);
}

// Initialize pagination controls
function initPagination() {
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  
  prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      renderBooks(currentBooks, currentPage);
      updatePagination();
    }
  });
  
  nextPageBtn.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      renderBooks(currentBooks, currentPage);
      updatePagination();
    }
  });
}

// Update pagination UI
function updatePagination() {
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');
  
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
  
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  
  // Scroll to top of books section
  if (currentPage > 1) {
    document.getElementById('books').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}