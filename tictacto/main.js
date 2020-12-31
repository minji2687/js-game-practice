const body = document.body;
const table = document.createElement("table");
const result = document.createElement("p");
body.appendChild(result);
const squares = [];
const lines = [];
let turn = "X";
let fildUp = false;

const asyncFunction = function (event) {
  const whatline = lines.indexOf(event.target.parentNode);
  const whatsquares = squares[whatline].indexOf(event.target);
  //   console.log(whatline, "몇줄");
  //   console.log(whatsquares, "몇칸");

  if (squares[whatline][whatsquares].textContent === "") {
    // console.log("빈칸입니다");
    squares[whatline][whatsquares].textContent = turn;

    calculateWinner(whatline, whatsquares);

    if (fildUp) {
      result.textContent = `${turn} 님이 승리!`;
      turn = "X";
      squares.forEach((line) => {
        line.forEach((square) => {
          square.textContent = "";
        });
      });
    } else {
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  } else {
    console.log("칸이 채워져 있습니다");
  }
};

//UI 생성
for (let i = 0; i <= 2; i += 1) {
  const tr = document.createElement("tr");
  lines.push(tr); //행 UI 생성
  squares.push([]); // 행 데이터 생성
  for (let j = 0; j <= 2; j += 1) {
    const td = document.createElement("td");
    squares[i].push(td);

    td.addEventListener("click", asyncFunction);
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

console.log(lines, squares);
body.appendChild(table);

function calculateWinner(whatline, whatsquares) {
  //가로줄 검사
  if (
    squares[whatline][0].textContent === turn &&
    squares[whatline][1].textContent === turn &&
    squares[whatline][2].textContent === turn
  ) {
    fildUp = true;
  }
  //세로줄 검사
  if (
    squares[0][whatsquares].textContent === turn &&
    squares[1][whatsquares].textContent === turn &&
    squares[2][whatsquares].textContent === turn
  ) {
    fildUp = true;
  }
  //대각선 검사
  if (whatline - whatsquares === 0) {
    if (
      squares[0][0].textContent === turn &&
      squares[1][1].textContent === turn &&
      squares[2][2].textContent === turn
    ) {
      fildUp = true;
    }
  }
  if (Math.abs(whatline - whatsquares) === 2) {
    if (
      squares[0][2].textContent === turn &&
      squares[1][1].textContent === turn &&
      squares[2][0].textContent === turn
    ) {
      fildUp = true;
    }
  }
}
