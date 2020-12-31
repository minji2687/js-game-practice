const container = document.querySelector(".image-container");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tailCount = 16;
const dragged = {
  el: null,
  class: null,
  index: null,
};
let isPlaying = false;
let timeInterval = null;
let time = 0;

function setGame() {
  isPlaying = true;
  time = 0;
  container.innerHTML = "";
  clearInterval(timeInterval);
  gameText.style.display = "none";
  let tiles = [];
  tiles = createImagetiles();
  tiles.forEach((tile) => {
    container.appendChild(tile);
  });

  setTimeout(() => {
    suffle(tiles).forEach((tile) => {
      container.appendChild(tile);
    });

    timeInterval = setInterval(() => {
      playTime.innerText = time;
      time++;
    }, 1000);
  }, 3000);
}

function createImagetiles() {
  let temptile = [];
  Array(16)
    .fill()
    .map((_, i) => {
      const li = document.createElement("li");
      li.setAttribute("data-index", i);
      li.classList.add(`list${i}`);
      li.setAttribute("draggable", "true");
      temptile.push(li);
    });
  return temptile;
}

function suffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }
  return array;
}

function checkStatus() {
  const currentList = [...container.children];
  const unmatchedList = currentList.filter((li, index) => {
    return Number(li.getAttribute("data-index")) == index;
  });
  if (unmatchedList.length == currentList.length) {
    console.log("game finish");
    gameText.style.display = "block";
    isPlaying = false;
    clearInterval(timeInterval);
  }
}

//event
container.addEventListener("dragstart", (e) => {
  if (!isPlaying) return;

  const obj = e.target;
  dragged.el = obj;
  dragged.class = obj.className;
  dragged.index = [...obj.parentNode.children].indexOf(obj);
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
});

container.addEventListener("drop", (e) => {
  if (!isPlaying) return;

  const obj = e.target;

  let originPlace;
  let isLast = false;

  if (obj.className !== dragged.className) {
    if (dragged.el.nextSibling) {
      originPlace = dragged.el.nextSibling;
    } else {
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }
    const droppedIndex = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedIndex
      ? obj.before(dragged.el)
      : obj.after(dragged.el);
    isLast ? originPlace.after(obj) : originPlace.before(obj);
  }
  checkStatus();
});

startButton.addEventListener("click", () => {
  setGame();
});
