// Handling submission of Contract
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.insert-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);

        // Convert form data to JSON
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Send a POST request to your API
        fetch('http://localhost:3000/api/contracts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response (e.g., show a success message)
            console.log('Contract created:', data);
        })
        .catch(error => {
            console.error('Error creating contract:', error);
        });
    });
});
