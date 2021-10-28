(function(){
const slider = $('.products').bxSlider({
  pager:  false, 
  controls: false 
});

$(".arrow-left").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
})
$(".arrow-right").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
})
})()