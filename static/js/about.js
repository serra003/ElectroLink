// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const logoImage = document.getElementById('logoImage');

function applyTheme(theme) {
  if(theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.className = 'fas fa-sun text-2xl text-yellow-400';
    logoImage.src = './static/images/logo-dark.png';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.className = 'fas fa-moon text-2xl text-gray-700';
    logoImage.src = './static/images/logo-light.png';
  }
  localStorage.setItem('theme', theme);
}

// Load saved theme
applyTheme(localStorage.getItem('theme') || 'light');

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
});

// Cart count
const cart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('cartCount').textContent = cart.length;

// Mobile menu toggle
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});
