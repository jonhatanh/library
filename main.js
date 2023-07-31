
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
Book.prototype.info = function() {
    return `${this.title} by ${author}, ${pages} pages, ${this.read ? 'readed' : 'not read yet'}`
}
