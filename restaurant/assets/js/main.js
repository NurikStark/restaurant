(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  



// 1 Parallax
const scene = document.getElementById('scene');
const parallaxInstance = new Parallax(scene);

// 2 Tabs
$('.nav-item').on('click', function(){
  let currTab = $(this).index();

  $('.nav-item').removeClass('active');
  $(this).addClass('active');

  $('.tab-pane').removeClass('show active');
  $('.tab-pane').eq(currTab).addClass('show active');
})
$(".nav-item").click(function() {
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top + "px"
      }, {
         duration: 500,
         easing: "swing"
      });
      return false;
});

// 3 modal-menu  
$('.slicknav_btn').on('click', function() {
  $('.main-menu').toggle();
})
$('.close').on('click', function() {
  $('.main-menu').hide();
})

const swiper = new Swiper('.swiper-container', {
  spaceBetween : 50,

  loop : true,
  stopOnLastSlide : false,
});

// 4 modal-window

$('.border-btn').on('click', function(){
  $('.wrapper-window').show();
})
$('.form-close').on('click', function() {
  $('.wrapper-window').hide();
})
$('.overlay').on('click', function(){
  $('.wrapper-window').hide();
});

// 5 validate
$('.button-form').on('.click', function(e){
  e.preventDefault();
  $(this).parent('form').submit();
})

$.validator.addMethod('regex', function(value, element, regexp){
  let regExsp = new RegExp(regexp);
  return regExsp.test(value);
}, 'please check your input')

function valOll(ol) {
  ol.validate({
    rules : { 
      firstName : {
        required : true,
        regex : "[A-Za-z]{1,31}"
      },
      email : {
        required : true,
        regex : "[0-9A-Za-z]"
      },
      phoneNumber : {
        required : true,
        digits : true,
        minlength : 10,
        maxlength : 11,
        regex : "[0-9]+"
      }
    },
    messages : {
    firstName : {
      required: 'Faild is required',
      regexp : 'Enter your name currectly'
    },
    email : {
      required: 'Faild is required',
      regexp : 'Enter your email currectly'
    },
    phoneNumber : {
      required: 'Faild is required',
      regexp : 'Enter your number currectly'
    }
      },
  submitHandler: function(form) {
    $('#preloader-active').fadeIn();  
    let $form = $(form);
    let $formId = $(form).attr('id');
    switch($formId) {
      case 'form-book':
      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize()
      })
      .done(function() {
        console.log('Successe');
      })
      .fail(function(){
        console.log('Fail');
      })
      .always(function(){
        setTimeout(function() {
          $form.trigger('reset');
          $('.wrapper-modal').fadeOut();
        }, 1000);
        setTimeout(function(){
          $('#preloader-active').fadeOut();
        }, 1400)
      });
      break;
      case 'search-box':
      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize()
      })
      .done(function()   {
        console.log('Successe');
      })
      .fail(function(){
        console.log('Fail');
      })
      .always(function(){
        setTimeout(function() {
          $form.trigger('reset');
        }, 1000);
        setTimeout(function(){
          $('#preloader-active').fadeOut();
        }, 1400)
      });
      break;
    }
    return false;
  }
  })
};
$('.form-val').on('click', function (){
  valOll($(this));
}) 

})(jQuery);