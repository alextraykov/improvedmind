// //1. Make some vars for our documentHeight and windowHeight
// // 2.Make some vars to work out the diff between the two (as we're comparing this to our scrollTop positioin which goes from the top of the window) documentHeight - windowHeight
// // 3. Using the diff and the scrollPsition, divide them into eachother to make a percentage
// // 4. Multiply by 100 to get back % value

// window.addEventListener('scroll', function (e) {
//     const target = document.querySelector('.background-circle');
//     var scrolled = window.pageYOffset;
//     var rate = scrolled * -4;
//     target.style.transform = 'translate3d(px' + rate + 'px, 0 px)';
// });

var parallaxElement1 = $('#my-container'),
  parallaxQuantity = parallaxElement1.length;

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement = parallaxElement1.eq(i);
      var scrolled = $(window).scrollTop();

      currentElement.css({
        transform: 'translate3d(0,' + scrolled * 0.3 + 'px, 0)'
      });
    }
  });
});

var parallaxElement2 = $('.background-circle'),
  parallaxQuantity = parallaxElement2.length;

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement = parallaxElement2.eq(i);
      var scrolled = $(window).scrollTop();

      currentElement.css({
        transform: 'translate3d(0,' + scrolled * 0.3 + 'px, 0)'
      });
    }
  });
});

var parallaxElement3 = $('.background-circle2'),
  parallaxQuantity = parallaxElement3.length;

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement = parallaxElement3.eq(i);
      var scrolled = $(window).scrollTop();

      currentElement.css({
        transform: 'translate3d(0,' + scrolled * 0.35 + 'px, 0)'
      });
    }
  });
});

var parallaxElement4 = $('.background-circle3'),
  parallaxQuantity = parallaxElement4.length;

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement = parallaxElement4.eq(i);
      var scrolled = $(window).scrollTop();

      currentElement.css({
        transform: 'translate3d(0,' + scrolled * 0.1 + 'px, 0)'
      });
    }
  });
});
