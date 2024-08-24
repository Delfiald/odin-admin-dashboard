const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search');
const aside = document.querySelector('aside');

const asideNav = document.querySelectorAll('aside i');

const asideNavContainer = document.querySelectorAll('aside ul');

const notifications = document.querySelectorAll('aside .notifications');
const revenues = document.querySelectorAll('.side-section .box-1 .side-content-text');
const chartBar = document.querySelectorAll('.bar-chart .content .bar');

const sort = document.querySelector('.sort');

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

  if(e.target.closest('aside .top li')) {
    e.preventDefault();
    asideNav.forEach((item) => {
      item.classList.remove('active');
    });

    let outerI = e.target;

    while(outerI.parentElement && outerI.parentElement.tagName === 'LI') {
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

  const moreButton = e.target.closest('.more.button');
  
  if(moreButton){
    const currentOption = moreButton.querySelector('.more-options');

    document.querySelectorAll('.more-options').forEach((item) => {
      item.classList.remove('show');
    })

    currentOption.classList.toggle('show');
  }else {
    document.querySelectorAll('.more-options').forEach((item) => {
      item.classList.remove('show');
    })
  }

  const filterButton = e.target.closest('.filter .fas');

  if(filterButton){
    const parentElement = filterButton.parentElement;
    if(e.target === filterButton){
      parentElement.classList.toggle('show');
    }
  }else {
    if(!e.target.closest('.filter')){
      document.querySelector('.filter').classList.remove('show');
    }
  }

  if(e.target.closest('.sort')) {
    sort.classList.toggle('ascend');
    sort.classList.toggle('descend');
  }

  const playerStatus = e.target.closest('.main-section .box-3 .content-highlight')
  if(playerStatus) {
    const currentParent = playerStatus.parentElement;
    console.log(currentParent);

    currentParent.classList.toggle('open');
  }

  const sidebar = e.target.closest('.sidebar-toggler');
  const sidebarClose = e.target.closest('aside .close');
  const sidebarClose2 = e.target.closest('aside .close-2');

  if(sidebar) {
    const aside = document.querySelector('aside');

    aside.classList.add('open');
  }else if(sidebarClose || sidebarClose2) {
    const aside = document.querySelector('aside');

    aside.classList.remove('open');
  }
})

notifications.forEach((item) => {
  if(item.textContent > 25){
    item.classList.add('danger');
  }else if(item.textContent > 15){
    item.classList.add('warning');
  }else {
    item.classList.add('success');
  }
})

revenues.forEach((item) => {
  if(item.textContent.includes('-')) {
    item.classList.add('danger');
  }else {
    item.classList.add('success');
  }
})

chartBar.forEach((bar) => {
  const dataValue = bar.getAttribute('data-value')
  bar.style.height = dataValue;
  bar.style.setProperty('--_data-value', `"${dataValue}"`);
})

function isElementOutOfViewport(el) {
  const rect = el.getBoundingClientRect();
  
  return (
      rect.top >= (window.innerHeight || document.documentElement.clientHeight) || 
      rect.left >= (window.innerWidth || document.documentElement.clientWidth) ||
      rect.bottom <= 0 || 
      rect.right <= 0
  );
}

const close = document.querySelector('aside .close');
const close2 = document.querySelector('aside .close-2');

document.addEventListener('scroll', (e) => {
  if(isElementOutOfViewport(close)){
    close2.classList.add('show');
  }else {
    close2.classList.remove('show');
  }
})