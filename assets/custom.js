document.addEventListener("DOMContentLoaded", () => {
    // Selector for the cart item rows
    const cartItems = document.querySelectorAll('form#cart table.cart-items tr.cart-item');

    // Check if the cart contains a specific product ID
    const productInCart = Array.from(cartItems).some(
        item => item.getAttribute('data-productid') === '7931498627209'
    );

    if (productInCart) {
        // Prepare form data
        let formData = {
            items: [{
                id: 43169315094665, // Product variant ID to add
                quantity: 1
            }]
        };

        // Perform the fetch request to add the product to the cart
        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Product added:', data);
            // Reload the `form#cart` element
            const cartForm = document.querySelector('form#cart');
            if (cartForm) {
                cartForm.innerHTML = ''; // Clear current form contents
                fetch(window.Shopify.routes.root + 'cart')
                    .then(response => response.text())
                    .then(html => {
                        // Extract and replace the cart form content
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const newCartForm = doc.querySelector('form#cart');
                        if (newCartForm) {
                            cartForm.innerHTML = newCartForm.innerHTML;
                        }
                    });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
