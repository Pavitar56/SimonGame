var map = ["b0", "b1", "b2", "b3"];
var pattern = [];
var userPattern = [];
var lvl = 1;
var idx = -1;

$(document).on("keydown", function (event) {
  if (lvl === 1) {
    $(".heading").text("Level 1");
    gameStart();
  }
});

function makeSound(box) {
  switch (box) {
    case "b0":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    case "b1":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    case "b2":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    case "b3":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;
    default:
      console.log("No corrosponding sound present for" + box);
  }
}

function blink(box) {
  makeSound(box);
  $("#" + box).css({ opacity: 0 });
  $("#" + box).animate({ opacity: 1 }, 200);
}

$(".box").on("click", function (event) {
  var clickedBox = event.target.id;
  makeSound(clickedBox);
  $("#" + clickedBox).addClass("pressed");
  setTimeout(function () {
    $("#" + clickedBox).removeClass("pressed");
  }, 100);

  userPattern.push(clickedBox);
  idx++;

  if (userPattern[idx] != pattern[idx]) {
    gameOver();
  } else if (idx === pattern.length - 1) {
    console.log(pattern.length - 1);
    idx = -1;
    userPattern = [];
    setTimeout(patternGenerator, 1000);
  }
});

function patternGenerator() {
  console.log($(".heading"));
  $(".heading").text("Level " + lvl);
  var n = Math.floor(Math.random() * 4);

  pattern.push(map[n]);

  for (var i = 0; i < pattern.length; i++) {
    setTimeout(blink, i * 300, pattern[i]);
  }
  lvl++;
}

function gameStart() {
  patternGenerator();
}

function gameOver() {
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  $("body").addClass("backgroundBlinker");
  setTimeout(function () {
    $("body").toggleClass("backgroundBlinker");
  }, 200);
  pattern = [];
  userPattern = [];
  lvl = 1;
  idx = -1;
  $(".heading").text("Game Over.Press Any key to start");
}
