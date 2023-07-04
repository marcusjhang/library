let newBookbtn = document.querySelector("#new-book-btn");
newBookbtn.addEventListener("click", function() {
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.classList.remove("d-none");
})

let form = document.querySelector("#book-form");
form.addEventListener("submit", function(){
    event.preventDefault();
    addBookToLibrary();
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.classList.add("d-none");
})

let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
}

function toggleRead(index){
    myLibrary[index].toggleRead();
    render()
}

function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.innerHTML = `
        <div class="card mb-2 mx-2" style="width: 18rem;">
            <div class="card-body text-center">
                <h3 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="card-text">${book.pages}</p>
                <p>${book.read ? `<button type="button" class="btn btn-info" onClick="toggleRead(${i})">Read</button>` : `<button type="button" class="btn btn-warning" onClick="toggleRead(${i})">Not Read Yet</button>`}</p>
                <button type="button" class="btn btn-danger" onclick="removeBook(${i})">Remove</button>
            </div>
        </div>
        `
        libraryEl.appendChild(bookEl);
    }
}

function addBookToLibrary(event) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    render();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}
