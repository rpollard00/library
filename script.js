class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  read() {
    this.read = !this.read;
  }
}

const bookSchemes = [
  { fgColor: "#F2F5DE", bgColor: "#440381" },
  { fgColor: "#FFA400", bgColor: "#445E93" },
  { fgColor: "#F7B32B", bgColor: "#640D14" },
  { fgColor: "#CCE3DE", bgColor: "#4D4730" },
  { fgColor: "#0F0F0F", bgColor: "#78C0E0" },
  { fgColor: "#6B4D57", bgColor: "#DDC8C4" },
];

const BookColorScheme = () => {
  const n = bookSchemes.length;

  const rand = Math.floor(Math.random() * (n - 1));

  return bookSchemes[rand];
};

const RandomColor = () => {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + hex;
};

const lotr = new Book("The Fellowship of the Ring", "JRR Tolkien", 450, false);
const wot = new Book("Wheel of Time", "Robert Jordan", 812, true);
const wimpy = new Book("Diary of a Wimpy Kid", "Dav Pilkie", 126, true);

let books = [lotr, wimpy, wot];

// Returns a book element
const createBookElement = (book, i) => {
  const bookElement = document.createElement("div");
  const title = document.createElement("h2");
  const content = document.createElement("div");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readContainer = document.createElement("div");
  const read = document.createElement("p");
  const removeButton = document.createElement("button");
  const toggleReadButton = document.createElement("input");

  bookElement.classList = "bookCard";
  bookElement.dataset.title = book.title;
  bookElement.dataset.index = i;

  removeButton.innerText = "X";
  removeButton.classList = "remove-button";
  removeButton.addEventListener("click", () => {
    books = books.filter((_, i) => i != bookElement.dataset.index);
    bookElement.remove();
  });

  toggleReadButton.type = "checkbox";
  toggleReadButton.classList = "toggleRead";
  toggleReadButton.addEventListener("click", () => {
    const i = bookElement.dataset.index;
    const book = books[i];
    book.read = !book.read;
    if (book.read) {
      read.innerText = "Read";
      toggleReadButton.checked = true;
    } else {
      read.innerText = "Unread";
      toggleReadButton.checked = false;
    }
  });

  title.innerText = book.title;
  author.innerText = book.author;
  pages.innerText = book.pages;
  if (book.read) {
    read.innerText = "Read";
    toggleReadButton.checked = true;
  } else {
    read.innerText = "Unread";
    toggleReadButton.checked = false;
  }

  const MIN_HEIGHT = 30;
  const MAX_HEIGHT = 250;
  const bookHeight = !isNaN(book.pages)
    ? `${Math.min(Math.max((book.pages / 8) | 0, MIN_HEIGHT), MAX_HEIGHT)}px`
    : `60px`;

  const leftMargin = (Math.random() * 30) | 0;
  const rightMargin = (Math.random() * 30) | 0;

  bookElement.style.flexBasis = bookHeight;
  bookElement.style.marginLeft = `${leftMargin}px`;
  bookElement.style.marginRight = `${rightMargin}px`;
  const colorScheme = BookColorScheme();
  bookElement.style.backgroundColor = colorScheme.bgColor;
  bookElement.style.color = colorScheme.fgColor;

  content.classList = "content-container";

  content.appendChild(author);
  content.appendChild(pages);
  readContainer.appendChild(read);
  readContainer.appendChild(toggleReadButton);
  content.appendChild(readContainer);

  bookElement.appendChild(removeButton);
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

  return new Book(title, author, pages, read);
};

const bookshelf = document.querySelector("#bookshelf");
const form = document.querySelector("#book-form");

books.forEach((book, i) => {
  bookshelf.append(createBookElement(book, i));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = captureBookForm();
  if (newBook.title.length < 1 || newBook.pages.length < 1) {
    return;
  }
  bookshelf.append(createBookElement(newBook, books.length - 1));
  books.push(newBook);
  form.reset();
});

const dialog = document.querySelector("dialog");
const dialogButton = document.querySelector("#add-book");
const closeButton = document.querySelector("#close-button");

dialogButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
