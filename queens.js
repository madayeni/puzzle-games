const N = 8;
const boardGame = document.getElementById("board-game");
const solveBtn = document.getElementById("solve");
const delayEl = document.getElementById("delay");
const resetBtn = document.getElementById("reset");

const board = new Array(N).fill(0).map(() => new Array(N).fill("."));

const putQueen = (e) => {
  e.target.innerHTML = `<img src='images/queen.png' >`;
  const [r, c] = e.target.id.split("|");
  board[+r][+c] = "Q";
};

const initUI = () => {
  for (let i = 0; i < N * N; i++) {
    const el = document.createElement("div");
    el.id = `${Math.floor(i / N)}|${i % N}`;
    el.classList.add("cell");
    el.style.width = `${450 / N}px`;
    el.style.height = `${450 / N}px`;
    el.addEventListener("click", putQueen);
    boardGame.appendChild(el);
  }
};

const safeToPutAt = (b, row, col) => {
  for (let i = 0; i < row; i++) {
    const c = b[i].indexOf("Q");
    if (b[i][col] === "Q") return false;
    if (Math.abs(col - c) === row - i) return false;
  }
  return true;
};

const solveHelper = (b, row) => {
  if (row === b.length) return true;
  for (let col = 0; col < b.length; col++) {
    if (!safeToPutAt(b, row, col)) continue;
    b[row][col] = "Q";
    if (solveHelper(b, row + 1)) return true;
    b[row][col] = ".";
  }
};

const updateUI = (b) => {
  for (let i = 0; i < b.length; i++) {
    const c = b[i].indexOf("Q");
    document.getElementById(
      i + "|" + c
    ).innerHTML = `<img src='images/queen.png' >`;
  }
};

const solve = () => {
  if (solveHelper(board, 0)) {
    console.log("solved!");
    updateUI(board);
  } else {
    console.log("impossible to solve!");
  }
};

initUI();
solveBtn.addEventListener("click", solve);
