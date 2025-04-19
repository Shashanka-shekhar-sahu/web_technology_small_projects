const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

document.addEventListener("keydown", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  document.getElementById("level").textContent = level;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  const button = document.getElementById(randomChosenColor);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 200);
  playSound(randomChosenColor);
}

function playSound(name) {
  const audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${buttonColors.indexOf(name)+1}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
