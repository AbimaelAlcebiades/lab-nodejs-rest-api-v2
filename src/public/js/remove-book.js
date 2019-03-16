let booksTable = document.querySelector('#books');

booksTable.addEventListener('click', function (event) {
    let element = event.target;

    if (element.dataset.type == 'remove') {
        let bookId = element.dataset.ref;
        fetch(`http://localhost:3000/books/${bookId}`, { method: 'DELETE' })
            .then(response => {
                let tr = element.closest(`#book_${bookId}`).remove();
            }).catch(error => {
                console.log(error);
            });
    }
});
