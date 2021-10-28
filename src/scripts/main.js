(function(){
function myFunction() {
  document.getElementById("win1").classList.toggle("show");
}
window.onclick = function (event) {
  if (!event.target.matches('.hamburger')) {

    var dropdowns = document.getElementsByClassName("fullscreen-menu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
})()

