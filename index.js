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

    hidePopup(e)

}

//Event Listener for popup submit

popupContainer.addEventListener("submit", addBookToLibrary)

//Function to create book display on web page

function showBookOnPage (author = "John Doe", image = "./anomaly-oRskqiH7FNc-unsplash.jpg", pages = "100", state = "unread", bTitle = "Jennifer Volcano of Oz") {
    
    const cardContainer = document.querySelector(".card-container");
    const card = document.createElement("div");
    card.classList.add("card", "newCard")

    const cardContent = `<img class="media-image" src="${image}" alt="book image">` + 
                        `<div class="details">` +
                            `<p class="book-name"><span>Title</span><br> ${bTitle} </p>` +
                            `<hr>` +
                            `<p class="author"><span>Author:   </span>${author}</p>` +
                            `<hr>` +
                            `<p class="pages"><span>Pages:   </span>${pages}</p>` +
                        `</div>` +
                        `<div class="card-buttons">` +
                            `<button class="${state + "-state"}">${state}</button>` +
                            `<svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor"  d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>` +
                        `</div>` +
                    `</div>`;
    
    card.innerHTML = cardContent
    cardContainer.append(card);
    card.scrollIntoView({behavior: "smooth"});

}





const moon = document.querySelector(".dmode");
moon.addEventListener("click", () => {showBookOnPage()});




// const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");
// console.log(theHobbit.info());

