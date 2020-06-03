$(document).ready(function(){
    $('.menu-toggler').on('click', function(){
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });
});

$(document).ready(function(){
  $('.menu-mini').on('click', function(){
      $(this).toggleClass('open');
      $('.mini-nav').toggleClass('open');
  });
});

buttonUp = document.getElementById("up");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


