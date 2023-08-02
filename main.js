
function Library() {
    this.books = [];
}


Library.prototype.container = document.getElementById('library');
//Returns index
Library.prototype.addBookToLibrary = function(book) {
    return (this.books.push(book) - 1);
}
Library.prototype.showBooks = function() {

    this.books.forEach(book => !book.onScreen && this.addBookToView(book));

}
Library.prototype.addBookToView = function(book) {
    //Definitions
    const bookContainer = document.createElement('div');
    const bookImageContainer = document.createElement('div');
    const bookImage = document.createElement('img');
    const bookTitle = document.createElement('h3');

    const bookInfoContainer = document.createElement('div');
    const bookAuthorContainer = document.createElement('p');
    const bookPagesContainer = document.createElement('p');

    const bookOptionsContainer = document.createElement('div');
    const bookStatusButton = document.createElement('button');
    const bookDeleteButton = document.createElement('button');
    
    // Properties

    bookContainer.classList.add('book');
    bookImageContainer.classList.add('image');
    bookImage.src = book.url ?? './assets/default.jpg';
    bookImage.alt = 'Book Photo';
    bookTitle.innerText = book.title;

    bookInfoContainer.classList.add('info');
    bookAuthorContainer.innerHTML = `<span>Author</span>${book.author}`;
    bookPagesContainer.innerHTML = `<span>Pages</span>${book.pages}`;

    bookOptionsContainer.classList.add('options');
    bookStatusButton.innerText = book.status;
    bookDeleteButton.innerText = 'Delete';

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
}
// Library.prototype.bookStatusString = function(book) {
//     const status = {
//         read: 'read',
//         unread: 'unread',

//     }
// }


function Book(title, author, pages, status, url = null) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.url = url;
    this.onScreen = false;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
}

const library = new Library();

library.addBookToLibrary(new Book('Eloquent JavaScript', 'Marijin Haverbeke', 17, 'Unread', 'https://eloquentjs-es.thedojo.mx/img/cover.jpg'))
library.addBookToLibrary(new Book('Kimetsu no Yaiba', 'Koyoharu Gotōge', 23, 'Reading', 'https://i.pinimg.com/736x/e0/51/9a/e0519a6134d90926021cc40269cae405.jpg'))
library.addBookToLibrary(new Book('Default', 'Unknown', 999, 'Unread'))

library.showBooks();
