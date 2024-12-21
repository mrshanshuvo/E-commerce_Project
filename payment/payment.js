document.addEventListener('DOMContentLoaded', function () {
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
  
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  
    if (cart.length === 0) {
      orderItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      orderTotalElement.textContent = '0.00';
      return;
    }
  
    function renderOrderItems(cart) {
      cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.innerHTML = `
          <p>${item.name} - $${item.price} x ${item.quantity}</p>
        `;
        orderItemsContainer.appendChild(div);
      });
    }
  
    function calculateTotal(cart) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      orderTotalElement.textContent = total.toFixed(2);
    }
  
    renderOrderItems(cart);
    calculateTotal(cart);
  
    document.getElementById('payment-form').addEventListener('submit', function (e) {
      e.preventDefault();
  
      alert('Payment successful!');
  
      sessionStorage.removeItem('cart');
      localStorage.removeItem('cart');

      window.location.href = '../home/home.html';
    });
  });
  