const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('click', (e) => {
  const label = e.target.closest('#search-icon');

  if(label) {
    searchBox.classList.toggle('open');
  }
})