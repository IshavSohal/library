const myLibrary = [];
const bookTableBody = document.querySelector("#books tbody");
const addBookButton = document.querySelector("#new-book");
const addBookModal = document.querySelector("#add-book-modal");
const cancelModalButton = document.querySelector("#cancel-modal");
const submitModalButton = document.querySelector("#submit-modal");
const addBookForm = document.querySelector("#add-book-modal > form");

const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const numPagesInput = document.querySelector("#num-pages");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function updateTable() {
    // Remove all row, except the header row, from the table
    bookTableBody.innerHTML = "";

    myLibrary.forEach((book) => {
        const newRow = bookTableBody.insertRow(-1);
        const titleCell = newRow.insertCell(-1);
        const authorCell = newRow.insertCell(-1);
        const pagesCell = newRow.insertCell(-1);
        const readCell = newRow.insertCell(-1);
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages;

        // Used to link DOM element to Book object
        newRow.setAttribute("data-id", book.id);

        const toggleReadCheckbox = document.createElement("input");
        toggleReadCheckbox.setAttribute("type", "checkbox");
        toggleReadCheckbox.addEventListener("change", () => {
            book.toggleRead();
        });
        readCell.appendChild(toggleReadCheckbox);

        // Button to remove a Book object from the array, as well as remove
        // the corresponding DOM element
        const removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove Book";
        removeBookButton.classList.add("remove-book");
        removeBookButton.addEventListener("click", () => {
            myLibrary.splice(
                myLibrary.findIndex((item) => item.id === newRow.dataset.id),
                1
            );
            bookTableBody.removeChild(newRow);
        });
        const removeBookContainer = document.createElement("span");
        readCell.style.position = "relative";
        removeBookContainer.style.position = "absolute";
        removeBookContainer.style.left = "100px";
        removeBookContainer.style.top = "5px";
        removeBookContainer.appendChild(removeBookButton);
        readCell.appendChild(removeBookContainer);
    });
}

const clearInputs = () => {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    numPagesInput.value = "";
};

addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
    clearInputs();
});

cancelModalButton.addEventListener("click", () => {
    addBookModal.close();
    addBookButton.blur();
});

submitModalButton.addEventListener("click", (e) => {
    // e.preventDefault();
    submitModalButton.blur();
    // get data from inputs, and create a new book
    const formData = Object.fromEntries(new FormData(addBookForm));
    if (formData["book-title"] && formData["book-author"] && formData["num-pages"]) {
        addBookToLibrary(...Object.values(formData), false);
        updateTable();
    }
});

// addBookToLibrary("The Hobbit", "J.R.R Tokien", 295, false);
// addBookToLibrary("The Hobbit", "J.R.R Tokien", 295, true);
// addBookToLibrary("The Hobbit", "J.R.R Tokien", 295, false);
// addBookToLibrary("The Hobbit", "J.R.R Tokien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R Tokien", 295, false);
updateTable();
