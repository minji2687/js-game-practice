"use strict";
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 80;
const CARROUT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpRefresh = document.querySelector(".pop-up__refresh");
const popUpText = document.querySelector(".pop-up__message");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(alertSound);
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  ShowPopUpWithText("REPLAY?");
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopSound(bgSound);
  ShowPopUpWithText(win ? "YOU WON!" : "YOU LOST");
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-stop");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameScore.style.visibility = "visible";
  gameTimer.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROUT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
  hideGameButton();
  ShowPopUpWithText("REPLAY?");
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
}

function ShowPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

function initGame() {
  field.innerHTML = "";
  score = 0;
  gameScore.innerText = CARROUT_COUNT;
  addItem("carrot", CARROUT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    //당근
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROUT_COUNT) {
      stopGameTimer();
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    stopGameTimer();
    finishGame(false);
    //bug
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROUT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);

    item.style.position = "absolute";

    const x = RandomNumber(x1, x2);
    const y = RandomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    field.appendChild(item);
  }
}

function RandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

initGame();
