//Render top books
export const renderTop = (data, booksPerRow) => {;
    const categoriesTop = data.map(el => {
        const catName = el.list_name;
        const books = renderOneBook(el.books.slice(0, booksPerRow))
        return `<div class="books-category-container">
        <h3 class="books-category-title">${catName}</h3>
        <ul class="books-list">${books}</ul>
        <div class="books-btn-container">
          <button data-catname="${catName}" type="button" class="books-btn">see more</button>
        </div>
      </div>`;
    }).join('');

    return `<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>${categoriesTop}</div>`;
}

//Render categories
export const renderCategories = (data) => {
  console.log(data)
  const categoriesItems = data.sort((a, b) => {
    if (a.list_name < b.list_name) {
      return -1;
    }
    if (a.list_name > b.list_name) {
      return 1;
    }
    return 0;
  })
  .map(el => {
    return `<li class="categories-list">
      <a href="#" data-catname="${el.list_name}" class="categories-nav">${el.list_name}</a>
    </li>`;
  }).join('');

  return `<li class="categories-list">
  <a href="#" data-catname="" class="categories-nav active">All categories</a>
  </li>${categoriesItems}`;
}

//Render category books
export const renderCategory = (data, categoryName) => {
    const books = renderOneBook(data)
    const categoryHtml = `<div class="books-container">
    <h2 class="books-title">${categoryName}</h2>
    <div class="books-category-container">
      <ul class="books-list">${books}</ul>
    </div>
  </div>`;

    return categoryHtml;
}

//Render one book
function renderOneBook(books) {
    const booksRendered = books.map(el => {
        const {_id, book_image, title, author} = el;
        return `<li class="books-item">
        <div class="books-wrapper">
          <img
            class="books-img"
            src="${book_image}"
            alt="${title}"
          />
          <a href="#" data-id="${_id}" class="books-overlay">
            QUICK VIEW
          </a>
        </div>
        <div class="books-info">
          <p class="books-info-title">${title}</p>
          <p class="books-info-author">${author}</p>
        </div>
      </li>`;
    }).join('');

    return booksRendered;
} 