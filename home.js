document.addEventListener('DOMContentLoaded', function () {
  const products = document.querySelectorAll('.product');
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');
  const categoryFilter = document.getElementById('category');


  // Add to Cart functionality
  products.forEach(product => {
    product.querySelector('button').addEventListener('click', () => {
      const name = product.querySelector('h3').textContent;
      const priceText = product.querySelector('p').textContent;
      const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let item = cart.find(i => i.name === name);

      if (item) {
        item.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });

  // Search functionality when the button is clicked
  searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  let resultsFound = false;
  if (searchTerm === '') {
    products.forEach(product => product.style.display = 'block');
  } else {
    products.forEach(product => {
      const name = product.querySelector('h3').textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        product.style.display = 'block';
        resultsFound = true;
      } else {
        product.style.display = 'none';
      }
    });
  }
  if (!resultsFound && searchTerm !== '') {
    alert("No products found matching your search term.");
  }
});


  // Category filter functionality
  categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    products.forEach(product => {
      const productCategory = product.getAttribute('data-category');
      if (selectedCategory === 'all' || selectedCategory === productCategory) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });
});
