document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const clearCartButton = document.getElementById('clear-cart-btn');

  function renderCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
      <span>${item.name} - ৳${item.price}</span>
      <div class="quantity-controls">
        <button class="decrement" data-item="${item.name}">-</button>
        <span class="item-quantity">${item.quantity}</span>
        <button class="increment" data-item="${item.name}">+</button>
      </div>
      <button class="save-for-later" data-item="${item.name}">Save for Later</button>
      <button class="remove-item" aria-label="Remove ${item.name}">Remove</button>
    `;

    div.querySelector('.increment').addEventListener('click', () => {
      updateItemQuantity(item.name, item.quantity + 1);
    });

    div.querySelector('.decrement').addEventListener('click', () => {
      if (item.quantity > 1) {
        updateItemQuantity(item.name, item.quantity - 1);
      }
    });

    div.querySelector('.save-for-later').addEventListener('click', () => {
      const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
      savedItems.push(item);
      localStorage.setItem('savedItems', JSON.stringify(savedItems));
      const updatedCart = cart.filter((i) => i.name !== item.name);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      location.reload();
    });
    div.querySelector('.remove-item').addEventListener('click', () => {
      const updatedCart = cart.filter((i) => i.name !== item.name);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      location.reload();
    });

    return div;
  }

  function updateItemQuantity(name, quantity) {
    const updatedCart = cart.map((i) => {
      if (i.name === name) {
        i.quantity = quantity;
      }
      return i;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    location.reload();
  }

  function updateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toFixed(2);
  }

  function renderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const container = document.querySelector('.wishlist-container');
    wishlist.forEach((item) => {
      const div = document.createElement('div');
      div.classList.add('wishlist-item');
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="wishlist-item-image" />
        <p>${item.name} - ৳${item.price}</p>
        <button class="add-to-cart" data-item="${item.name}">Add to Cart</button>
      `;
      div.querySelector('.add-to-cart').addEventListener('click', () => {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item.name} added to your cart!`);
      });
      container.appendChild(div);
    });
  }

  cart.forEach((item) => cartItemsContainer.appendChild(renderCartItem(item)));
  updateTotal(cart);
  renderWishlist();

  clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    location.reload();
  });

  document.getElementById('checkout-btn').addEventListener('click', () => {
    sessionStorage.setItem('cart', JSON.stringify(cart));

    localStorage.removeItem('cart');
    window.location.href = '../payment/payment.html';
  });
  
});
