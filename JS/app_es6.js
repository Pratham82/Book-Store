class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		// Adding the book to our table
		const list = document.querySelector("#book-list");

		// Creating a tables row
		const row = document.createElement("tr");

		// Adding book info to row
		row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete' style='text-decoration: none'>X</a></td>
    `;

		list.appendChild(row);
		console.log(row);
	}

	showAlert(message, className) {
		// Create a div element
		const div = document.createElement("div");

		// Add className to the div
		div.className = `alert ${className}`;
		// centering the text
		div.style.textAlign = "center";

		// Add text inside our div
		div.appendChild(document.createTextNode(message));

		// Add the div inside our main page
		// get parent
		const container = document.querySelector(".container");

		//get form
		const form = document.querySelector("#book-form");

		// Add our alert div before form
		container.insertBefore(div, form);

		// Remove div after 3 secs
		setTimeout(function () {
			document.querySelector(".alert").remove();
		}, 2000);
	}

	deleteBook(target) {
		if (target.className == "delete") {
			target.parentElement.parentElement.remove();
		}
	}

	clearInputs() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}
}

// Adding to local storage class

class Store {
	//for fetching books from local storage
	static getBooks() {
		let books;
		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}
		return books;
	}

	// Showing books form local storage
	static displayBooks() {
		const books = Store.getBooks();
		books.forEach(function (book) {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();

		//Add the current book object to the array
		books.push(book);

		// Add the recently added book to the local storage
		// Thats why we are converting the books object to strings for storing it in browser
		localStorage.setItem("books", JSON.stringify(books));
	}

	//remove book from local storage
	static removeBook(isbn) {
		const books = Store.getBooks();

		books.forEach(function (book, index) {
			if (book.isbn == isbn) {
				//this will remove 1 book form the current index
				books.splice(index, 1);
			}
		});
		localStorage.setItem("books", JSON.stringify(books));
		console.log(isbn);
	}
}

// DOM load event
// When the DOM is loaded then we call our static method which will fetch the books from local storage and add it to the tbody
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event listener for adding a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
	// get values from input fields
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const isbn = document.querySelector("#isbn").value;
	// console.log(title);
	// console.log(author);
	// console.log(isbn);

	// Creating new reference (Instantia ting) for the book object
	const book = new Book(title, author, isbn);
	console.log(book);

	// Creating new reference (Instantiating) for the UI object
	const ui = new UI();

	// Validate user inputs
	if (title === "" || author === "" || isbn === "") {
		// alert the user that input is empty
		ui.showAlert("Please fill all inputs", "error");
	} else {
		// Add the input in our list
		// Adding the new book object to UI
		ui.addBookToList(book);

		// Adding the book to local storage
		Store.addBook(book);

		//Show alert if the book is added successfully
		ui.showAlert("Book added successfully", "success");

		// Clear inputs after adding the books into the list
		ui.clearInputs();
	}

	e.preventDefault();
});

// Event listener for delete
document.querySelector("#book-list").addEventListener("click", function (e) {
	//console.log(e.target.className);
	// Creating new reference (Instantiating) for the UI object
	const ui = new UI();

	// Calling delete book
	ui.deleteBook(e.target);

	// Remove book from local storage
	// Here we are targeting the iSBN number and removing that book form local storage
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	//show alert
	ui.showAlert("Book removed successfully", "success");
	e.preventDefault();
});
