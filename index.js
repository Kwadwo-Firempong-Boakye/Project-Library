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

function Book(title, author, image, pages, readState) {
	    (this.title = title),
		(this.author = author),
		(this.image = image),
		(this.pages = pages),
		(this.readState = readState),
		(this.primaryKey = (this.title + this.pages + this.author).replace(
			/\s/g,
			""
		));
	this.info = function () {
		return `${title} by ${author}, ${pages} pages, ${readState}`;
	};
}

//Add a few books to myLibrary Array

const lotr = new Book(
	"The Lord of the Rings",
	"J.R.R Tolkien",
	"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg",
	1178,
	"unread"
);
const hpatcos = new Book(
	"Harry Potter and the Chamber of Secrets",
    "J.K.Rowling",
	"https://m.media-amazon.com/images/I/91OINeHnJGL.jpg",
	357,
	"read"
);
myLibrary.push(lotr, hpatcos);

//Function to derive form inputs and create new book

function addBookToLibrary(e) {
	e.preventDefault();

	const bookTitle = document.querySelector("#user-book-title").value;
	const bookAuthor = document.querySelector("#user-book-author").value;
	let bookImage = document.querySelector("#user-book-url").value;
	const bookPages = document.querySelector("#user-book-pages").value;
	const radioButtons = document.getElementsByName("read-state");

	let bookReadState;

	radioButtons.forEach((item) => {
		if (item.checked) {
			bookReadState = item.value;
		}
	});

	if (bookImage == "") {
		bookImage = "./anomaly-oRskqiH7FNc-unsplash.jpg";
	}

	myLibrary.push(
		new Book(bookTitle, bookAuthor, bookImage, bookPages, bookReadState)
	);

	showBookOnPage(bookTitle, bookAuthor, bookImage, bookPages, bookReadState);

	hidePopup(e);

	e.target.reset();
}

//Event Listener for popup submit

popupContainer.addEventListener("submit", addBookToLibrary);

//Function to create book display on web page

function showBookOnPage(
	bTitle = "Jennifer Volcano of Oz",
	author = "John Doe",
	image = "./anomaly-oRskqiH7FNc-unsplash.jpg",
	pages = "100",
	state = "unread",
    index
) {
	const cardContainer = document.querySelector(".card-container");
	const card = document.createElement("div");
	card.classList.add("card", "newCard");

	// let dataKey = (bTitle + pages + author).replace(/\s/g, "");
    if (myLibrary.length > 2) {
        let dataKey = myLibrary.length - 1;
        card.setAttribute("data-key", dataKey);

    } else {
        let dataKey = index;
        card.setAttribute("data-key", dataKey);
        
    }

	const cardContent =
		`<img class="media-image" src="${image}" alt="book image">` +
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

	card.innerHTML = cardContent;
	cardContainer.append(card);
	card.scrollIntoView({ behavior: "smooth" });
}

//Event listener to use Event bubbling and propagation to capture clicks on dynamically added elements in the DOM

const cardContainer = document.querySelector(".card-container");
cardContainer.addEventListener("click", handleDomClick);

//Function to determine if dynamically added button clicked is intended to delete book or change book state

function handleDomClick(e) {
	//delete object from array and DOM using dataset.key if verified to be the delete button of a card pressed

	if (
		e.composedPath()[3].classList.contains("card") &&
		e.composedPath()[1].classList.contains("delete")
	) {
		let key = e.composedPath()[3].dataset.key;
		// console.log(key)

		myLibrary.splice(key, 1);
		e.composedPath()[3].classList.add("zero-opacity");
		let deleteSection = e.composedPath()[3];
		setTimeout(() => {
			cardContainer.removeChild(deleteSection);
		}, 300);

		//change state of a book object from read to unread and vice versa in the DOM and myLibrary Array
	} else if (
		e.composedPath()[2].classList.contains("card") &&
		(e.composedPath()[0].classList.contains("read-state") ||
			e.composedPath()[0].classList.contains("unread-state"))
	) {
		if (e.composedPath()[0].classList.contains("read-state")) {
			let key = e.composedPath()[2].dataset.key;
			e.composedPath()[0].classList.remove("read-state");
			e.composedPath()[0].classList.add("unread-state");
			e.composedPath()[0].innerHTML = "unread";
			myLibrary[key]["readState"] = "unread";
		} else if (e.composedPath()[0].classList.contains("unread-state")) {
			let key = e.composedPath()[2].dataset.key;
			e.composedPath()[0].classList.remove("unread-state");
			e.composedPath()[0].classList.add("read-state");
			e.composedPath()[0].innerHTML = "read";
			myLibrary[key]["readState"] = "read";
		}
	}
}

function pageLoad() {
	myLibrary.forEach((item, index) => {
		let bTitle = item["title"];
		let bAuth = item["author"];
		let bImage = item["image"];
		let bPage = item["pages"];
		let bState = item["readState"];
        console.log(bTitle, bAuth, bImage, bPage, bState, index);

        showBookOnPage(bTitle, bAuth, bImage, bPage, bState, index);
	});
}

window.addEventListener("load", () => {
    pageLoad();
});

const moon = document.querySelector(".dmode");
moon.addEventListener("click", () => {
	showBookOnPage();
});

// console.log(theHobbit.info());
