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

  // Set default language on page load
  updateLanguage(languageSelector.value);

  // Add to Cart functionality
  const addToCart = (productFooter) => {
    const product = productFooter.parentNode; // Get the parent product element
    const name = product.querySelector('h3').textContent.trim(); // Product name
    const priceText = product.querySelector('.price').textContent; // Product price text
    const price = parseFloat(priceText.replace(/[^\d.-]/g, '')); // Extract numerical price
    
    // Get the selected quantity from the dropdown
    const quantityDropdown = product.querySelector('select[name="quantity"]');
    const selectedQuantity = parseInt(quantityDropdown.value, 10); // Convert to integer
    
    if (selectedQuantity <= 0 || isNaN(selectedQuantity)) {
      alert('Please select a valid quantity!');
      return;
    }
  
    // Get the product image URL
    const imageUrl = product.querySelector('img').src; // Assuming the product image is an <img> tag
  
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage
  
    // Find the product in the cart
    const existingProduct = cart.find((item) => item.name === name);
  
    if (existingProduct) {
      // If the product already exists in the cart, increment its quantity
      existingProduct.quantity += selectedQuantity;
    } else {
      // If the product is not in the cart, add it as a new entry
      cart.push({ name, price, quantity: selectedQuantity, image: imageUrl }); // Add image to the cart data
    }
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Update button text
    const addButton = productFooter.querySelector('button');
    addButton.textContent = `Added (${selectedQuantity})`;  // Change the button text to 'Added (quantity)'
  
    // Disable the button to prevent further clicks
    addButton.disabled = true;
  
    // Re-enable the button after 1 second
    setTimeout(() => {
      addButton.textContent = 'Add to Cart';  // Reset the button text back to 'Add to Cart'
      addButton.disabled = false;  // Re-enable the button
    }, 1000); // 1000 ms = 1 second
  };
  
  

  

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
});
