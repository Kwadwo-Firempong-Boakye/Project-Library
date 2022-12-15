//Array of book objects

let myLibrary = [];

//Set up Add Book Popup

const addBookButton = document.querySelector(".add-book-button");
const popupContainer = document.querySelector(".pop-up");
const glass = document.querySelector(".glass");

function showPopup(e) {
    e.preventDefault();
    popupContainer.style.visibility = "visible";
    glass.style.visibility = "visible";
    popupContainer.style.transform = "translate(-50%, -50%) scale(1)";
}

function hidePopup(e) {
    popupContainer.style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => {
        popupContainer.style.visibility = "hidden";
        glass.style.visibility = "hidden";
    }, 300);
}

addBookButton.addEventListener("click", showPopup);
glass.addEventListener("click", hidePopup);

//Constructor function to create a book entry

function Book (title, author, image, pages, readState) {
    this.title = title,
    this.author = author,
    this.image = image,
    this.pages = pages,
    this.readState = readState,
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${readState}`;
    }
};
    
//Function to derive form inputs and create new book

function addBookToLibrary(e) {

    e.preventDefault();

    const bookTitle = document.querySelector("#user-book-title").value;
    const bookAuthor = document.querySelector("#user-book-author").value;
    const bookImage = document.querySelector("#user-book-url").value;
    const bookPages = document.querySelector("#user-book-pages").value;
    const radioButtons = document.getElementsByName("read-state");
    
    let bookReadState;

    radioButtons.forEach((item) => {
        if (item.checked) {
            bookReadState = item.value;
        }
    })

    myLibrary.push(new Book(bookTitle, bookAuthor, bookImage, bookPages, bookReadState));

}

//Event Listener for popup submit

popupContainer.addEventListener("submit", addBookToLibrary)


//



// const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");
// console.log(theHobbit.info());

