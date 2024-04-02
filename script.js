const myLibrary = [];
const dialog = document.querySelector('.form');

const closeDialog = document.querySelector('#close-button');
closeDialog.addEventListener('click', () => dialog.close());

const openDialog = document.querySelector('.add-book');
openDialog.addEventListener('click', () => dialog.showModal());

const submitButton = document.querySelector('#submit');
// submitButton.addEventListener('click', addBookToLibrary);
const form = document.querySelector('form');
form.addEventListener('submit', addBookToLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages} pages, ${
      this.read ? 'already read' : 'not read yet'
    }`;
  };
}

function addBookToLibrary() {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const pages = document.querySelector('#book-pages');
  const read = document.querySelector('input[name=read]:checked');

  let book = new Book(title.value, author.value, pages.value, read.value);
  myLibrary.push(book);
  console.log(myLibrary);
  updateLibrary();
}
function updateLibrary() {
  const gridC = document.querySelector('.body');
  const gridI = document.querySelectorAll('.grid-item');
  gridI.forEach((e) => {
    gridC.removeChild(e);
  });
  for (let i = 0; i < myLibrary.length; i++) {
    let title = myLibrary[i].title;
    let author = myLibrary[i].author;
    let pages = myLibrary[i].pages;
    let read = myLibrary[i].read;

    const book = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteButton.classList = 'delete';
    deleteButton.setAttribute('type', 'button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      const index = book.getAttribute('data-attribute');
      deleteBook(index);
    });

    const titleP = document.createElement('p');
    titleP.textContent = `Title: ${title}`;
    const authorP = document.createElement('p');
    authorP.textContent = `Author: ${author}`;
    const pagesP = document.createElement('p');
    pagesP.textContent = `Pages: ${pages}`;

    book.appendChild(deleteButton);
    book.appendChild(titleP);
    book.appendChild(authorP);
    book.appendChild(pagesP);
    book.setAttribute('data-attribute', `${i}`);
    book.classList = 'grid-item';
    gridC.appendChild(book);
  }
}
function deleteBook(index) {
  myLibrary.splice(index, 1);
  updateLibrary();
}
