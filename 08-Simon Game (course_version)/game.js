var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence(){
  // Clearing user's sequence
  userClickedPattern = [];
  // Updating the game's level
  level++;
  // Updating the level displayed in the page's header
  $("#level-title").text("Level " + level);

  // Generating a random number from 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Selecting a color from the array based on the random number
  var randomChosenColor = buttonColors[randomNumber];

  // Adding the chosen color to the sequence of colors displayed by the game
  gamePattern.push(randomChosenColor);

  // Animating the selected button
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  // Playing button's sound
  playSound(randomChosenColor);
}

// Adding a click event listener for all buttons with class ".btn"
$(".btn").on("click", btnClickEventHandler);

// Action when any ".btn" button is clicked
function btnClickEventHandler(event){
  // Identifying which the color of the clicked button
  var userChosenColor = this.id;
  // Adding that color to the user's patern array
  userClickedPattern.push(userChosenColor);
  // Playing button's sound
  playSound(userChosenColor);
  // Animating the pressed button
  animatePress(userChosenColor);
  //Checking if user's choice is correct
  checkAnswer(userClickedPattern.length - 1);
}

// Plays the sound related to the button's color
function playSound(name){
  var btnAudio = new Audio("sounds/" + name + ".mp3");
  btnAudio.play();
}

// Animates the button when pressed
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100, currentColor);

}

// Adding an event listener to the keyboard keys being pressed
$(document).on("keydown", keydownEventHandler);

// Event called by the keydown event listener
function keydownEventHandler(event){
  if (level === 0) {
    nextSequence();
  }
}

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length-1){

        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else {
    // Playing sound for wrong choice
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    // Changing background temporarily
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Changing the header to "Game Over"
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
