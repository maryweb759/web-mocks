/////////    start fullscreen menu ////////

var openbtn = document.getElementById("content"); 
 var closebtn = document.getElementById("header"); 
     function openNavbar() { 
         openbtn.style.transform = "scale(1)"; 
         closebtn.style.transform = "scale(0)"; 
     } 
     function closeNavbar() { 
        closebtn.style.transform = "scale(1)";
         openbtn.style.transform = "scale(0)"; 
     } 



     ////        start   accordion            ////// 
     var acc = document.getElementsByClassName("accordion"); 
     var i = 0; 
     for (i = 0; i < acc.length ; i++) { 
         acc[i].addEventListener("click", function() { 
          this.classList.toggle("active"); 
          var panel = this.nextElementSibling; 
           if (panel.style.display === "block") { 
            panel.style.display = "none"; 
           } else { 
            panel.style.display = "block"
           }
         });
     }  

     /*****************    start slideshow    ************** */ 
     var i = 0 ; 
var slideImage = ["img/1.jpg", "img/2.jpg", "img/3.jpeg", "img/4.jpeg", "img/5.jpg"]; 
var slideShow = function() { 
    document.slideshow.src = slideImage[i]; 
    if (i < slideImage.length -1) { 
        i++
    } else { 
        i = 0;
    } 
    setTimeout("slideShow()", 2000);
} 
slideShow();
