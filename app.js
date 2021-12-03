const boardGame = document.getElementById("board-game");
const sizeSel = document.getElementById("size");
const shuffleBtn = document.getElementById("shuffle");
const solveBtn = document.getElementById("solve");
const resetBtn = document.getElementById("reset");

const sizes = {
  three: 3,
  four: 4,
  five: 5,
  six: 6,
};

let size, per;
let board = {};

const swap = (e) => {
  const cell = parseInt(e.target.innerHTML);
  const { row, col } = board[cell];
  board[cell].row = board[0].row;
  board[cell].col = board[0].col;
  board[0].row = row;
  board[0].col = col;
  updateUI(e);
};

const move = (e) => {
  const val = parseInt(e.target.innerHTML);
  if (board[val].row === board[0].row) {
    if (
      board[val].col === board[0].col + 1 ||
      board[val].col === board[0].col - 1
    ) {
      swap(e);
    }
  } else if (board[val].col === board[0].col) {
    if (
      board[val].row === board[0].row + 1 ||
      board[val].row === board[0].row - 1
    ) {
      swap(e);
    }
  } else {
    return;
  }
};

const initBoard = () => {
  let row, col;
  for (let cell = 1; cell < size * size; cell++) {
    row = Math.floor((cell - 1) / size);
    col = (cell - 1) % size;
    board[cell] = { row, col };
  }
  board[0] = { row: size - 1, col: size - 1 };
};
const initUI = () => {
  size = sizes[sizeSel.value];
  per = 100 / size;
  boardGame.innerHTML = "";
  for (let i = 0; i < size * size - 1; i++) {
    const btn = document.createElement("button");
    btn.innerHTML = String(i + 1);
    const row = Math.floor(i / size);
    const col = Math.floor(i % size);
    btn.classList.add("cell");
    btn.style.width = btn.style.height = `${per}%`;
    btn.style.top = `${row * per}%`;
    btn.style.left = `${col * per}%`;
    boardGame.appendChild(btn);
    btn.addEventListener("click", move);
  }
};
initUI();
initBoard();

const updateUI = (e) => {
  e.target.style.top = `${board[parseInt(e.target.innerHTML)].row * per}%`;
  e.target.style.left = `${board[parseInt(e.target.innerHTML)].col * per}%`;
};

const adjustSize = (e) => {
  size = sizes[e.target.value];
  initUI();
  initBoard();
};

const reset = () => {
  initUI();
  initBoard();
};

sizeSel.addEventListener("change", adjustSize);
resetBtn.addEventListener("click", reset);
shuffleBtn.addEventListener("click", shuffle);
solveBtn.addEventListener("click", solve);
