// https://www.w3schools.com/howto/howto_js_sticky_header.asp
$(document).ready(function(){
  window.onscroll = function() {
    fixHeader()
  };

  var header = document.getElementById("fixedHeader");

  var sticky = header.offsetTop;

  function fixHeader() {
    if (window.pageYOffset >= sticky) {
      header.classList.add("fixed-header");
      header.style.zIndex = 1
    } else {
      header.classList.remove("fixed-header");
    }
  }
})


