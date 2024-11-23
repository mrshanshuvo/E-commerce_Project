document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
  
    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <span>${item.name} - $${item.price} x ${item.quantity}</span>
        <button class="remove-item">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
  
      div.querySelector('.remove-item').addEventListener('click', () => {
        const updatedCart = cart.filter(i => i.name !== item.name);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        location.reload();
      });
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toFixed(2);
  });
  