document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const buttons = document.querySelectorAll('#product-list button');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            cart.push(`Product ${index + 1}`);
            alert(`Added Product ${index + 1} to the cart!`);
            console.log("Cart:", cart);
        });
    });
});
