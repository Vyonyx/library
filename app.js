let myBooks = [];
let cardContainer = document.querySelector('.card-container');

// Used to show or hide the book information form.
function toggleFormAppearance() {
    let hiddenForm = document.querySelector('.hidden-form');
    hiddenForm.style.display = hiddenForm.style.display == 'block' ? 'none' : 'block';
}

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title
        this.author = author
        this.pages  = pages
        this.readStatus = readStatus
    }
}

// Update all cards based on changes to the myBooks list.
function updateCards() {
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.lastChild);
    }

    for (let book in myBooks) {
        let currentTitle = myBooks[book].title;
        let currentAuthor = myBooks[book].author;
        let currentPages = myBooks[book].pages;
        let currentStatus = myBooks[book].readStatus;

        let currentCard = document.createElement('div');
        currentCard.classList.add('book-card');
        currentCard.setAttribute('data-index', `${book}`)

        let addTitle = document.createElement('h2');
        addTitle.textContent = currentTitle;
        currentCard.appendChild(addTitle);

        let addAuthor = document.createElement('h3');
        addAuthor.classList.add('authorText');
        addAuthor.textContent = currentAuthor;
        currentCard.appendChild(addAuthor);

        let addPages = document.createElement('h3');
        addPages.textContent = `Pages: ${currentPages}`;
        currentCard.appendChild(addPages);

        let addStatus = document.createElement('h5');
        addStatus.classList.add('status');
        addStatus.textContent = currentStatus == 'false' ? 'Status: Still Reading' : 'Status: Finished';
        currentCard.appendChild(addStatus);

        let statusButton = document.createElement('button');
        statusButton.textContent = 'Status';
        statusButton.addEventListener('click', () => {
            const editCard = document.querySelector(`[data-index="${book}"]`);
            const oldStatus = editCard.querySelector('.status');
            currentStatus = currentStatus=='false' ? 'true' : 'false';

            const editStatus = document.createElement('h5');
            editStatus.classList.add('status');
            editStatus.textContent = currentStatus == 'false' ? 'Status: Still Reading' : 'Status: Finished';
            editCard.replaceChild(editStatus, oldStatus);
        });
        currentCard.appendChild(statusButton);

        let removeButton = document.createElement('button');
        removeButton.classList.add('remove')
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-index', `${book}`)

        removeButton.addEventListener('click', () => {
            const removeCard = document.querySelector(`[data-index="${book}"]`);
            cardContainer.removeChild(removeCard);
            myBooks.pop(book);
        });
        currentCard.appendChild(removeButton);

        cardContainer.appendChild(currentCard);
    }
}

function addBookToLibrary() {
    // Get information from form fields.
    let bookTitle = document.querySelector('#title').value;
    let bookAuthor = document.querySelector('#author').value;
    let bookPages = parseInt(document.querySelector('#pages').value);
    let bookReadStatus = document.getElementsByName('status').value;

    // Form validation.
    if (bookTitle == '' || bookAuthor == '' || bookPages < 0) {
        alert('Please fill out form correctly.')
        return
    }

    if (isNaN(bookPages)) {
        alert('Enter valid number for book pages.')
        return
    }

    myBooks.push(new Book(bookTitle, bookAuthor, bookPages, bookReadStatus == 'false' ? false: true))

    updateCards();
    toggleFormAppearance();

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
}

const addBookInformation = document.querySelector('.form-submit');
addBookInformation.addEventListener('click', addBookToLibrary);

// Toggle form view.
const addCardBtn = document.querySelector('.add');
addCardBtn.addEventListener('click', toggleFormAppearance);

const removeButtons = document.querySelectorAll('.remove');

removeButtons.forEach(btn => {btn.style.border = '5px solid black'})
