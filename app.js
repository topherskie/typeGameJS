"use strict";

//let seconds = prompt("Enter How many seconds you want to play: ", Number());

// Wait for all the SCRIPTS to load
let isPlaying = true;
const txtScore = document.getElementById("currentScore");
const txtInput = document.getElementById("txtInput");
const txtStart = document.getElementById("txtStart");
const curHighScore = document.getElementById("curHighScore");
const btnReset = document.getElementById("btnReset");
let output = document.getElementById("output");

let currentScore = 0;
let currentHighScore = 0;

// Update to API
let words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
];

function showWords(words) {
  // GENERATE RANDOM WORDS ARRAY
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  output.textContent = words[randIndex];
}

// Game timer
function gameTimer() {
  let timer = 60;
  const myTimer = setInterval(function () {
    console.log(timer);

    if (timer > 0) {
      document.querySelector("#txtTimer").textContent = timer--;
      document.querySelector("#txtTimer").style.color = "green";
    } else {
      isPlaying = false;
      txtInput.disabled = true;
      clearInterval(myTimer);
      console.log("Timer Done");
      document.querySelector("#txtTimer").textContent = 0;
      txtErr();
    }
  }, 1000);
  // After click reset it the sStorage will FIRE
  sStorage(currentHighScore);
}

function sStorage(a) {
  // retrieve the curentScore
  let getScores = sessionStorage.getItem("storageCurrentHighScore");
  // Check if PREVIOUS SCORE IS LESS THAN THE NEW SCORE
  if (getScores < a) {
    sessionStorage.setItem("storageCurrentHighScore", a);
    console.log("New high Score!!!");
    curHighScore.textContent = `High score: ${currentHighScore}`;
  } else if (getScores == a) {
    console.log("Draw!!!");
    curHighScore.textContent = `High score: ${currentHighScore}`;
  } else {
    console.log("Previous score still higher than the present score");
    curHighScore.textContent = `High score: ${getScores}`;
  }
}

// txtError button
document.querySelector(".txtErr").style.display = "none";
function txtErr() {
  setTimeout(function () {
    document.querySelector(".txtErr").style.display = "block";
  }, 500);

  setTimeout(function () {
    document.querySelector(".txtErr").style.display = "none";
  }, 4000);
}

// Invoked the func random
showWords(words);

// Invoked Timer
gameTimer();

// Listening to Input Event
txtInput.addEventListener("input", function () {
  if (isPlaying) {
    if (this.value.trim() === output.textContent) {
      txtInput.value = "";
      currentScore++;
      showWords(words);
      txtScore.textContent = `Score: ${currentScore}`;
    }
  }
  currentHighScore = currentScore;
});

btnReset.addEventListener("click", function () {
  gameTimer();
  currentScore = 0;
  txtScore.textContent = 0;
  txtInput.value = "";
  isPlaying = true;
  txtInput.disabled = false;
  showWords(words);
});

/*
 -> FIX RESET BUTTON ISSUE: IF CLICK PERSISTENT TIMER ERROR!!
 -> FIX DROP DOWN MENU JQUERY NOT WORKING
*/
