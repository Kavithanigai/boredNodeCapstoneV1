
//Sticky navigation
function stickyNav(){
 $('.js--section-features').waypoint(function(direction){
    if(direction == 'down'){
      $('nav').addClass('sticky');
    }else{
      $('nav').removeClass('sticky');
    }
  },{
  offset: '60px;'
  });
}

//Scroll on buttons
function scrollBtn(){
  $('.js--scroll-to-play').click(function() {
    $('html, body').animate({scrollTop: $('.js--section-features').offset().top},1000);
  });
  $('.js--scroll-to-howto').click(function() {
    //event.preventDefault();
    $('html, body').animate({scrollTop: $('.js--section-steps').offset().top},1000);
  });
}


//Navigation Scroll
function scrollNav(){
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });
 }

 function animations(){
   $('.js--wp-1').waypoint(function(direction){
        $('.js--wp-1').addClass('animated fadeIn');
    },{
    offset: '50%'
    });
    $('.js--wp-2').waypoint(function(direction){
         $('.js--wp-2').addClass('animated fadeInUp');
     },{
     offset: '60%'
     });
 }

//Mobile Navigation
 function mobileNav(){
   $('.js--mobilenav-icon').click(function(){
     let nav = $('.js--main-nav');
      let icon = $('.js--mobilenav-icon i');

     nav.slideToggle(200);
     if(icon.hasClass('icon ion-md-menu')){
       icon.addClass('icon ion-md-close');
       icon.removeClass('icon ion-md-menu');
     }else{
       icon.addClass('icon ion-md-menu');
       icon.removeClass('icon ion-md-close');
     }
   });
 }

function starter(){
    stickyNav();
    scrollBtn();
    scrollNav();
    animations();
    mobileNav();
}

$(starter());
