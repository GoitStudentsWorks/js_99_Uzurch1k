// ==============================================================

import {
  saveBookToLocalStorage,
  removeBookFromLocalStorage,
} from './local-storage';

import { createButtonsPagination } from './pagination';

const refs = {
  emptyPage: document.querySelector('.empty-page'),
  shoppingList: document.querySelector('.shopping-list'),
  pagesContainer: document.querySelector('#pagination-wrapper'),
};

const perPage = 3;

// ==============================================================

function checkIsThereElementOnPage() {
  if (
    refs.pagesContainer === null &&
    refs.emptyPage === null &&
    refs.shoppingList === null
  ) {
    return;
  }

  islocalStorageEmpty();
}

checkIsThereElementOnPage();

function islocalStorageEmpty() {
  const books = JSON.parse(localStorage.getItem('shoppinglist')) || [];

  if (books.length === 0) {
    refs.emptyPage.classList.remove('hidden');
    return;
  }

  refs.emptyPage.classList.add('hidden');
  createMarkup(books);
}

function createMarkup(books) {
  const elementsMarkup = books.map(book => {
    return `<li class="shopping-item" data-book-id="${book._id}">
      <div class="shopping-photo">
        <img src="${book.book_image}" alt="book cover" />
      </div>
      <div class="shopping-content">
        <div>
          <p class="shopping-subtitle">${book.title}</p>
          <p class="genre">${book.list_name}</p>
          <p class="book-desc">${book.description}</p>
        </div>
        <p class="shopping-author">${book.author}</p>
      </div>
      <button type="button" class="shopping-trash">
        <svg width="18" height="18" class="trash-icon">
          <use href="./img/icons.svg#icon-shopp-trash"></use>
        </svg>
      </button>

      <div class="shop-buttons">
        <a href="#" target="_blank" class="shop-amazon">
          <img
            src="./img/shopping/amazon.png"
            alt="Logo of shop"
            width="62"
          />
        </a>
        <a href="#" target="_blank" class="shop-apple">
          <img
            src="./img/shopping/book-apple.png"
            alt="Logo of shop"
            width="33"
          />
        </a>
      </div>
    </li>`;
  });

  markupRender(elementsMarkup);
}

function markupRender(elementsMarkup) {
  const markup = elementsMarkup.join('');
  refs.shoppingList.insertAdjacentHTML('beforeend', markup);

  addListenersToRemoveButtons();
  generateNumbers(perPage);
  checkQuantityElements();
}

function generateNumbers() {
  const collectionBooks = Array.from(
    refs.shoppingList.querySelectorAll('.shopping-item')
  );

  const totalPages = Math.ceil(collectionBooks.length / perPage);

  const booksGroupByPage = [];

  for (let i = 0; i < totalPages; i += 1) {
    booksGroupByPage[i] = collectionBooks.slice(i * 3, i * 3 + (i + 3));
  }
}

function checkQuantityElements() {
  const books = refs.shoppingList.querySelectorAll('.shopping-item');

  if (books.length > 3) {
    createButtonsPagination();
  }
}

function addListenersToRemoveButtons() {
  const booksCollection = refs.shoppingList.querySelectorAll('.shopping-item');

  booksCollection.forEach(book => {
    book.addEventListener('click', removeBook);
  });
}

function removeBook(evt) {
  if (
    evt.target.classList.contains('shopping-trash') ||
    evt.target.nodeName === 'use' ||
    evt.target.nodeName === 'svg'
  ) {
    const currentBook = evt.currentTarget;
    const bookId = evt.currentTarget.dataset.bookId;

    removeBookFromLocalStorage(bookId);
    currentBook.remove();

    isShoppingListEmpty();
  }
}

function isShoppingListEmpty() {
  const booksCollection = refs.shoppingList.querySelectorAll('.shopping-item');

  console.log(booksCollection);

  if (booksCollection.length === 0) {
    refs.emptyPage.classList.remove('hidden');
    return;
  }

  if (booksCollection.length > 3) {
    createButtonsPagination();
  } else {
    refs.pagesContainer.classList.add('hidden');
  }
}
