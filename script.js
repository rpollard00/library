class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    console.log("==================");
    console.log(`Title: ${this.title}`);
    console.log(`By: ${this.author}`);
    console.log(`Pages: ${this.pages}`);
    console.log(`Read: ${this.read}`);
    console.log("==================");
  }
}

const lotr = new Book("LotR", "JRRT", 1231, false);
const wot = new Book("Wheel of Time", "Robert Jordan", 9812, true);

const books = [lotr, wot];

// Returns a book element
const createBookElement = (book) => {
  const bookElement = document.createElement("div");
  const title = document.createElement("h2");
  const content = document.createElement("ul");
  const author = document.createElement("li");
  const pages = document.createElement("li");
  const read = document.createElement("li");

  title.innerText = book.title;
  author.innerText = book.author;
  pages.innerText = book.pages;
  read.innerText = book.read ? "Read" : "Unread";

  content.appendChild(author);
  content.appendChild(pages);
  content.appendChild(read);

  bookElement.appendChild(title);
  bookElement.appendChild(content);

  return bookElement;
};

const captureBookForm = () => {
  const bookData = new FormData(form);

  const title = bookData.get("title");
  const author = bookData.get("author");
  const pages = bookData.get("pages");
  const read = bookData.get("read");

  // console.log(title);

  return new Book(title, author, pages, read);
};

const bookshelf = document.querySelector("#bookshelf");
const form = document.querySelector("#book-form");

books.forEach((book) => {
  bookshelf.append(createBookElement(book));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = captureBookForm();
  console.log(newBook);
  bookshelf.append(createBookElement(newBook));
  books.push(newBook);
  console.log(books);
});
