var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var txtWinner = "";

if(randomNumber1 > randomNumber2) {
  txtWinner = "Player 1 Wins!";
}
else if(randomNumber1 < randomNumber2) {
  txtWinner = "Player 2 Wins!";
}
else {
  txtWinner = "Drawn";
}

document.querySelector(".container h1").innerText = txtWinner;
document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");



//
// var randomNumber1 = Math.floor(Math.random() * 6) + 1;
// var randomNumber2 = Math.floor(Math.random() * 6) + 1;
//
// setDiceImg(1, randomNumber1);
// setDiceImg(2, randomNumber2);
//
// function setDiceImg(imgId, diceValue) {
//   document.querySelector(".img" + imgId).setAttribute("src", "images/dice" + diceValue + ".png");
// }
