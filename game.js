
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern=[];

var started = false;
var level = 0;

function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}
$(".btn").on("click", function (e) {
    var idClicked = e.target.id;
    userPattern.push(idClicked);
   
    playSound(idClicked);
    animatePress(idClicked);
    checkAnswer(userPattern.length-1);
    
});
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});
function checkAnswer(level){
  if (gamePattern[level] === userPattern[level]) {

      console.log("success");

      
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } 
    else {
      $("#level-title").text("Game over!! Press a key to restart.");
      console.log("wrong");
      gameOver();

    }
}
function gameOver() {
  $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
  var audio = new Audio('./sounds/wrong.mp3');
  audio.play();
  level = 0;
  gamePattern = [];
  started = false;
}
