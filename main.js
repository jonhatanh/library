// Form validation
const validateInputs = [
  {
    name: "title",
    element: document.getElementById("title"),
    errors: {
      valueMissing: "You need to enter a title",
      tooShort: "The title is too short!",
      tooLong: `The title is too long! (Max length: 99)`,
    },
  },
  {
    name: "author",
    element: document.getElementById("author"),
    errors: {
      valueMissing: "You need to enter an author",
      tooShort: "The author name is too short!",
      tooLong: `The author is too long! (Max length: 99)`,
    },
  },
  {
    name: "pages",
    element: document.getElementById("pages"),
    errors: {
      valueMissing: "You need to enter the number of pages",
      rangeUnderflow: `The number of pages is to low! (Min: 1)`,
      rangeOverflow: `The number of pages are too big! (Max: 9999)`,
    },
  },
  {
    name: "cover",
    element: document.getElementById("cover"),
    errors: {
      typeMismatch: `The url is invalid! Please type it correctly`,
    },
  },
];

//Add listeners
validateInputs.forEach(({ name, element, errors }) => {
    console.log({name, element, errors});
  element.addEventListener("input", (event) => {
    element.validity.valid ? clearError(name) : showErrors(element, errors);
  });
});

function Library() {
  this.books = [];
}
Library.prototype.container = document.getElementById("library");
Library.prototype.booksRead = document.getElementById("booksRead");
Library.prototype.booksReading = document.getElementById("booksReading");
Library.prototype.booksUnread = document.getElementById("booksUnread");
Library.prototype.booksTotal = document.getElementById("booksTotal");

Library.prototype.changeBookStatus = function (book) {
  if (book.status.toLowerCase() === "unread") {
    book.status = "Reading";
  } else if (book.status.toLowerCase() === "reading") {
    book.status = "Read";
  } else {
    book.status = "Unread";
  }
  document.querySelector(
    `button[data-title="${book.title}"].status`
  ).innerText = book.status;
  const bookContainer = document.querySelector(
    `div[data-title="${book.title}"].book`
  );
  bookContainer.classList.remove("unread", "read", "reading");
  bookContainer.classList.add(book.status.toLowerCase());
  library.updateBooksStats();
};
Library.prototype.deleteBook = function (book) {
  const bookIndex = this.books.indexOf(book);
  this.books.splice(bookIndex, 1);
  document.querySelector(`div[data-title="${book.title}"].book`).remove();
  library.updateBooksStats();
};
Library.prototype.getBookByTitle = function (bookTitle) {
  return this.books.find((book) => book.title === bookTitle);
};

//Returns index
Library.prototype.addBookToLibrary = function (book) {
  this.books.push(book);
  library.updateBooksStats();
};
Library.prototype.showBooks = function () {
  this.books.forEach((book) => !book.onScreen && this.addBookToView(book));
};
Library.prototype.addBookToView = function (book) {
  //Definitions
  const bookContainer = document.createElement("div");
  const bookImageContainer = document.createElement("div");
  const bookImage = document.createElement("img");
  const bookTitle = document.createElement("h3");

  const bookInfoContainer = document.createElement("div");
  const bookAuthorContainer = document.createElement("p");
  const bookPagesContainer = document.createElement("p");

  const bookOptionsContainer = document.createElement("div");
  const bookStatusButton = document.createElement("button");
  const bookDeleteButton = document.createElement("button");

  // Properties
  bookContainer.classList.add("book");
  bookContainer.classList.add(book.status.toLowerCase());
  bookContainer.setAttribute("data-title", book.title);
  bookImageContainer.classList.add("image");
  bookImage.src = book.url ?? "./assets/default.jpg";
  bookImage.alt = "Book Photo";
  bookTitle.innerText = book.title;

  bookInfoContainer.classList.add("info");
  bookAuthorContainer.innerHTML = `<span>Author</span>${
    book.author.length > 25 ? book.author.slice(0, 20) + "..." : book.author
  }`;
  bookPagesContainer.innerHTML = `<span>Pages</span>${book.pages}`;

  bookOptionsContainer.classList.add("options");
  bookStatusButton.innerText = book.status;
  bookStatusButton.setAttribute("data-title", book.title);
  bookStatusButton.classList.add("status");
  bookDeleteButton.innerText = "Delete";
  bookDeleteButton.setAttribute("data-title", book.title);
  bookDeleteButton.classList.add("delete");

  //DOM
  bookImageContainer.appendChild(bookImage);
  bookImageContainer.appendChild(bookTitle);

  bookInfoContainer.appendChild(bookAuthorContainer);
  bookInfoContainer.appendChild(bookPagesContainer);

  bookOptionsContainer.appendChild(bookStatusButton);
  bookOptionsContainer.appendChild(bookDeleteButton);

  bookContainer.appendChild(bookImageContainer);
  bookContainer.appendChild(bookInfoContainer);
  bookContainer.appendChild(bookOptionsContainer);

  book.onScreen = true;

  this.container.appendChild(bookContainer);
};

function Book(title, author, pages, status, url = null) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.url = url;
  this.onScreen = false;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
};

const modal = document.getElementById("modal");
const bookForm = document.getElementById("bookForm");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
openModalBtn.addEventListener("click", (e) => {
  modal.classList.add("show");
  bookForm.classList.add("show");
});
closeModalBtn.addEventListener("click", (e) => {
  modal.classList.add("hidde");
  bookForm.classList.add("hidde");
});
modal.addEventListener("animationend", (e) => {
  if (e.animationName !== "closeModal") return;
  modal.classList.remove("show");
  bookForm.classList.remove("show");
  modal.classList.remove("hidde");
  bookForm.classList.remove("hidde");
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isInvalid = false;
  validateInputs.forEach(({ element, errors }) => {
    if (!element.validity.valid) {
      showErrors(element, errors);
      isInvalid = true;
    }
  });
  if (isInvalid) return;

  const formData = getFormData(e.target);
  const newBook = new Book(
    formData.title,
    formData.author,
    formData.pages,
    formData.status,
    formData.cover
  );
  e.target.reset();
  library.addBookToLibrary(newBook);
  library.showBooks();
});
function getFormData(form) {
  const formData = new FormData(form);
  const data = {
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    pages: formData.get("pages"),
    status: formData.get("status"),
    cover:
      formData.get("cover").trim() === "" ? null : formData.get("cover").trim(),
  };
  return data;
}
Library.prototype.qtyBooksByStatus = function (bookStatus) {
  return this.books.filter((book) => book.status === bookStatus).length;
};
Library.prototype.updateBooksStats = function () {
  const totalBooks = this.books.length;
  const readBooks = this.qtyBooksByStatus("Read");
  const readingBooks = this.qtyBooksByStatus("Reading");
  const unreadBooks = totalBooks - readBooks - readingBooks;
  this.booksRead.textContent = readBooks;
  this.booksReading.textContent = readingBooks;
  this.booksUnread.textContent = unreadBooks;
  this.booksTotal.textContent = totalBooks;
};

const library = new Library();

document.getElementById("library").addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") return;
  const book = library.getBookByTitle(e.target.dataset.title);
  e.target.classList.contains("status")
    ? library.changeBookStatus(book)
    : library.deleteBook(book);
});

library.addBookToLibrary(
  new Book(
    "Eloquent JavaScript",
    "Marijin Haverbeke",
    17,
    "Reading",
    "https://eloquentjs-es.thedojo.mx/img/cover.jpg"
  )
);
library.addBookToLibrary(
  new Book(
    "Kimetsu no Yaiba",
    "Koyoharu Gotōge",
    23,
    "Read",
    "https://i.pinimg.com/736x/e0/51/9a/e0519a6134d90926021cc40269cae405.jpg"
  )
);
library.addBookToLibrary(new Book("Default", "Unknown", 999, "Unread"));

library.showBooks();
library.updateBooksStats();

function clearError(inputName) {
  const errorSpan = document.getElementById(`${inputName}Error`);
  errorSpan.textContent = "";
}

function showErrors(input, validations) {
  const errorSpan = document.getElementById(`${input.id}Error`);
  for (const [validation, message] of Object.entries(validations)) {
    if (input.validity[validation]) {
      errorSpan.textContent = message;
      return;
    }
  }
}
