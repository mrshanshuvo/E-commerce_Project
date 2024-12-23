document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelectorAll('.product');
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');
  const categoryFilter = document.getElementById('category');
  const languageSelector = document.getElementById('language-selector');

  // Define translations
  const translations = {
    en: {
      categoryLabel: "Category:",
      searchPlaceholder: "Search products...",
      goToCart: "Go to Cart",
      footerAbout:
        "ClickBazaar is an online shopping platform offering a wide range of products at great prices. We aim to provide an easy and convenient shopping experience for all our customers.",
      footerCustomerService: "Customer Service",
      footerFollowUs: "Follow Us",
      footerQuickLinks: "Quick Links",
    },
    bn: {
      categoryLabel: "বিভাগ:",
      searchPlaceholder: "পণ্য খুঁজুন...",
      goToCart: "কার্টে যান",
      footerAbout:
        "ClickBazaar একটি অনলাইন কেনাকাটা প্ল্যাটফর্ম যা দুর্দান্ত দামে বিভিন্ন পণ্য সরবরাহ করে। আমরা আমাদের সমস্ত গ্রাহকের জন্য একটি সহজ এবং সুবিধাজনক কেনাকাটা অভিজ্ঞতা প্রদানের লক্ষ্য রাখি।",
      footerCustomerService: "গ্রাহক সেবা",
      footerFollowUs: "আমাদের অনুসরণ করুন",
      footerQuickLinks: "দ্রুত লিঙ্কসমূহ",
    },
  };

  // Function to update language
  const updateLanguage = (lang) => {
    document.querySelector('label[for="category"]').textContent =
      translations[lang].categoryLabel;
    document.getElementById('search').placeholder =
      translations[lang].searchPlaceholder;
    document.querySelector('.go-to-cart-btn').textContent =
      translations[lang].goToCart;
    document.querySelector('.footer-section:nth-child(1) p').textContent =
      translations[lang].footerAbout;
    document.querySelector('.footer-section:nth-child(2) h3').textContent =
      translations[lang].footerCustomerService;
    document.querySelector('.footer-section:nth-child(3) h3').textContent =
      translations[lang].footerFollowUs;
    document.querySelector('.footer-section:nth-child(4) h3').textContent =
      translations[lang].footerQuickLinks;
  };
  languageSelector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    updateLanguage(selectedLang);
  });

  updateLanguage(languageSelector.value);

  
// Add to Cart functionality
const addToCart = (event) => {
  const productFooter = event.target.closest('.product-footer');
  const product = productFooter.parentNode;
  const name = product.querySelector('h3').textContent.trim();
  const priceText = product.querySelector('.price').textContent;
  const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
  
  // Get the selected quantity from the dropdown
  const quantityDropdown = product.querySelector('select[name="quantity"]');
  const selectedQuantity = parseInt(quantityDropdown.value, 10); // Convert to integer
  
  if (selectedQuantity <= 0 || isNaN(selectedQuantity)) {
    alert('Please select a valid quantity!');
    return;
  }

 
  const imageUrl = product.querySelector('img').src; 

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find((item) => item.name === name);

  if (existingProduct) {
 
    existingProduct.quantity += selectedQuantity;
  } else {
   
    cart.push({ name, price, quantity: selectedQuantity, image: imageUrl });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  const addButton = productFooter.querySelector('button');
  addButton.textContent = `Added (${selectedQuantity})`;

  addButton.disabled = true;

  setTimeout(() => {
    addButton.textContent = 'Add to Cart';
    addButton.disabled = false; 
  }, 1000); 
};

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.product-footer button').forEach(button => {
  button.addEventListener('click', addToCart);
});

  products.forEach((product) => {
    const addButton = product.querySelector('button');
    if (addButton) {
      addButton.addEventListener('click', () => addToCart(product));
    }
  });

  // Search functionality
  const searchProducts = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let resultsFound = false;

    products.forEach((product) => {
      const name = product.querySelector('h3').textContent.toLowerCase();
      if (searchTerm === '' || name.includes(searchTerm)) {
        product.style.display = 'block';
        resultsFound = true;
      } else {
        product.style.display = 'none';
      }
    });

    if (!resultsFound && searchTerm !== '') {
      alert("No products found matching your search term.");
    }
  };

  searchButton.addEventListener('click', searchProducts);

  // Category filter functionality
  const filterByCategory = () => {
    const selectedCategory = categoryFilter.value;

    products.forEach((product) => {
      const productCategory = product.getAttribute('data-category');
      product.style.display =
        selectedCategory === 'all' || selectedCategory === productCategory
          ? 'block'
          : 'none';
    });
  };

  categoryFilter.addEventListener('change', filterByCategory);
 // Modal Functionality for Product Details
 const showProductDetails = (product) => {
  const name = product.querySelector('h3').textContent.trim();
  const price = product.querySelector('.price').textContent.trim();
  const imageUrl = product.querySelector('img').src;
  const description = product.getAttribute('data-description') || "No description available.";

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <img src="${imageUrl}" alt="${name}" />
      <h3>${name}</h3>
      <p>${price}</p>
      <p>${description}</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
};

products.forEach((product) => {
  const image = product.querySelector('img');
  if (image) {
    image.addEventListener('click', () => showProductDetails(product));
  }
});
const serviceLinks = document.querySelectorAll('.service-link');

  const showServiceModal = (content) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h3>Customer Service</h3>
        <p>${content}</p>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  };

  serviceLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const content = link.getAttribute('data-content');
      showServiceModal(content);
    });
  });
});
