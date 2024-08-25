const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search');
const aside = document.querySelector('aside');
const asideNav = document.querySelectorAll('aside i');
const asideNavContainer = document.querySelectorAll('aside ul');
const notifications = document.querySelectorAll('aside .notifications');
const revenues = document.querySelectorAll('.side-section .box-1 .side-content-text');
const chartBar = document.querySelectorAll('.bar-chart .content .bar');
const headerNotification = document.querySelector('header .notifications')
const sort = document.querySelector('.sort');
const close = document.querySelector('aside .close');
const close2 = document.querySelector('aside .close-2');
const filter = document.querySelector('.filter');
const circleWrapper = document.querySelector('.circle-wrapper')
const circleChartOuter = circleWrapper.querySelector('.outer-circle');
const percentage = circleWrapper.querySelector('.percentage');
const circleChartInner = circleWrapper.querySelector('.middle-circle')
const mainContent = document.querySelector('.main-section');
let hoverTime;
const addingContent = document.querySelector('.adding-main-box-1-content');
const submitContent = document.querySelector('.submit-content');
const inputContainer = document.querySelector('.input-container');
const title = inputContainer.querySelector('#title');
const text = inputContainer.querySelector('#text');
let editingContent = null;

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

// Toggle Header Notifications
const toggleHeaderNotif = () => {
  headerNotification.classList.add('show');
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
  const moreOptions = document.querySelectorAll('.more-options');

  moreOptions.forEach((item) => {
    item.classList.remove('show');
  })

  currentOption.classList.toggle('show');

  console.log("heeha")
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

// Circle Chart Hover Handler
const getMousePos = (e) => {
  const rect = circleChartOuter.getBoundingClientRect();
  
  const xPos = e.clientX - rect.left;
  const yPos = e.clientY - rect.top;

  return {xPos, yPos};
}

const showPercentage = (e) => {
  const percentageValue = e.target.getAttribute('data-value');
  const {xPos, yPos} = getMousePos(e);
  
  hoverTime = setTimeout(() => {
    percentage.textContent = percentageValue;
    percentage.classList.add('show');
    percentage.style.top = `${yPos + 5}px`;
    percentage.style.left = `${xPos + 5}px`;
  }, 500)
}

const hidePercentage = (e) => {
  clearTimeout(hoverTime);
  percentage.classList.remove('show');
}

// CRUD Content on Main Box-1
const checkValidity = () => {
  if(!title.checkValidity()){
    title.reportValidity();
  }else{
    cloneContent(title, text);
  }
}

const cloneContent = (title, text) => {
  const box1 = mainContent.querySelector('.box-1');

  if(editingContent) {
    editingContent.querySelector('.content-hero h3').textContent = title.value;
    editingContent.querySelector('.content-text').textContent = text.value;
    editingContent.querySelector('.time').textContent = '0s';
    editingContent = null;
  }else {
    const originalContent = box1.querySelector('.content-1');

    const clonedContent = originalContent.cloneNode(true);
  
    clonedContent.querySelector('.content-hero h3').textContent = title.value;
    clonedContent.querySelector('.content-text').textContent = text.value;
    clonedContent.querySelector('.time').textContent = '0s';
  
    box1.insertBefore(clonedContent, box1.firstChild);
  }

  addingContent.classList.remove('show');
}

const removeContent = (removeButton) => {
  const contentParent = removeButton.closest('.main-section .box-1 > div');

  if(contentParent) {
    contentParent.remove();
  }
}

const toggleAddingContent = () => {
  addingContent.classList.add('show');
  title.value = '';
  text.value = '';
}

const editContent = (editButton) => {
  addingContent.classList.add('show');

  editingContent = editButton.closest('.main-section .box-1 > div');

  const originalTitle = editingContent.querySelector('.content-hero h3').textContent;
  const originalText = editingContent.querySelector('.content-text').textContent;

  inputContainer.querySelector('#title').value = originalTitle;

  inputContainer.querySelector('#text').value = originalText;
}

// Event Listeners
document.addEventListener('click', (e) => {
  const insideSearchBox = e.target.closest('.search-box');
  const headerNotificationBtn = e.target.closest('header .notifications');
  const moreButton = e.target.closest('.more.button');
  const removeButton = e.target.closest('.more .delete');
  const editContentButton = e.target.closest('.more .edit');
  const filterButton = e.target.closest('.filter .fas');
  const playerStatus = e.target.closest('.main-section .box-3 .content-highlight');
  const addingContentButton = e.target.closest('.adding-content');

  const addingContentCloseButton = e.target.closest('.adding-main-box-1-content .close')

  const submitContentButton = e.target.closest('.adding-main-box-1-content .submit-content')

  if(insideSearchBox) {
    searchBarToggler(e);
  }else{
    if(searchInput.value === ''){
      searchBox.classList.remove('open');
    }
  }

  if(headerNotificationBtn) {
    toggleHeaderNotif();
  }else{
    headerNotification.classList.remove('show');
  }

  if(e.target.closest('aside .top li')) activateAsideItem(e);

  if(moreButton){
    moreButtonToggler(moreButton);
  }else {
    const moreOptions = document.querySelectorAll('.more-options');

    moreOptions.forEach((item) => {
      item.classList.remove('show');
    })
  }

  if(removeButton){
    removeContent(removeButton);
  }

  if(editContentButton) {
    editContent(editContentButton);
  }

  if(addingContentButton) {
    toggleAddingContent();
  }

  if(addingContentCloseButton) {
    addingContent.classList.remove('show');
  }

  if(submitContentButton) {
    checkValidity();
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

[circleChartOuter, circleChartInner].forEach((element) => {
  element.addEventListener('mouseenter', showPercentage);
  element.addEventListener('mouseleave', hidePercentage);
});

// Initialize Components
initializeNotifications();
initializeRevenues();
initializeChartBars();