const homeBtn = document.getElementById('home-btn');

homeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/';
});