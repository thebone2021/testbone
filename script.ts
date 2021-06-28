var sectio:NodeListOf<HTMLElement> = document.querySelectorAll('section, footer');
const section = Array.apply(null, sectio)
const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;

addEventListener('resize', function () {
  for (var _i = 0, section_3 = section; _i < section_3.length - 1; _i++) {
    var item= section_3[_i];
    item.style.height = innerHeight + "px";
    //현재의 브라우저 높이값(innerHeight) 가져와서 컨텐츠영역(section)의 높이에 대입
  }
});
//브라우저의 리사이즈 발생시 화면이 뒤틀리는 문제점해결
var e = document.createEvent('Event');
e.initEvent('resize', true, true);
dispatchEvent(e);
//맨처음 강제로 리사이즈를 해줘서 처음한번실행
var menuLi = document.querySelectorAll('#menu li');

// function scrollToAni(to) {
//   var k = -90;
//   var startScroll = pageYOffset;

//   function scrollToAnimate() {
//     if (k > 90) {
//       k = 90;
//     }
//     console.log(pageYOffset)
//     var easeUp = ((Math.sin(k * Math.PI / 180)) + 1) / 2;
//     var easeDown = ((Math.sin((k + 180) * Math.PI / 180)) + 1) / 2;
//     // const easeUp = (k+90)/180;
//     // const easeDown = -(k-90)/180;
//     scrollTo(0, startScroll * easeDown + to * easeUp); // scrollTo(x,y)
//     k += 180 / 60;
//     if (k > 90) {
//       return clearInterval(id);
//     }
//   }
//   var id = setInterval(scrollToAnimate, 1000 / 60);
// }

var slideAniStatus = 0;
for (var _i = 0, section_1 = section; _i < section_1.length; _i++) {
  var item = section_1[_i];
  item.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
      if (this.previousElementSibling){
        if (pageYOffset <= (pageYOffset + section[3].getBoundingClientRect().top)) {
          if (slideAniStatus === 0) {
            slideAniStatus = 1;
            var prev = pageYOffset + this.previousElementSibling.getBoundingClientRect().top;
            anime({
              targets: scrollElement,
              scrollTop: prev,
              duration: 500,
              easing: 'easeInOutQuad'
            });
            setTimeout(function () {
              slideAniStatus = 0;
            }, 1400);
          }
        } else {
          if (slideAniStatus === 0) {
            slideAniStatus = 1;
            var prev = pageYOffset + section[3].getBoundingClientRect().top;
            anime({
              targets: scrollElement,
              scrollTop: prev,
              duration: 500,
              easing: 'easeInOutQuad'
            });
            setTimeout(function () {
              slideAniStatus = 0;
            }, 1400);
          }
        } 
      }
    }
    if (e.deltaY > 0) {
      if (section.indexOf(this) < 3) {
        if (slideAniStatus === 0) {
          slideAniStatus = 1;
          var next = pageYOffset + this.nextElementSibling.getBoundingClientRect().top;
          anime({
            targets: scrollElement,
            scrollTop: next,
            duration: 500,
            easing: 'easeInOutQuad'
          });
          setTimeout(function () {
            slideAniStatus = 0;
          }, 1400);
        }
      } else if (section.indexOf(this) === 3) {
        if (slideAniStatus === 0) {
          slideAniStatus = 1;
          var next2 = pageYOffset + parseInt(getComputedStyle(section[4]).height);
          anime({
            targets: scrollElement,
            scrollTop: next2,
            duration: 500,
            easing: 'easeInOutQuad'
          });
          setTimeout(function () {
            slideAniStatus = 0;
          }, 1400);
        }
      }
    }
    e.preventDefault();
  });
}


// header navbar

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
})

//main slide
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false; // Auto scroll
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // Remove current class
  current.classList.remove('current');
  // Check for next slide
  if (current.nextElementSibling) {
    // Add current to next sibling
    current.nextElementSibling.classList.add('current');
  } else {
    // Add current to start
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // Remove current class
  current.classList.remove('current');
  // Check for prev slide
  if (current.previousElementSibling) {
    // Add current to prev sibling
    current.previousElementSibling.classList.add('current');
  } else {
    // Add current to last
    slides[slides.length - 1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

// Button events
next.addEventListener('click', e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if (auto) {
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}
//# sourceURL=pen.js
