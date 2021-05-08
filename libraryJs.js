console.log(' helllo world !! ...... ');


class Book {

    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

class Display {

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 2000);
    
    }


    addBook(book) {

        let books = localStorage.getItem("books");

        if (books == null) {
            var myObj = [];
        }
        else {
            var myObj = JSON.parse(books);
        }

        myObj.push(book);
        localStorage.setItem("books", JSON.stringify(myObj));

    }

    isValidate(book) {
        if (book.name.length < 3 || book.author.length < 3) {
            return false;
        } else {
            return true;
        }

    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    display() {
        let books = localStorage.getItem("books");

        if (books == null) {
            var myBooks = [];
        } else {
            var myBooks = JSON.parse(books);
        }


        let uiString = "";

        myBooks.forEach(book => {

            uiString += `<tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            </tr>`;

        });

        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = uiString;
        console.log("book is adding");

    }


}



let libraryForm = document.getElementById('libraryForm');

libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {

    e.preventDefault();
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let fiction = document.getElementById("author");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    let type

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else {
        type = cooking.value;
    }

    let book = new Book(name, author, type);

    let display = new Display();
    if (display.isValidate(book)) {

        display.addBook(book);
        display.display();
        display.clear();
        display.show('success', 'Your book has been successfully added')

    } else {

        display.show('danger', 'Sorry you cannot add this book');
    }



    console.log('you haVe SuBmiTTed the form');
    console.log(book);

}



