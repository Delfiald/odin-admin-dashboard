const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search');
const aside = document.querySelector('aside');

const asideNav = document.querySelectorAll('aside i');

document.addEventListener('click', (e) => {
  const insideSearchBox = e.target.closest('.search-box');

  if(insideSearchBox) {
    if(e.target.closest('#search-icon')) {
      if(searchInput.value === ''){
        searchBox.classList.toggle('open');
      }
    }
  }else{
    if(searchInput.value === ''){
      searchBox.classList.remove('open');
    }
  }

  if(e.target.closest('aside i')) {
    asideNav.forEach((item) => {
      item.classList.remove('active');
    });

    const navButton = e.target;
    console.log(navButton);
    
    navButton.classList.add('active');
  }
})