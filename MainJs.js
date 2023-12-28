// Variables --
var currentPalette = 0; // 0: light, 1: dark


// Functions --
window.onload = load();
function load() {
    currentPalette = 0;
}

$(document).ready(function(){

    $(".img_c1").mouseenter(function(){
        $(this).fadeTo(250, 1);
    });

    $(".img_c1").mouseleave(function(){
        $(this).fadeTo(250, 0.4);
    });

    $(".img_c1").click(function(){
        openPopup($(this).attr("src"));
    });
});

function openPopup(imageSrc) {
    var popup = document.getElementById("popup");
    var overlay = document.getElementById("overlay");

    popup.style.opacity = 0;
    popup.style.display = "block";
    $(popup).stop().fadeTo(500, 1);
    overlay.style.opacity = 0;
    overlay.style.display = "block";
    $(overlay).stop().fadeTo(500, 1);

  var popupImages = document.getElementById("popupImages");
  var downloadButton = document.getElementById("downloadButton");

  // Clear previous images
  popupImages.innerHTML = "";

  // Add the clicked image to the popup
  var img = document.createElement("img");
  img.src = imageSrc;
  popupImages.appendChild(img);

  // Set the download button link
  downloadButton.href = imageSrc;

  popup.style.display = "block";
  overlay.style.display = "block";
}
function closePopups() {
    closeModePopup();
    closePopup();
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function openModePopup() {
    var modePopup = document.getElementById("modePopup");
    var overlay = document.getElementById("overlay");

    modePopup.style.opacity = 0;
    modePopup.style.display = "block";
    $(modePopup).stop().fadeTo(500, 1);
    overlay.style.opacity = 0;
    overlay.style.display = "block";
    $(overlay).stop().fadeTo(500, 1);
}

function closeModePopup() {
    var modePopup = document.getElementById("modePopup");
    var overlay = document.getElementById("overlay");

    $(modePopup).stop().add(overlay).fadeTo(500, 0, function() {
        modePopup.style.display = "none";
        overlay.style.display = "none";
    });
}

function changeMode() {
    var body = document.body;

    // Remove the current palette class
    switch (currentPalette) {
        case 0:
            body.classList.remove("light-mode");
            popup.classList.remove("light-mode");
            modePopup.classList.remove("light-mode");
            break;
        case 1:
            body.classList.remove("dark-mode");
            popup.classList.remove("dark-mode");
            modePopup.classList.remove("dark-mode");
            break;
    }

    // Toggle to the next palette
    currentPalette = (currentPalette + 1) % 2;

    // Add the new palette class
    switch (currentPalette) {
        case 0:
            body.classList.add("light-mode");
            popup.classList.add("light-mode");
            modePopup.classList.add("light-mode");
            break;
        case 1:
            body.classList.add("dark-mode");
            popup.classList.add("dark-mode");
            modePopup.classList.add("dark-mode");
            break;
    }
}

document.addEventListener("mousemove", function (e) {
    // Calculate the percentage position based on mouse coordinates
    var mouseX = e.clientX / window.innerWidth * 100;
    var mouseY = e.clientY / window.innerHeight * 100;

    // Set the background-position property
    document.body.style.backgroundPosition = mouseX + "% " + mouseY + "%";
});