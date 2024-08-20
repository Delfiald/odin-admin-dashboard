const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search');
const aside = document.querySelector('aside');

const asideNav = document.querySelectorAll('aside i');

const asideNavContainer = document.querySelectorAll('aside ul');

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

  if(e.target.closest('aside .top i')) {
    e.preventDefault();
    asideNav.forEach((item) => {
      item.classList.remove('active');
    });

    let outerI = e.target;

    while(outerI.parentElement && outerI.parentElement.tagName === 'I') {
      outerI = outerI.parentElement;
    }
    
    let parent = outerI.parentElement;

    let rectElement = outerI.getBoundingClientRect();
    let rectParent = parent.getBoundingClientRect();

    let top = rectElement.top - rectParent.top;

    const style = asideNavContainer[0];

    style.style.setProperty('--_background-pos', `${top}px`);

    console.log(top);
    
    outerI.classList.add('active');
  }
})