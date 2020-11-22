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

menuOpenBurger.open();

//product slider
let slider = $('.products-slider').bxSlider({
        pager: false,
        controls: false,
        touchEnabled: false
        });

$(document).ready( () => {

  
  let width = $(window).width();
    if (width <= 768) {
      slider.touchEnabled = true;
  }
  });


  $('.product-slider__arrow--direction-prev').click((e) => {
    e.preventDefault();
    slider.goToPrevSlide();
  });

  $('.product-slider__arrow--direction-next').click((e) => {
    e.preventDefault();
    slider.goToNextSlide();
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
$(document).ready( () => {
  let width = $(window).width();
    if (width <= 480) {
      $('.team__content').eq(4).css('height', '250px');
    } else if (width > 480 && width <= 768) {
      $('.team__content').eq(4).css('height', '377px');
    } else {
      $('.team__content').first().css('height', '432px');
    }
})


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
  const triangle = container.find('.equilateralTriangle');

  triangle.removeClass('active');
  itemContainer.removeClass('active');
  items.height(0);
}



$('.team__title').on('click', (e) => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest('.team__item');
  const triangle = $this.next('.equilateralTriangle');
  triangle.addClass('active');

  if(elemContainer.hasClass('active')) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
    triangle.addClass('active');
  }
})

// form modal

const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
    field.removeClass('input-error');
    if (field.val().trim() === '') {
      field.addClass('input-error');
    }
  });
    
  const errorFields = form.find('.input-error');

  return errorFields.length === 0;
}

$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find('[name="name"]');
  const phone = form.find('[name="phone"]');
  const comment = form.find('[name="comment"]');
  const to = form.find('[name="to"]');

  const modal = $('#modal');
  const content = modal.find('.modal__content');

  modal.removeClass('error-modal');

  const isValid = validateFields(form, [name, phone, comment, to]);

 

  
  if (isValid) {
    const request = $.ajax({
      url: 'https://webdev-api.loftschool.com/sendmail',
      method: 'POST',
      data : {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      }
    })
  

  request.done(data => {
    content.text(data.message);
  })

  request.fail(data => {
    const message = data.responseJSON.message;
      content.text(message);
      modal.addClass('error-modal');
  })

  request.always(() => {
    $.fancybox.open({
        src: '#modal',
        type: 'inline'
      })
  })
}
})
  
$('.app-close-modal').on('click', (e) =>{
  e.preventDefault();

  $.fancybox.close();
})