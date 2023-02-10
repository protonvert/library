/* eslint-disable no-multi-spaces */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const addBookButton = document.querySelector('#add-book');
const bookGrid = document.querySelector('.book--grid');
const formPopUp = document.querySelector('.form-popup');
const submitBook = document.querySelector('#submit-new-book');
const exitForm = document.querySelector('img[src="icons/exit.svg"]');

let discardCard; // button for removing book card
let bookCardToggleRead; // button to toggle if a book is read

const myLibrary = []; // array of book objects

function Book() {
  // book object constructor
  let title = '';
  let author = '';
  let pages;
  let read = 'false';
}

Book.prototype = {

  setTitle(title) {
    this.title = title;
  },
  setAuthor(author) {
    this.author = author;
  },
  setPages(pages) {
    this.pages = pages;
  },
  setRead(readStatus) {
    this.read = readStatus;
  },
  updateReadStatus() {
    if (this.read === 'Read ✅') {
      this.setRead('Not Read ❌');
    } else if (this.read === 'Not Read ❌') {
      this.setRead('Read ✅');
    }
  },
  addCardToPage() {
    // this method creates a book card html element
    let bookCard = document.createElement('div');
    bookCard.setAttribute('class', `book--card ${this.title}`);
    let bookTitle = document.createElement('h1');
    bookTitle.setAttribute('class', 'book--card-bookTitle');
    let removeBook = document.createElement('img');
    removeBook.setAttribute('class', 'book--card-remove');
    removeBook.src = 'icons/exit.svg';

    let bookCardAuthor = document.createElement('h2');
    bookCardAuthor.setAttribute('class', 'book--card-author');

    let bookCardInfoSection = document.createElement('div');
    bookCardInfoSection.setAttribute('class', 'book--card-infosection');
    let bookCardPages = document.createElement('span');
    bookCardPages.setAttribute('class', 'book--card-pages');
    let bookCardRead = document.createElement('span');
    bookCardRead.setAttribute('class', 'book--card-read');
    bookCardInfoSection.appendChild(bookCardPages);
    bookCardInfoSection.appendChild(bookCardRead);
    bookCardInfoSection.setAttribute('class', 'book--card-infosection');
    let toggleRead = document.createElement('button');
    toggleRead.setAttribute('class', 'book--card-toggleRead');

    bookCard.appendChild(removeBook);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookCardAuthor);
    bookCard.appendChild(bookCardInfoSection);
    bookCard.appendChild(toggleRead);

    toggleRead.textContent = 'Update Read Status';
    bookTitle.textContent = this.title;
    bookCardAuthor.textContent = this.author;
    bookCardPages.textContent = `Pages: ${this.pages}`;
    bookCardRead.textContent = this.read;

    bookGrid.appendChild(bookCard);
  },
};

addBookButton.addEventListener('click', () => {
  // clicking this add book button makes form appear for book info entry
  formPopUp.style.display = 'block';
});

function acquireBookFormInfo() {
  // gathers info from the form and places it into new book
  let valueArray = Array.from(
    document.querySelectorAll('.form-container input'),
  );

  let attributeValues = valueArray.map((input) => `${input.value}`);

  let newBook = new Book();

  newBook.setTitle(attributeValues[0]);
  newBook.setAuthor(attributeValues[1]);
  newBook.setPages(attributeValues[2]);
  if (document.getElementById('not-read').checked) {
    newBook.setRead('Not Read ❌');
  } else if (document.getElementById('read').checked) {
    newBook.setRead('Read ✅');
  }
  myLibrary.push(newBook);
}

function refreshCards() {
  // refreshes all cards on page to align with myLibrary[]
  // re-applies event listeners
  bookGrid.innerHTML = '';
  myLibrary.forEach((bookElement) => {
    bookElement.addCardToPage();
  });
  bookCardToggleRead = document.querySelectorAll('.book--card-toggleRead');
  discardCard = document.querySelectorAll('.book--card-remove');

  for (let i = 0; i < bookCardToggleRead.length; i++) {
    bookCardToggleRead[i].addEventListener('click', () => {
      myLibrary[i].updateReadStatus();
      refreshCards();
    });
  }
  for (let i = 0; i < discardCard.length; i++) {
    discardCard[i].addEventListener('click', () => {
      myLibrary.remove(i);
      refreshCards();
    });
  }
}

myLibrary.remove = (index) => {
  // simplified version of splicing away an array item in myLibrary[]
  myLibrary.splice(index, 1);
  refreshCards();
};

submitBook.addEventListener('click', () => {
  // when clicking submit book button, removes form from view, acquires book info, creates new book
  // resets form info, and refreshes the cards
  event.preventDefault();
  formPopUp.style.display = 'none';
  acquireBookFormInfo();
  document.querySelector('.form-container').reset();
  refreshCards();
});

exitForm.addEventListener('click', () => {
  // x-style button to exit form
  document.querySelector('.form-container').reset();
  formPopUp.style.display = 'none';
});
