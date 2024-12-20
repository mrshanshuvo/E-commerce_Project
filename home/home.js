document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelectorAll('.product');
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');
  const categoryFilter = document.getElementById('category');

  // Add to Cart functionality
  const addToCart = (product) => {
    const name = product.querySelector('h3').textContent.trim();
    const priceText = product.querySelector('p').textContent;
    const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find((i) => i.name === name);

    if (item) {
      item.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
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
document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('language-selector');
  
  // Define translations
  const translations = {
    en: {
      categoryLabel: "Category:",
      searchPlaceholder: "Search products...",
      loginSignup: "Login/Signup",
      wishlist: "Wishlist",
      goToCart: "Go to Cart",
      footerAbout: "ClickBazaar is an online shopping platform offering a wide range of products at great prices. We aim to provide an easy and convenient shopping experience for all our customers.",
      footerCustomerService: "Customer Service",
      footerFollowUs: "Follow Us",
      footerQuickLinks: "Quick Links",
    },
    bn: {
      categoryLabel: "বিভাগ:",
      searchPlaceholder: "পণ্য খুঁজুন...",
      loginSignup: "লগইন/সাইনআপ",
      wishlist: "পছন্দ তালিকা",
      goToCart: "কার্টে যান",
      footerAbout: "ClickBazaar একটি অনলাইন কেনাকাটা প্ল্যাটফর্ম যা দুর্দান্ত দামে বিভিন্ন পণ্য সরবরাহ করে। আমরা আমাদের সমস্ত গ্রাহকের জন্য একটি সহজ এবং সুবিধাজনক কেনাকাটা অভিজ্ঞতা প্রদানের লক্ষ্য রাখি।",
      footerCustomerService: "গ্রাহক সেবা",
      footerFollowUs: "আমাদের অনুসরণ করুন",
      footerQuickLinks: "দ্রুত লিঙ্কসমূহ",
    }
  };

  // Function to update language
  const updateLanguage = (lang) => {
    document.querySelector('label[for="category"]').textContent = translations[lang].categoryLabel;
    document.getElementById('search').placeholder = translations[lang].searchPlaceholder;
    document.querySelector('.auth-btn').textContent = translations[lang].loginSignup;
    document.querySelector('.wishlist-btn').textContent = translations[lang].wishlist;
    document.querySelector('.go-to-cart-btn').textContent = translations[lang].goToCart;
    document.querySelector('.footer-section:nth-child(1) p').textContent = translations[lang].footerAbout;
    document.querySelector('.footer-section:nth-child(2) h3').textContent = translations[lang].footerCustomerService;
    document.querySelector('.footer-section:nth-child(3) h3').textContent = translations[lang].footerFollowUs;
    document.querySelector('.footer-section:nth-child(4) h3').textContent = translations[lang].footerQuickLinks;
  };

  // Event listener for language change
  languageSelector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    updateLanguage(selectedLang);
  });

  // Set default language on page load
  updateLanguage(languageSelector.value);
});

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
document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('language-selector');
  
  // Define translations
  const translations = {
    en: {
      categoryLabel: "Category:",
      searchPlaceholder: "Search products...",
      loginSignup: "Login/Signup",
      wishlist: "Wishlist",
      goToCart: "Go to Cart",
      footerAbout: "ClickBazaar is an online shopping platform offering a wide range of products at great prices. We aim to provide an easy and convenient shopping experience for all our customers.",
      footerCustomerService: "Customer Service",
      footerFollowUs: "Follow Us",
      footerQuickLinks: "Quick Links",
    },
    bn: {
      categoryLabel: "বিভাগ:",
      searchPlaceholder: "পণ্য খুঁজুন...",
      loginSignup: "লগইন/সাইনআপ",
      wishlist: "পছন্দ তালিকা",
      goToCart: "কার্টে যান",
      footerAbout: "ClickBazaar একটি অনলাইন কেনাকাটা প্ল্যাটফর্ম যা দুর্দান্ত দামে বিভিন্ন পণ্য সরবরাহ করে। আমরা আমাদের সমস্ত গ্রাহকের জন্য একটি সহজ এবং সুবিধাজনক কেনাকাটা অভিজ্ঞতা প্রদানের লক্ষ্য রাখি।",
      footerCustomerService: "গ্রাহক সেবা",
      footerFollowUs: "আমাদের অনুসরণ করুন",
      footerQuickLinks: "দ্রুত লিঙ্কসমূহ",
    }
  };

  // Function to update language
  const updateLanguage = (lang) => {
    document.querySelector('label[for="category"]').textContent = translations[lang].categoryLabel;
    document.getElementById('search').placeholder = translations[lang].searchPlaceholder;
    document.querySelector('.auth-btn').textContent = translations[lang].loginSignup;
    document.querySelector('.wishlist-btn').textContent = translations[lang].wishlist;
    document.querySelector('.go-to-cart-btn').textContent = translations[lang].goToCart;
    document.querySelector('.footer-section:nth-child(1) p').textContent = translations[lang].footerAbout;
    document.querySelector('.footer-section:nth-child(2) h3').textContent = translations[lang].footerCustomerService;
    document.querySelector('.footer-section:nth-child(3) h3').textContent = translations[lang].footerFollowUs;
    document.querySelector('.footer-section:nth-child(4) h3').textContent = translations[lang].footerQuickLinks;
  };

  // Event listener for language change
  languageSelector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    updateLanguage(selectedLang);
  });

  // Set default language on page load
  updateLanguage(languageSelector.value);
});
