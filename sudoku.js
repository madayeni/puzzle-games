const boardGame = document.getElementById("board-game");
const solveBtn = document.getElementById("solve");

const size = 9;
const options = [...Array(size).keys()].map((_, i) => i + 1);

for (let i = 0; i < size * size; i++) {
  const el = document.createElement("div");
  el.classList.add("cell");
  const row = Math.floor(i / size);
  const col = i % size;
  el.id = `row${row}col${col}`;
  boardGame.appendChild(el);
}

const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const initUI = () => {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const val = board[row][col];
      document.getElementById(`row${row}col${col}`).innerHTML = val
        ? String(val)
        : "";
    }
  }
};

// const updateUI = () => {};

const safeToPut = (board, row, col, num) => {
  for (let r = 0; r < size; r++) {
    if (board[r][col] === num) return false;
  }
  for (let c = 0; c < size; c++) {
    if (board[row][c] === num) return false;
  }
  const firstOfBlockRow = Math.floor(row / 3) * 3;
  const firstOfBlockCol = Math.floor(col / 3) * 3;
  for (let r = firstOfBlockRow; r < firstOfBlockRow + 3; r++) {
    for (let c = firstOfBlockCol; c < firstOfBlockCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
};

const solveHelper = (board, row, col) => {
  if (row === size) {
    return true;
  } else if (col === size) {
    return solveHelper(board, row + 1, 0);
  } else if (board[row][col] !== 0) {
    return solveHelper(board, row, col + 1);
  } else {
    for (let num = 1; num < 10; num++) {
      if (!safeToPut(board, row, col, num)) {
        continue;
      } else {
        board[row][col] = num;
        if (solveHelper(board, row, col + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }
};

const solve = () => {
  if (solveHelper(board, 0, 0)) {
    console.log(1);
    console.log(board);
  } else {
    console.log(0);
  }
};

initUI();
solveBtn.addEventListener("click", solve);
