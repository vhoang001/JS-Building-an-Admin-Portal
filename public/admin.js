
// Your Code Here

document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Retrieve a list of books from the server
    fetch('http://localhost:3001/listBooks')
        .then(response => response.json())
        .then(books => {
            // Assuming 'books' is an array of book objects
            books.forEach(book => {
                const row = document.createElement('div');
                row.className = 'row mb-3';

                // Step 2: Display a list of book titles to the admin
                const titleCol = document.createElement('div');
                titleCol.className = 'col-md-4';
                titleCol.textContent = book.title;
                row.appendChild(titleCol);

                // Step 3 & 4: Place a text input next to each book title with quantity
                const quantityCol = document.createElement('div');
                quantityCol.className = 'col-md-4';
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.className = 'form-control';
                quantityInput.value = book.quantity;
                quantityCol.appendChild(quantityInput);
                row.appendChild(quantityCol);

                // Step 5: Place a submit button next to each text input
                const buttonCol = document.createElement('div');
                buttonCol.className = 'col-md-4';
                const saveButton = document.createElement('button');
                saveButton.className = 'btn btn-primary';
                saveButton.textContent = 'Save';
                saveButton.onclick = function() {
                    // Step 6 & 7: When clicked, save the updated quantity to the server
                    const updatedQuantity = quantityInput.value;
                    fetch(`http://localhost:3001/listBooks${book.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ quantity: updatedQuantity })
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(data => {
                        console.log('Success:', data);
                        // You can add a success alert here if needed
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // You can add an error alert here if needed
                    });
                };
                buttonCol.appendChild(saveButton);
                row.appendChild(buttonCol);

                document.getElementById('root').appendChild(row); 
            });
        });
});

