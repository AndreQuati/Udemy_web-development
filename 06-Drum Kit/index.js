
// DECLARING VARIABLES -------------------------------

var lstButtons = document.querySelectorAll(".drum");

// ADDING EVENT LISTENERS ----------------------------

// Adding a event listener to the "document" object, which means this is add to the whole page. Whenver a key is pressed in
// the website, this event will be listened
document.addEventListener("keydown", keyDownEventHandler);

// Adding a event listener for each button with a drum part for when they are clicked
for (var btn of lstButtons) {
  btn.addEventListener("click", drumClickEventHandler);
}

// HANDLING TRIGGERED EVENTS -------------------------

function keyDownEventHandler(e) {
  drumButtonAction(e.key);
}

function drumClickEventHandler() {
  // identifying the text inside the button HTML element which the user clicked.
  // "this" refers to the elemnt which trigger the event, in this case there were a few buttons which could do it, this
  // will refer to which one of those. If my event is assingned to "document", the "this" will refer to docuemnt.
  var btnInnerHTML = this.innerHTML;

  //Calling method responsible for the button action (sound and animation)
  drumButtonAction(btnInnerHTML);
}

// FUNCTIONS ------------------------------------------

// Calls the button action and animation
function drumButtonAction (buttonKey) {
  buttonAnimation(buttonKey);
  playDrumPart(buttonKey);
}

// Executes animation on activated button
function buttonAnimation(buttonKey) {

  var activeButton = null;

  // Checking if the receive key is a character from a-z
  var isKeyValid = new RegExp(/[a-z]/).test(buttonKey);

  if(buttonKey !== null && isKeyValid === true) {
    //Including "." so it looks for the CSS class
    activeButton = document.querySelector("." + buttonKey);
  }

  if (activeButton != null){
    // Adds the CSS "pressed" style to the button activated
    activeButton.classList.add("pressed");
    // Removes the CSS style after a 100 miliseconds
    setTimeout(function (){
      activeButton.classList.remove("pressed");
    }, 100);
  }
}

// Plays the drum part related the key
function playDrumPart(drumKey) {

  var audio = new Audio();

  switch (drumKey) {

    case "w":
      audio.src = "sounds/crash.mp3";
      break;

    case "a":
      audio.src = "sounds/kick-bass.mp3";
      break;

    case "s":
      audio.src = "sounds/snare.mp3";
      break;

    case "d":
      audio.src = "sounds/tom-1.mp3";
      break;

    case "j":
      audio.src = "sounds/tom-2.mp3";
      break;

    case "k":
      audio.src = "sounds/tom-3.mp3";
      break;

    case "l":
      audio.src = "sounds/tom-4.mp3";
      break;

      default: console.log(drumKey);
  }

  audio.play();
}
