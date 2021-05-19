let viewBooksPressed = false;
let addBooksPressed = false;


// -------------------- VIEW BOOKS -------------------- //


document.getElementById('but1').addEventListener('click', getBook);

function getBook() {
    if (viewBooksPressed === false && addBooksPressed === false) {

        document.getElementById("title").style.marginTop = "20px";
        document.getElementById("title").style.marginBottom = "20px";
        document.getElementById("but1").style.marginTop = "10px";
        document.getElementById("but2").style.marginTop = "10px";

        fetch('./api/some.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    response.json().then(function (data) {
                        console.log(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

        fetch('http://localhost:3000/books')
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('There was a problem. Status code : ' + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                    printBooks(data);
                });
            })
            .catch(function (err) {
                console.log("Fetch error :-S", err);
            });

        function printBooks(books) {
            let body = document.getElementsByTagName("body")[0];
            for (let i in books) {

                divBooks = document.createElement('div');
                divBooks.setAttribute('id', 'divBookPhotos');
                divBooks.setAttribute('class', 'divBookPhotos');

                bookImg = document.createElement('img');
                bookImg.setAttribute('src', books[i].img);
                bookImg.setAttribute('id', 'bookImg');
                bookImg.setAttribute('class', 'bookImg');

                bookName = document.createElement('p');
                bookName.innerText = books[i].name;
                bookName.setAttribute('id', 'bookName');
                bookName.setAttribute('class', 'bookName');

                bookProgress = document.createElement('p');
                bookProgress.innerText = books[i].progress;
                bookProgress.setAttribute('id', 'bookProgress');
                bookProgress.setAttribute('class', 'bookProgress');

                divBooks.appendChild(bookName);
                divBooks.appendChild(bookImg);
                divBooks.appendChild(bookProgress);

                body.appendChild(divBooks);

                divButtons = document.createElement('div');
                divButtons.setAttribute('id', 'divButtons');
                divButtons.setAttribute('class', 'divButtons');

                buttonEdit = document.createElement('button');
                buttonEdit.setAttribute('id', 'buttonEdit');
                buttonEdit.setAttribute('class', 'buttonEdit');
                buttonEdit.innerText = 'Edit Book';
                
                
                
                //------------------------------ EDIT BUTTON ------------------------------//
                
                buttonEdit.addEventListener('click', function () {
                    editButtonFunction(books[i], books[i].id);
                })
                
                function editButtonFunction(editBook, editBookId)
                {
                    divModalBoxEdit = document.createElement('div');
                    divModalBoxEdit = document.createElement('div');
                    divModalBoxEdit.setAttribute('id', 'divModalBoxEdit');
                    divModalBoxEdit.setAttribute('class', 'divModalBoxEdit');

                    divModalEdit = document.createElement('div');
                    divModalEdit.setAttribute('id', 'divModalEdit');
                    divModalEdit.setAttribute('class', 'divModalEdit');

                    modalName = document.createElement('input');
                    modalName.setAttribute('type', 'text');
                    modalName.setAttribute('id', 'modalName');
                    modalName.setAttribute('class', 'modalName');
                    modalName.placeholder = 'Enter new name';

                    modalImg = document.createElement('input');
                    modalImg.setAttribute('type', 'text');
                    modalImg.setAttribute('id', 'modalImg');
                    modalImg.setAttribute('class', 'modalImg');
                    modalImg.placeholder = 'Enter new photo source';

                    submitButton = document.createElement('button');
                    submitButton.setAttribute('id', 'submitButton');
                    submitButton.setAttribute('class', 'submitButton');
                    submitButton.innerText = 'Submit changes';

                    closeButton = document.createElement('button');
                    closeButton.setAttribute('id', 'closeButton');
                    closeButton.setAttribute('class', 'closeButton');
                    closeButton.innerText = 'Close';

                    divModalEdit.appendChild(modalName);
                    divModalEdit.appendChild(modalImg);
                    divModalEdit.appendChild(submitButton);
                    divModalEdit.appendChild(closeButton);

                    divModalBoxEdit.appendChild(divModalEdit);

                    body.appendChild(divModalBoxEdit);

                    divModalBoxEdit.style.display = 'block';

                    submitButton.addEventListener('click', function () {
                        if(modalName.value != '')
                        {
                            if(modalImg.value != '')
                                {
                                    let bookUpdate = {
                                        "name": modalName.value,
                                        "img":  modalImg.value,
                                        'progress': editBook.progress
                                    }
                        
                                    let response = fetch('http://localhost:3000/books/'+editBookId, {
                                    method: 'PUT',
                        
                                    headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                    },
                        
                                    body: JSON.stringify(bookUpdate)
                                    });
                                    divModalBoxEdit.style.display = 'none';
                                }
                            else 
                                alert('Fill all the text boxes!');
                        }
                        else
                            alert('Fill all the text boxes!');
                    });

                    closeButton.addEventListener('click', function () {
                        divModalBoxEdit.style.display = 'none';
                    });
                }

                divButtons.appendChild(buttonEdit);

                buttonDelete = document.createElement('button');
                buttonDelete.setAttribute('id', 'buttonDelete');
                buttonDelete.setAttribute('class', 'buttonDelete');
                buttonDelete.innerText = 'Delete Book';
                divButtons.appendChild(buttonDelete);

                //------------------------------ DELETE BUTTON ------------------------------//

                buttonDelete.addEventListener('click', function () {
                    deleteButtonFunction(books[i], books[i].id);
                });

                function deleteButtonFunction(deleteBook, deleteBookId)
                {
                    fetch('http://localhost:3000/books/' + deleteBookId, {
                    method: 'DELETE',
                });
                }

                buttonEditProgress = document.createElement('button');
                buttonEditProgress.setAttribute('id', 'buttonEditProgress');
                buttonEditProgress.setAttribute('class', 'buttonEditProgress');
                buttonEditProgress.innerText = 'Edit Progress';
                divButtons.appendChild(buttonEditProgress);

                //------------------------------ EDIT PROGRESS BUTTON ------------------------------//

                buttonEditProgress.addEventListener('click', function () {
                    editProgressButtonFunction(books[i], books[i].id);
                });

                function editProgressButtonFunction(editProgressBook, editProgressBookId)
                {
                    divModalBoxEditProgress = document.createElement('div');
                    divModalBoxEditProgress = document.createElement('div');
                    divModalBoxEditProgress.setAttribute('id', 'divModalBoxEditProgress');
                    divModalBoxEditProgress.setAttribute('class', 'divModalBoxEditProgress');

                    divModalEditProgress = document.createElement('div');
                    divModalEditProgress.setAttribute('id', 'divModalEditProgress');
                    divModalEditProgress.setAttribute('class', 'divModalEditProgress');

                    modalProgress = document.createElement('input');
                    modalProgress.setAttribute('type', 'text');
                    modalProgress.setAttribute('id', 'modalProgress');
                    modalProgress.setAttribute('class', 'modalProgress');
                    modalProgress.placeholder = 'Update Progress';

                    submitButtonProgress = document.createElement('button');
                    submitButtonProgress.setAttribute('id', 'submitButtonProgress');
                    submitButtonProgress.setAttribute('class', 'submitButtonProgress');
                    submitButtonProgress.innerText = 'Submit changes';

                    closeButtonProgress = document.createElement('button');
                    closeButtonProgress.setAttribute('id', 'closeButtonProgress');
                    closeButtonProgress.setAttribute('class', 'closeButtonProgress');
                    closeButtonProgress.innerText = 'Close';

                    divModalEditProgress.appendChild(modalProgress);
                    divModalEditProgress.appendChild(submitButtonProgress);
                    divModalEditProgress.appendChild(closeButtonProgress);

                    divModalBoxEditProgress.appendChild(divModalEditProgress);

                    body.appendChild(divModalBoxEditProgress);

                    divModalBoxEditProgress.style.display = 'block';

                    submitButtonProgress.addEventListener('click', function () {
                        if(modalProgress.value != '')
                        {
                                   let bookUpdate = {
                                        "name": editProgressBook.name,
                                        "img": editProgressBook.img,
                                        "progress": modalProgress.value
                                    }
                        
                                    let response = fetch('http://localhost:3000/books/' + editProgressBookId, {
                                    method: 'PUT',
                        
                                    headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                    },
                        
                                    body: JSON.stringify(bookUpdate)
                                    });
                                    divModalBoxEditProgress.style.display = 'none';
                        }
                        else
                            alert('Fill the progress text box!');
                    });

                    closeButtonProgress.addEventListener('click', function () {
                        divModalBoxEditProgress.style.display = 'none';
                    });
                }

                body.appendChild(divButtons);
            }
        }
        viewBooksPressed = true;
    }

    if (addBooksPressed === true) {

        var toDelete = document.getElementById('body');
        toDelete.removeChild(toDelete.lastChild);

        document.getElementById("title").style.marginTop = "20px";
        document.getElementById("title").style.marginBottom = "20px";
        document.getElementById("but1").style.marginTop = "10px";
        document.getElementById("but2").style.marginTop = "10px";

        fetch('./api/some.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    response.json().then(function (data) {
                        console.log(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

        fetch('http://localhost:3000/books')
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('There was a problem. Status code : ' + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                    printBooks(data);
                });
            })
            .catch(function (err) {
                console.log("Fetch error :-S", err);
            });

        function printBooks(books) {
            let body = document.getElementsByTagName("body")[0];
            for (let i in books) {
                divBooks = document.createElement('div');
                divBooks.setAttribute('id', 'divBookPhotos');
                divBooks.setAttribute('class', 'divBookPhotos');

                bookImg = document.createElement('img');
                bookImg.setAttribute('src', books[i].img);
                bookImg.setAttribute('id', 'bookImg');
                bookImg.setAttribute('class', 'bookImg');

                bookName = document.createElement('p');
                bookName.innerText = books[i].name;
                bookName.setAttribute('id', 'bookName');
                bookName.setAttribute('class', 'bookName');

                bookProgress = document.createElement('p');
                bookProgress.innerText = books[i].progress;
                bookProgress.setAttribute('id', 'bookProgress');
                bookProgress.setAttribute('class', 'bookProgress');

                divBooks.appendChild(bookName);
                divBooks.appendChild(bookImg);
                divBooks.appendChild(bookProgress);

                body.appendChild(divBooks);

                divButtons = document.createElement('div');
                divButtons.setAttribute('id', 'divButtons');
                divButtons.setAttribute('class', 'divButtons');

                buttonEdit = document.createElement('button');
                buttonEdit.setAttribute('id', 'buttonEdit');
                buttonEdit.setAttribute('class', 'buttonEdit');
                buttonEdit.innerText = 'Edit Book';
                divButtons.appendChild(buttonEdit);
/*
                buttonDelete = document.createElement('button');
                buttonDelete.setAttribute('id', 'buttonDelete');
                buttonDelete.setAttribute('class', 'buttonDelete');
                buttonDelete.innerText = 'Delete Book';
                divButtons.appendChild(buttonDelete);

                buttonEditProgress = document.createElement('button');
                buttonEditProgress.setAttribute('id', 'buttonEditProgress');
                buttonEditProgress.setAttribute('class', 'buttonEditProgress');
                buttonEditProgress.innerText = 'Edit Progress';
                divButtons.appendChild(buttonEditProgress);
*/

buttonEdit.addEventListener('click', function () {
    editButtonFunction(books[i], books[i].id);
})

function editButtonFunction(editBook, editBookId)
{
    divModalBoxEdit = document.createElement('div');
    divModalBoxEdit = document.createElement('div');
    divModalBoxEdit.setAttribute('id', 'divModalBoxEdit');
    divModalBoxEdit.setAttribute('class', 'divModalBoxEdit');

    divModalEdit = document.createElement('div');
    divModalEdit.setAttribute('id', 'divModalEdit');
    divModalEdit.setAttribute('class', 'divModalEdit');

    modalName = document.createElement('input');
    modalName.setAttribute('type', 'text');
    modalName.setAttribute('id', 'modalName');
    modalName.setAttribute('class', 'modalName');
    modalName.placeholder = 'Enter new name';

    modalImg = document.createElement('input');
    modalImg.setAttribute('type', 'text');
    modalImg.setAttribute('id', 'modalImg');
    modalImg.setAttribute('class', 'modalImg');
    modalImg.placeholder = 'Enter new photo source';

    submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submitButton');
    submitButton.setAttribute('class', 'submitButton');
    submitButton.innerText = 'Submit changes';

    closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'closeButton');
    closeButton.setAttribute('class', 'closeButton');
    closeButton.innerText = 'Close';

    divModalEdit.appendChild(modalName);
    divModalEdit.appendChild(modalImg);
    divModalEdit.appendChild(submitButton);
    divModalEdit.appendChild(closeButton);

    divModalBoxEdit.appendChild(divModalEdit);

    body.appendChild(divModalBoxEdit);

    divModalBoxEdit.style.display = 'block';

    submitButton.addEventListener('click', function () {
        if(modalName.value != '')
        {
            if(modalImg.value != '')
                {
                    let bookUpdate = {
                        "name": modalName.value,
                        "img":  modalImg.value,
                        'progress': editBook.progress
                    }
        
                    let response = fetch('http://localhost:3000/books/'+editBookId, {
                    method: 'PUT',
        
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
        
                    body: JSON.stringify(bookUpdate)
                    });
                    divModalBoxEdit.style.display = 'none';
                }
            else 
                alert('Fill all the text boxes!');
        }
        else
            alert('Fill all the text boxes!');
    });

    closeButton.addEventListener('click', function () {
        divModalBoxEdit.style.display = 'none';
    });
}

divButtons.appendChild(buttonEdit);

buttonDelete = document.createElement('button');
buttonDelete.setAttribute('id', 'buttonDelete');
buttonDelete.setAttribute('class', 'buttonDelete');
buttonDelete.innerText = 'Delete Book';
divButtons.appendChild(buttonDelete);

//------------------------------ DELETE BUTTON ------------------------------//

buttonDelete.addEventListener('click', function () {
    deleteButtonFunction(books[i], books[i].id);
});

function deleteButtonFunction(deleteBook, deleteBookId)
{
    fetch('http://localhost:3000/books/' + deleteBookId, {
    method: 'DELETE',
});
}

buttonEditProgress = document.createElement('button');
buttonEditProgress.setAttribute('id', 'buttonEditProgress');
buttonEditProgress.setAttribute('class', 'buttonEditProgress');
buttonEditProgress.innerText = 'Edit Progress';
divButtons.appendChild(buttonEditProgress);

//------------------------------ EDIT PROGRESS BUTTON ------------------------------//

buttonEditProgress.addEventListener('click', function () {
    editProgressButtonFunction(books[i], books[i].id);
});

function editProgressButtonFunction(editProgressBook, editProgressBookId)
{
    divModalBoxEditProgress = document.createElement('div');
    divModalBoxEditProgress = document.createElement('div');
    divModalBoxEditProgress.setAttribute('id', 'divModalBoxEditProgress');
    divModalBoxEditProgress.setAttribute('class', 'divModalBoxEditProgress');

    divModalEditProgress = document.createElement('div');
    divModalEditProgress.setAttribute('id', 'divModalEditProgress');
    divModalEditProgress.setAttribute('class', 'divModalEditProgress');

    modalProgress = document.createElement('input');
    modalProgress.setAttribute('type', 'text');
    modalProgress.setAttribute('id', 'modalProgress');
    modalProgress.setAttribute('class', 'modalProgress');
    modalProgress.placeholder = 'Update Progress';

    submitButtonProgress = document.createElement('button');
    submitButtonProgress.setAttribute('id', 'submitButtonProgress');
    submitButtonProgress.setAttribute('class', 'submitButtonProgress');
    submitButtonProgress.innerText = 'Submit changes';

    closeButtonProgress = document.createElement('button');
    closeButtonProgress.setAttribute('id', 'closeButtonProgress');
    closeButtonProgress.setAttribute('class', 'closeButtonProgress');
    closeButtonProgress.innerText = 'Close';

    divModalEditProgress.appendChild(modalProgress);
    divModalEditProgress.appendChild(submitButtonProgress);
    divModalEditProgress.appendChild(closeButtonProgress);

    divModalBoxEditProgress.appendChild(divModalEditProgress);

    body.appendChild(divModalBoxEditProgress);

    divModalBoxEditProgress.style.display = 'block';

    submitButtonProgress.addEventListener('click', function () {
        if(modalProgress.value != '')
        {
                   let bookUpdate = {
                        "name": editProgressBook.name,
                        "img": editProgressBook.img,
                        "progress": modalProgress.value
                    }
        
                    let response = fetch('http://localhost:3000/books/' + editProgressBookId, {
                    method: 'PUT',
        
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
        
                    body: JSON.stringify(bookUpdate)
                    });
                    divModalBoxEditProgress.style.display = 'none';
        }
        else
            alert('Fill the progress text box!');
    });

    closeButtonProgress.addEventListener('click', function () {
        divModalBoxEditProgress.style.display = 'none';
    });
}

                body.appendChild(divButtons);
            }
        }
        viewBooksPressed = true;
    }
}


// -------------------- ADD BOOKS -------------------- //


document.getElementById('but2').addEventListener('click', addBook);

function addBook() {
    addBooksPressed = true;
    if(viewBooksPressed === true) {
    document.getElementById("title").style.marginTop = "20px";
    document.getElementById("title").style.marginBottom = "20px";
    document.getElementById("but1").style.marginTop = "10px";
    document.getElementById("but2").style.marginTop = "10px";

    fetch('./api/some.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

    fetch('http://localhost:3000/books')
        .then(function (response) {
            if (response.status !== 200) {
                console.log('There was a problem. Status code : ' + response.status);
                return;
            }

            response.json().then(function (data) {
                console.log(data);
                addBooksDelete(data);
            });
        })
        .catch(function (err) {
            console.log("Fetch error :-S", err);
        });

    function addBooksDelete(books) {
        let body = document.getElementsByTagName("body")[0];
        for (let i in books) {
            divDelete = document.getElementById('divButtons');
            divDelete.remove();

            divDeletePhotos = document.getElementById('divBookPhotos');
            divDeletePhotos.remove();
        }

        inputBookName = document.createElement('p');
        inputBookName.innerText = 'Enter book name: ';
        inputBookName.setAttribute('id', 'textName');
        inputBookName.setAttribute('class', 'textName');

        inputBookNameText = document.createElement('input');
        inputBookNameText.setAttribute('type', 'text');
        inputBookNameText.setAttribute('id', 'inputName');
        inputBookNameText.setAttribute('class', 'inputName');
        inputBookNameText.placeholder = 'Example: The Little Prince';

        inputBookImage = document.createElement('p')
        inputBookImage.innerText = 'Enter image source: ';
        inputBookImage.setAttribute('id', 'textImage');
        inputBookImage.setAttribute('class', 'textImage');

        inputBookImageText = document.createElement('input');
        inputBookImageText.setAttribute('type', 'text');
        inputBookImageText.setAttribute('id', 'inputImage');
        inputBookImageText.setAttribute('class', 'inputImage');
        inputBookImageText.placeholder = 'Copy "Image Address"';

        inputBookProgress = document.createElement('p');
        inputBookProgress.innerText = 'Enter book progress: ';
        inputBookProgress.setAttribute('id', 'textProgress');
        inputBookProgress.setAttribute('class', 'textProgress');

        inputBookProgressText = document.createElement('input');
        inputBookProgressText.setAttribute('type', 'text');
        inputBookProgressText.setAttribute('id', 'inputProgress');
        inputBookProgressText.setAttribute('class', 'inputProgress');
        inputBookProgressText.placeholder = 'Read Pages/Total Pages';

        addBookButton = document.createElement('button');
        addBookButton.innerText = 'Add Book';
        addBookButton.setAttribute('id', 'addBook');
        addBookButton.setAttribute('class', 'addBook');

        var divAux = document.createElement('div');

        divAux.setAttribute('id', 'divAux');
        divAux.setAttribute('class', 'divAux');

        divAux.appendChild(inputBookName);
        divAux.appendChild(inputBookNameText);
        //divAux.appendChild(inputBookNameButton);
        divAux.appendChild(inputBookImage);
        divAux.appendChild(inputBookImageText);
        //divAux.appendChild(inputBookImageButton);
        divAux.appendChild(inputBookProgress);
        divAux.appendChild(inputBookProgressText);
        divAux.appendChild(addBookButton);

        body.appendChild(divAux);

        document.getElementById('addBook').addEventListener('click', sendBook)

        function sendBook() {
            let book = {
                "name": inputBookNameText.value,
                "img": inputBookImageText.value,
                "progress": inputBookProgressText.value
            }

            let response = fetch('http://localhost:3000/books', {
            method: 'POST',

            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },

            body: JSON.stringify(book)
        });

        }
    }
    }
    else {
        document.getElementById("title").style.marginTop = "20px";
    document.getElementById("title").style.marginBottom = "20px";
    document.getElementById("but1").style.marginTop = "10px";
    document.getElementById("but2").style.marginTop = "10px";

    fetch('./api/some.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

    fetch('http://localhost:3000/books')
        .then(function (response) {
            if (response.status !== 200) {
                console.log('There was a problem. Status code : ' + response.status);
                return;
            }

            response.json().then(function (data) {
                console.log(data);
                addBooksDelete(data);
            });
        })
        .catch(function (err) {
            console.log("Fetch error :-S", err);
        });

    function addBooksDelete(books) {
        let body = document.getElementsByTagName("body")[0];

        inputBookName = document.createElement('p');
        inputBookName.innerText = 'Enter book name: ';
        inputBookName.setAttribute('id', 'textName');
        inputBookName.setAttribute('class', 'textName');

        inputBookNameText = document.createElement('input');
        inputBookNameText.setAttribute('type', 'text');
        inputBookNameText.setAttribute('id', 'inputName');
        inputBookNameText.setAttribute('class', 'inputName');
        inputBookNameText.placeholder = 'Example: The Little Prince';

        //inputBookNameButton = document.createElement('button');
        //inputBookNameButton.innerText = 'Submit Name';
        //inputBookNameButton.setAttribute('id', 'submitName');

        inputBookImage = document.createElement('p')
        inputBookImage.innerText = 'Enter image source: ';
        inputBookImage.setAttribute('id', 'textImage');
        inputBookImage.setAttribute('class', 'textImage');

        inputBookImageText = document.createElement('input');
        inputBookImageText.setAttribute('type', 'text');
        inputBookImageText.setAttribute('id', 'inputImage');
        inputBookImageText.setAttribute('class', 'inputImage');
        inputBookImageText.placeholder = 'Copy "Image Address"';

        //inputBookImageButton = document.createElement('button');
        //inputBookImageButton.innerText = 'Submit Source';
        //inputBookImageButton.setAttribute('id', 'submitImage');

        inputBookProgress = document.createElement('p');
        inputBookProgress.innerText = 'Enter book progress: ';
        inputBookProgress.setAttribute('id', 'textProgress');
        inputBookProgress.setAttribute('class', 'textProgress');

        inputBookProgressText = document.createElement('input');
        inputBookProgressText.setAttribute('type', 'text');
        inputBookProgressText.setAttribute('id', 'inputProgress');
        inputBookProgressText.setAttribute('class', 'inputProgress');
        inputBookProgressText.placeholder = 'Read Pages/Total Pages';

        addBookButton = document.createElement('button');
        addBookButton.innerText = 'Add Book';
        addBookButton.setAttribute('id', 'addBook');
        addBookButton.setAttribute('class', 'addBook');

        var divAux = document.createElement('div');

        divAux.setAttribute('id', 'divAux');
        divAux.setAttribute('class', 'divAux');

        divAux.appendChild(inputBookName);
        divAux.appendChild(inputBookNameText);
        //divAux.appendChild(inputBookNameButton);
        divAux.appendChild(inputBookImage);
        divAux.appendChild(inputBookImageText);
        //divAux.appendChild(inputBookImageButton);
        divAux.appendChild(inputBookProgress);
        divAux.appendChild(inputBookProgressText);
        divAux.appendChild(addBookButton);

        body.appendChild(divAux);

        document.getElementById('addBook').addEventListener('click', sendBook)
        
        function sendBook() {
            let book = {
                "name": inputBookNameText.value,
                "img": inputBookImageText.value,
                "progress": inputBookProgressText.value
            }

            let response = fetch('http://localhost:3000/books', {
            method: 'POST',

            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },

            body: JSON.stringify(book)
        });
        }
    }
    }
}
