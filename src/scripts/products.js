(function(){
const list = $('.menu-acco');
list.on('click', '.menu-acco__line', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('menu-acco__content')) return
  $(this).siblings('li').removeClass('menu-acco__line_active')
  $(this).toggleClass('menu-acco__line_active')
});
})()