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
    


// let myLibrary = [];

// function Book (title, author, pages, readState) {
//     this.title = title,
//     this.author = author,
//     this.pages = pages,
//     this.readState = readState,
//     this.info = function () {
//         return `${title} by ${author}, ${pages} pages, ${readState}`;
//     }
// };

// const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");
// console.log(theHobbit.info());

// function addBookToLibrary() {
    
// }