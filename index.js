let myLibrary = [];

function Book (title, author, pages, readState) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readState = readState,
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${readState}`;
    }
};

// const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");
// console.log(theHobbit.info());

function addBookToLibrary() {
    
}