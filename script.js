const submitBtn = document.getElementById("submit-btn");
const closeBtn = document.getElementById("close-btn");
const addBookBtn = document.getElementById("add-book-btn");
const markBookBtn = document.getElementById("book-mark-btn");
const deleteBookBtns = document.querySelectorAll(".book-delete-btn");

const form = document.getElementById("form");
const formHidden = document.getElementById("form-container");

class Book {
  constructor(title, author, pages) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = false;
  }
}

let myLibrary = [];
let newBook;

const addBook = (event) => {
  event.preventDefault();

  newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  saveData();
  update();
};

const update = () => {
  const display = document.getElementById("books-container");
  const books = document.querySelectorAll(".book-container");
  books.forEach((book) => display.removeChild(book));
  myLibrary.map((book) => {
    createBook(book);
  });
};

const createBook = (book) => {
  const booksContainer = document.getElementById("books-container");

  let bookContainer = document.createElement("div");
  bookContainer.className = "book-container";
  bookContainer.setAttribute("id", myLibrary.indexOf(book));

  let bookImg = document.createElement("img");
  bookImg.className = "book-img";
  bookImg.src = "";

  let bookText = document.createElement("div");
  bookText.className = "book-text";

  let bookTitle = document.createElement("p");
  bookTitle.className = "book-title";
  bookTitle.textContent = book.title;

  let bookAuthor = document.createElement("p");
  bookAuthor.className = "book-author";
  bookAuthor.textContent = book.author;

  let bookPages = document.createElement("p");
  bookPages.className = "book-pages";
  let pagesSpan = document.createElement("span");
  pagesSpan.className = "pages";
  pagesSpan.textContent = book.pages;
  bookPages.appendChild(pagesSpan);
  bookPages.innerHTML += " pages";

  let buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";

  let markBtn = document.createElement("button");
  markBtn.className = book.read ? "book-mark-btn read" : "book-mark-btn";
  markBtn.type = "button";
  markBtn.textContent = book.read ? "Read" : "No Read";

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "book-delete-btn";
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.id = "book-delete-btn";

  deleteBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    saveData();
    update();
  });

  markBtn.addEventListener("click", () => {
    book.read = !book.read;
    console.log(book.read);
    saveData();
    update();
  });

  bookText.appendChild(bookTitle);
  bookText.appendChild(bookAuthor);
  bookText.appendChild(bookPages);

  buttonsContainer.appendChild(markBtn);
  buttonsContainer.appendChild(deleteBtn);

  bookContainer.appendChild(bookImg);
  bookContainer.appendChild(bookText);
  bookContainer.appendChild(buttonsContainer);

  booksContainer.appendChild(bookContainer);
};

const saveData = () => {
  localStorage.setItem("library", JSON.stringify(myLibrary));
};

const restoreData = () => {
  if (!localStorage.library) {
    update();
  } else {
    let data = localStorage.getItem("library");
    data = JSON.parse(data);
    myLibrary = data;
    update();
  }
};

form.addEventListener("submit", (event) => {
  addBook(event);
});

addBookBtn.addEventListener("click", () =>
  formHidden.classList.remove("hidden")
);
closeBtn.addEventListener("click", () => formHidden.classList.add("hidden"));

restoreData();
