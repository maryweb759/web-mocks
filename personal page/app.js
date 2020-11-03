
          /*******    bargure menu      ****** */ 
var navbar_list = document.getElementById("list");
var  toggle_menu = document.getElementById("toggle-menu");
toggle_menu.addEventListener("click", function() {
  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  } 
});  

function scrollTop() {
let header = document.getElementById("top-content"); 
let ops = window.pageYOffset; 
if(ops > 290) { 
  header.style.padding = "0.3rem 0.6rem";
} else { 
  header.style.padding = "0.6rem ";
}
} 
window.addEventListener("scroll", scrollTop);




 