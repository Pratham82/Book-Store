// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
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
};

// Clear input fields
UI.prototype.clearInputs = () => {
	document.querySelector("#title").value = "";
	document.querySelector("#author").value = "";
	document.querySelector("#isbn").value = "";
};

//Show alert
UI.prototype.showAlert = function (message, className) {
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
};

// Delete book
UI.prototype.deleteBook = function (target) {
	if (target.className == "delete") {
		target.parentElement.parentElement.remove();
	}
};

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
		//Show alert if the book is added successfully
		ui.showAlert("Book added successfully", "success");

		// Add the input in our list
		// Adding the new book object to UI
		ui.addBookToList(book);

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

	//show alert
	ui.showAlert("Book removed successfully", "success");
	e.preventDefault();
});
