var hourDiv = document.getElementById("hour");
var minDiv = document.getElementById("min");
var secDiv = document.getElementById("sec"); 
setInterval(updateClock, 1000); 
function updateClock() { 
    let date = new Date(); 
    let secs = date.getSeconds() / 60; 
    let mins = (date.getMinutes() + secs) / 60 ; 
    let hours = (date.getHours() + mins) / 12 ; 
    
    secDiv.style.transform = "rotate(" + (secs * 360) +"deg)";
    minDiv.style.transform = "rotate(" + (mins * 360) +"deg)";
    hourDiv.style.transform = "rotate(" + (hours * 360) +"deg)";
    
}  

checkClock() 
updateClock() ;