interface NodeListOf<TNode> extends Array<TNode> {}

var section = document.querySelectorAll('section, footer');

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
            scrollToAni(prev);
            setTimeout(function () {
              slideAniStatus = 0;
            }, 1400);
          }
        } else {
          if (slideAniStatus === 0) {
            slideAniStatus = 1;
            var prev = pageYOffset + section[3].getBoundingClientRect().top;
            scrollToAni(prev);
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
          scrollToAni(next);
          setTimeout(function () {
            slideAniStatus = 0;
          }, 1400);
        }
      } else if (section.indexOf(this) === 3) {
        if (slideAniStatus === 0) {
          slideAniStatus = 1;
          var next2 = pageYOffset + getComputedStyle(section[4]).height;
          scrollToAni(next2);
          setTimeout(function () {
            slideAniStatus = 0;
          }, 1400);
        }
      }
    }
    e.preventDefault();
  });
}