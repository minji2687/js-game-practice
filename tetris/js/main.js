const playground = document.querySelector(".playground > ul");

const GAME_COLS = 10;
const GAME_ROW = 20;

//variable

const BLOKCS = {
  tree: [
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 0],
    ],
  ],
};

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

let movingItem = {
  type: "tree",
  direction: 0,
  top: 0,
  left: 0,
};

init();

function init() {
  tempMovingItem = { ...movingItem };
  for (let i = 0; i < GAME_ROW; i++) {
    prependNewline();
  }
  renderBlocks();
}

function prependNewline() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLS; j++) {
    const metrix = document.createElement("li");
    ul.prepend(metrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function renderBlocks(moveType = "") {
  const { type, direction, top, left } = tempMovingItem;

  const movingBlock = document.querySelectorAll(".moving");
  movingBlock.forEach((block) => block.classList.remove(type, "moving"));
  BLOKCS[type][direction].some((block) => {
    const x = block[1] + left;
    const y = block[0] + top;

    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;

    const isAvalible = checkEmpty(target);

    if (isAvalible) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      setTimeout(() => {
        renderBlocks();
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
    }
  });

  movingItem = { ...tempMovingItem };
}

function seizeBlock() {
  const movingBlock = document.querySelectorAll(".moving");
  movingBlock.forEach((block) => {
    block.classList.remove("moving");
    block.classList.add("seized");
  });

  generateNewBlock();
}

function generateNewBlock() {
  //     type: "tree",
  //   direction: 0,
  //   top: 0,
  //   left: 0,
  movingItem.type = "tree";
  movingItem.direction = 3;
  movingItem.top = 0;
  movingItem.left = 0;

  renderBlocks();
}

function checkEmpty(target) {
  //   console.log(target.classList);
  if (!target || target.classList.contains("seized")) {
    return false;
  }
  return true;
}

//event handing

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
      break;
    case 40:
      moveBlock("top", 1);
      break;
    case 38:
      changeDirection("direction", 1);
      break;
    default:
      break;
  }
});

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

function changeDirection(moveType, amount) {
  tempMovingItem[moveType] += amount;
  if (tempMovingItem[moveType] === 3) tempMovingItem[moveType] = 0;
  renderBlocks();
}
