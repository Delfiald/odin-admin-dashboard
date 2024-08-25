const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search');
const aside = document.querySelector('aside');

const asideNav = document.querySelectorAll('aside i');

const asideNavContainer = document.querySelectorAll('aside ul');

const notifications = document.querySelectorAll('aside .notifications');
const revenues = document.querySelectorAll('.side-section .box-1 .side-content-text');
const chartBar = document.querySelectorAll('.bar-chart .content .bar');

const sort = document.querySelector('.sort');

const close = document.querySelector('aside .close');
const close2 = document.querySelector('aside .close-2');

const moreOptions = document.querySelectorAll('.more-options');

const filter = document.querySelector('.filter');

// Notifications
const initializeNotifications = () => {
  notifications.forEach((item) => {
    if(item.textContent > 25){
      item.classList.add('danger');
    }else if(item.textContent > 15){
      item.classList.add('warning');
    }else {
      item.classList.add('success');
    }
  })
}

// Revenues
const initializeRevenues = () => {
  revenues.forEach((item) => {
    if(item.textContent.includes('-')) {
      item.classList.add('danger');
    }else {
      item.classList.add('success');
    }
  })
}

// Chart Bar
const initializeChartBars = () => {
  chartBar.forEach((bar) => {
    const dataValue = bar.getAttribute('data-value')
    bar.style.height = dataValue;
    bar.style.setProperty('--_data-value', `"${dataValue}"`);
  })
}

// Toggle Search Bar
const searchBarToggler = (e) => {
  if(e.target.closest('#search-icon')) {
    if(searchInput.value === ''){
      searchBox.classList.toggle('open');
    }
  }
}

// Activate Sidebar Item
const activateAsideItem = (e) => {
  e.preventDefault();
  asideNav.forEach((item) => item.classList.remove('active'));

  let outerI = e.target;

  while(outerI.parentElement && outerI.parentElement.tagName === 'LI') {
    outerI = outerI.parentElement;
  }

  const top = outerI.getBoundingClientRect().top - outerI.parentElement.getBoundingClientRect().top;

  const style = asideNavContainer[0];

  style.style.setProperty('--_background-pos', `${top}px`);
  
  outerI.classList.add('active');
}

// Toggle More Options
const moreButtonToggler = (moreButton) => {
  const currentOption = moreButton.querySelector('.more-options');

  moreOptions.forEach((item) => {
    item.classList.remove('show');
  })

  currentOption.classList.toggle('show');
}

// Toggle Filter
const filterButtonToggler = () => {
  filter.classList.toggle('show');
}

// Toggle Sort
const toggleSort = () => {
  sort.classList.toggle('ascend');
  sort.classList.toggle('descend');
}

// Toggle Player Status
const playerStatusToggler = (playerStatus) => {
  const currentParent = playerStatus.parentElement;
  currentParent.classList.toggle('open');
}

// Toggle Sidebar
const sidebarToggler = (e) => {
  const sidebar = e.target.closest('.sidebar-toggler');
  const sidebarClose = e.target.closest('aside .close, aside .close-2');

  if(sidebar) {
    aside.classList.add('open');
  }else if(sidebarClose) {
    aside.classList.remove('open');
  }
}

// Handle Scroll
function isElementOutOfViewport(el) {
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top >= window.innerHeight || rect.left >= window.innerWidth ||
    rect.bottom <= 0 || rect.right <= 0
  );
}

const handleScroll = () => {
  if(isElementOutOfViewport(close)){
    close2.classList.add('show');
  }else {
    close2.classList.remove('show');
  }
}

// Event Listeners
document.addEventListener('click', (e) => {
  const insideSearchBox = e.target.closest('.search-box');
  const moreButton = e.target.closest('.more.button');
  const filterButton = e.target.closest('.filter .fas');
  const playerStatus = e.target.closest('.main-section .box-3 .content-highlight');

  if(insideSearchBox) {
    searchBarToggler(e);
  }else{
    if(searchInput.value === ''){
      searchBox.classList.remove('open');
    }
  }

  if(e.target.closest('aside .top li')) activateAsideItem(e);

  if(moreButton){
    moreButtonToggler(moreButton);
  }else {
    moreOptions.forEach((item) => {
      item.classList.remove('show');
    })
  }

  if(filterButton){
    filterButtonToggler();
  }else {
    if(!e.target.closest('.filter')){
      filter.classList.remove('show');
    }
  }

  if (e.target.closest('.sort')) toggleSort();

  if(playerStatus) {
    playerStatusToggler(playerStatus);
  }

  sidebarToggler(e);
})

document.addEventListener('scroll', handleScroll);

// Initialize Components
initializeNotifications();
initializeRevenues();
initializeChartBars();