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

