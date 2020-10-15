var buttonColours      = ["red", "blue", "green", "yellow"];// Set of Colors
var gamePattern        = []; // Empty Array for random pattern
var userClickedPattern = []; // Stores user click pattern
var started = false; // Make sure that document has not started
var level = 0;

$(".btn").on("click", function(){ // Detects button clicks 

  var userChosenColour = this.id
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // Call function after user has clicked
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function(){ // Detects Keydown
  if(!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
  }
});

function nextSequence(){ // Returns Random Value
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
 

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){ // Audio

  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
  
}

function animatePress(currentColour){ // Animates buttons

  $("#" + currentColour).addClass("pressed");

    setTimeout(function(){

      $("#" + currentColour).removeClass("pressed");

    }, 100);

}

// Checks if userClickedPattern is equal to gamePattern

  function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();

      }, 1000);
    }

  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
      $("#level-title").text("Game Over, Press Any key to Restart");
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  
  }
  
}

//function that resets the game when called

function startOver(){

  level = 0;
  gamePattern = [];
  started = false;

}









