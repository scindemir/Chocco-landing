//hamburger menu

let menuOpenBurger = (function (buttonClass, menuClass) {
  let button = document.querySelector(buttonClass);
  let menu = document.querySelector(menuClass);
  let body = document.querySelector('body');
  let buttonClose = document.querySelector('.btn-close');

  let _toggleMenu = function (e) {
    button.classList.toggle('hamburger--active');
    menu.classList.toggle('overlay--open');
    body.classList.toggle('body-active-menu');
    buttonClose.classList.toggle('hamburger')
  }
  

  let addListeners = function () {
    button.addEventListener('click', _toggleMenu);
    buttonClose.addEventListener('click', _toggleMenu);
  };

  return {
    open: addListeners,
  };


})('#toggle', '#overlay', '#close');

console.log(menuOpenBurger);
menuOpenBurger.open();

//product slider
$('.products-slider').bxSlider({
  pager: false;
  });


//reviews switcher

const findBlockByAlias = alias => {
 return $('.reviews__item').filter((ndx, item) =>{
    return $(item).attr('data-linked-with') === alias;
  })
}

$('.interactive-avatar__link').on('click', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr('data-open');
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest('.reviews__switcher-item');

  itemToShow.addClass('active').siblings().removeClass('active');
  curItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
})

// team

const openItem = item => {
  const container = item.closest('.team__item');
  const contentBlock = container.find('.team__content');
  const textBlock = contentBlock.find('.team__content-block');
  const reqHeight = textBlock.height();

  container.addClass('active');
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find('.team__content');
  const itemContainer = container.find('.team__item');

  itemContainer.removeClass('active');
  items.height(0);
}



$('.team__title').on('click', (e) => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest('.team__item');
  

  if(elemContainer.hasClass('active')) {
    closeEveryItem(container);
  } else {
    openItem($this);
  }


  
})