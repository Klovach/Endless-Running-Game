//ROUGH DRAFT - ITERATION 1
var character = document.getElementById("character");
var obstacleElement = document.getElementById("obstacle");
const collisionBox = document.getElementById('collision-box');

function jump() {
    if (character.classList.contains("animate-jump")) {
        return;
    }
    character.classList.add("animate-jump");
    character.addEventListener("animationend", removeJump); 
}

function removeJump() {
    character.classList.remove("animate-jump");
}


//SCORE
var score = 0;
var highScore = 0;

var scoreElement = document.getElementById("score");
var scoreInterval = setInterval(updateScore, 100);

function updateScore() {
    if (character.classList.contains("animate-jump")) {
        score++;
        scoreElement.innerHTML = "SCORE: " + score;
    }
    if (stopButton.classList.contains("stop")) {
        scoreElement.innerHTML = "SCORE: " + score;
        score = 0; 
    }
}

// START & STOP BUTTONS
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

function startGame() {
    if (startButton.classList.contains("start")) {
        return;
    }
    startButton.classList.add("start");
    setTimeout(removeStart, 300);
    setTimeout(startObstacleAnimation, 300); 
    setTimeout(startCollisionCheck, 300); 

    document.addEventListener("click", jump);
    console.log("Start game");
}

function removeStart() {
    startButton.classList.remove("start");
}

function removeStop() {
    stopButton.classList.remove("stop");
}

function startObstacleAnimation() {
    obstacleElement.classList.add("animate-obstacle");
}

function removeObstacle() {
    obstacleElement.classList.remove("obstacle");
}

function stopGame() {
    if (stopButton.classList.contains("stop")) {
        return;
    }
    stopButton.classList.add("stop");
    setTimeout(removeStop, 300);
    obstacleElement.classList.remove("obstacle");
    obstacleElement.classList.remove("animate-obstacle");

    document.removeEventListener("click", jump);
    console.log("Stop game");
}


function isAlive() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacleElement).getPropertyValue("left"));
    if (obstacleLeft < 20 && obstacleLeft > -20 && characterTop >= 130) {
        showLosePopup();
        setTimeout(hideLosePopup, 2000);
        stopGame();
    }
}

function startCollisionCheck() {
    setInterval(isAlive, 10);
}


function showLosePopup() {
    var losePopup = document.getElementById("lose-popup");
    losePopup.style.display = "block";
    updateHighScore(score); // Update high score
    losePopup.classList.remove("hidden");
  }

  function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        var highScoreElement = document.getElementById("high-score");
        highScoreElement.textContent = highScore; // Update high score value
    }
}
  function hideLosePopup() {
    var losePopup = document.getElementById("lose-popup");
    losePopup.classList.add("hidden");
    setTimeout(function() {
      losePopup.style.display = "none";
    }, 500);  // Reset score
  }
