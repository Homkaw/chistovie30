
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');

  // MOBILE MENU
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });

  // CATALOG BUTTON
  document.getElementById('catalogBtn').addEventListener('click', () => {
    document.getElementById('categories').scrollIntoView({
      behavior: 'smooth'
    });
  });

  // SEARCH
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const productCards = document.querySelectorAll('.product-card');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      productCards.forEach(card => card.style.display = '');
      return;
    }

    let found = 0;

    productCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const title = card.querySelector('h3').textContent.toLowerCase();

      const match = name.includes(query) || title.includes(query);

      card.style.display = match ? '' : 'none';

      if (match) found++;
    });

    document.getElementById('products').scrollIntoView({
      behavior: 'smooth'
    });

    if (!found) {
      showToast('В демонстрационном каталоге ничего не найдено');
    }
  });

  // CART
  let cartCount = 0;
  const cartCounter = document.getElementById('cartCount');

  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
      cartCount++;
      cartCounter.textContent = cartCount;

      const oldText = button.textContent;
      button.textContent = '✓';

      setTimeout(() => {
        button.textContent = oldText;
      }, 700);

      showToast('Товар добавлен в демонстрационную корзину');
    });
  });

  // FAVORITES
  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      button.textContent = button.classList.contains('active') ? '♥' : '♡';

      showToast(
        button.classList.contains('active')
          ? 'Добавлено в избранное'
          : 'Удалено из избранного'
      );
    });
  });

  // TOAST
  let toastTimeout;

  function showToast(message) {
    const toast = document.getElementById('toast');

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2300);
  }

  // SCROLL REVEAL
  const revealElements = document.querySelectorAll(
    '.category-card, .product-card, .advantage-card, .news-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
});
