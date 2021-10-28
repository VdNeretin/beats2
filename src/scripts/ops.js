(function(){
const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectiomPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("передано неверное значение в countSectiomPosition");
    return 0;
  }

  return position;
};

const resetActiveClassItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = sectionEq => {
  if (inScroll) return;

  const trasitionOver = 1000;
  const mausInertialOver = 300;
  inScroll = true;
  const position = countSectiomPosition(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });


  resetActiveClassItem(sections, sectionEq, "active");

  setTimeout(() => {
    inScroll = false;

    resetActiveClassItem(menuItems, sectionEq, "fixed-menu__item--active")
  }, trasitionOver + mausInertialOver);

};

const viewportScroller = () => {
  const activeSections = sections.filter(".active");
  const nextSection = activeSections.next();
  const prevSection = activeSections.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index())
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index())
      }
    }
  }

};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38: //prev
      scroller.prev();
      break;

    case 40: //next
      scroller.next();
      break;
  }
})

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
})

if (isMobile) {

  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

  $("body").swipe({
    swipe: function (
      event,
      direction,
    ) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    }
  });
}
})()