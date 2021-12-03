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

let size, per, board, moves;

const swap = (el) => {
  const cell = parseInt(el.innerHTML);
  moves.push(cell);
  const { row, col } = board[cell];
  board[cell].row = board[0].row;
  board[cell].col = board[0].col;
  board[0].row = row;
  board[0].col = col;
  updateUI(el);
};

const move = (el) => {
  const val = parseInt(el.innerHTML);
  if (board[val].row === board[0].row) {
    if (
      board[val].col === board[0].col + 1 ||
      board[val].col === board[0].col - 1
    ) {
      swap(el);
    }
  } else if (board[val].col === board[0].col) {
    if (
      board[val].row === board[0].row + 1 ||
      board[val].row === board[0].row - 1
    ) {
      swap(el);
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
  boardGame.innerHTML = "";
  for (let i = 0; i < size * size - 1; i++) {
    const btn = document.createElement("button");
    btn.innerHTML = String(i + 1);
    const row = Math.floor(i / size);
    const col = Math.floor(i % size);
    btn.classList.add("cell");
    btn.id = `cell-${i + 1}`;
    btn.style.width = btn.style.height = `${per}%`;
    btn.style.top = `${row * per}%`;
    btn.style.left = `${col * per}%`;
    boardGame.appendChild(btn);
    btn.addEventListener("click", (e) => {
      move(e.target);
    });
  }
};

const initParams = () => {
  size = sizes[sizeSel.value];
  per = 100 / size;
  board = {};
  moves = [];
};

const updateUI = (el) => {
  el.style.top = `${board[parseInt(el.innerHTML)].row * per}%`;
  el.style.left = `${board[parseInt(el.innerHTML)].col * per}%`;
};

const adjustSize = () => {
  reset();
};

const reset = () => {
  initParams();
  initUI();
  initBoard();
};

const solve = () => {
  const temp = [...moves];
  while (temp.length > 0) {
    const cell = temp.pop();
    const el = document.getElementById(`cell-${cell}`);
    console.log(el.innerHTML);
    swap(el);
  }
  moves = [];
};

const shuffle = () => {
  for (let i = 0; i < 1000; i++) {
    const r = Math.floor(Math.random() * (size * size - 1));
    move(boardGame.children[r]);
  }
};

reset();

sizeSel.addEventListener("change", adjustSize);
resetBtn.addEventListener("click", reset);
shuffleBtn.addEventListener("click", shuffle);
solveBtn.addEventListener("click", solve);
