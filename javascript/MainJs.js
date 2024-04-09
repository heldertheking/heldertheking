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

    corBTNpos()
});

function corBTNpos() {
    var wh = $(window).height();
    var ww = $(window).width();

    var ah = $("#account").height();
    var aw = $("#account").width();

    var sh = $("#settings").height();
    var sw = $("#settings").width();

    $("#account").css({top: wh-ah, left: ww-aw});
    $("#settings").css({top: wh-sh, left: 0});
}

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
    closeSettings();
    closePopup();
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function openSettingsPopup() {
    var SettingsPopup = document.getElementById("SettingsPopup");
    var overlay = document.getElementById("overlay");

    SettingsPopup.style.opacity = 0;
    SettingsPopup.style.display = "block";
    $(SettingsPopup).stop().fadeTo(500, 1);
    overlay.style.opacity = 0;
    overlay.style.display = "block";
    $(overlay).stop().fadeTo(500, 1);
}

function closeSettings() {
    var SettingsPopup = document.getElementById("SettingsPopup");
    var overlay = document.getElementById("overlay");

    $(SettingsPopup).stop().add(overlay).fadeTo(500, 0, function() {
        SettingsPopup.style.display = "none";
        overlay.style.display = "none";
    });
}

function changeSettings() {
    var body = document.body;

    // Remove the current palette class
    switch (currentPalette) {
        case 0:
            body.classList.remove("light-mode");
            popup.classList.remove("light-mode");
            SettingsPopup.classList.remove("light-mode");
            break;
        case 1:
            body.classList.remove("dark-mode");
            popup.classList.remove("dark-mode");
            SettingsPopup.classList.remove("dark-mode");
            break;
        }

    // Use requestAnimationFrame to wait for the next frame
    requestAnimationFrame(function () {
        // Toggle to the next palette
        currentPalette = (currentPalette + 1) % 2;

        // Add the new palette class
        switch (currentPalette) {
            case 0:
                body.classList.add("light-mode");
                popup.classList.add("light-mode");
                SettingsPopup.classList.add("light-mode");
                break;
            case 1:
                body.classList.add("dark-mode");
                popup.classList.add("dark-mode");
                SettingsPopup.classList.add("dark-mode");
                break;
        }
    });
}

document.addEventListener("mousemove", function (e) {
    // Calculate the percentage position based on mouse coordinates
    var mouseX = e.clientX / window.innerWidth * 100;
    var mouseY = e.clientY / window.innerHeight * 100;

    // Set the background-position property
    document.body.style.backgroundPosition = mouseX + "% " + mouseY + "%";
});

// Check if user is logged in

function checkLoginStatus() {
    fetch('api/sessionstatus.php')
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          console.log("User is logged in.");
        } else {
          console.log("User is not logged in.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

function reflogin() {
    window.location.href = `login.html`
}