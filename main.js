const libraryDiv = document.getElementById('library');

function Library() {
    this.books = [];
}

//Returns index
Library.prototype.addBookToLibrary = function(book) {
    return (this.books.push(book) - 1);
}


function Book(title, author, pages, read, url = null) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.url = url;
}
Book.prototype.info = function() {
    return `${this.title} by ${author}, ${pages} pages, ${this.read ? 'read' : 'not read yet'}`;
}

