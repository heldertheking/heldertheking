$(document).ready(function() {
    var windowWidth = $(window).width();
    $('#ansPop').css('left', windowWidth); 
});

function anspop() {
    var ansPopWidth = $('#ansPop').width();
    var windowWidth = $(window).width();
    var ansPopPos = windowWidth-(ansPopWidth+35)
    $('#ansPop').animate({left: ansPopPos}, 500)
}

var timeoutId;

function notify() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(anspop, 200); // Adjust the time (200 milliseconds in this case) as needed
}

window.addEventListener("resize", notify);

function wrongAns() {
    var audio = document.getElementById("wrongSound");
    audio.play();
    $('#ansPop').animate({'border-color': "red"}, 250);
    $('#ansPop').animate({'border-color': "white"}, 250);
}

function correctAns() {
    var audio = document.getElementById("correctSound")
    audio.play();
    $('#ansPop').animate({'border-color': "green"}, 250);
    $('#ansPop').animate({'border-color': "white"}, 250);
}

// Get the image element
const image = document.getElementById('riddleImage');

// Add click event listener
image.addEventListener('click', function() {
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = this.src;
  link.download = 'riddle_image.png'; // Set the filename for the downloaded image
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});