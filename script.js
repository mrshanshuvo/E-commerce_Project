document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartList = document.createElement('ul');
    const buttons = document.querySelectorAll('#product-list button');
    const cartContainer = document.createElement('div');

    // Add Cart Section
    cartContainer.innerHTML = `
        <h2>Cart</h2>
    `;
    cartContainer.appendChild(cartList);
    document.body.appendChild(cartContainer);

    // Add to Cart Functionality
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productName = button.previousElementSibling.previousElementSibling.textContent;
            const price = button.previousElementSibling.textContent;
            cart.push({ productName, price });
            updateCart();
        });
    });

    function updateCart() {
        cartList.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.productName} - ${item.price}`;
            cartList.appendChild(listItem);
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(filter)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Checkout Functionality
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Checkout successful!");
        }
    });
});
