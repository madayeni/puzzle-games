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

const b =
  "003020600900305001001806400008102900700000008006708200002609500800203009005010300";

// const board = [
//   [5, 3, 0, 0, 7, 0, 0, 0, 0],
//   [6, 0, 0, 1, 9, 5, 0, 0, 0],
//   [0, 9, 8, 0, 0, 0, 0, 6, 0],
//   [8, 0, 0, 0, 6, 0, 0, 0, 3],
//   [4, 0, 0, 8, 0, 3, 0, 0, 1],
//   [7, 0, 0, 0, 2, 0, 0, 0, 6],
//   [0, 6, 0, 0, 0, 0, 2, 8, 0],
//   [0, 0, 0, 4, 1, 9, 0, 0, 5],
//   [0, 0, 0, 0, 8, 0, 0, 7, 9],
// ];
const board = [];
for (let i = 0; i < 9; i++) {
  const c = [];
  for (let j = 0; j < 9; j++) {
    c.push(parseInt(b[i * 9 + j]));
    // console.log(parseInt(b[i * 9 + j]));
  }
  board.push(c);
}

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

const safeToPut = (row, col, num) => {
  for (let r = 0; r < size; r++) {
    if (board[r][col] === num) return false;
  }
  for (let c = 0; c < size; c++) {
    if (board[row][c] === num) return false;
  }
  const firstOfBlockRow = Math.floor(row / size) * size;
  const firstOfBlockCol = Math.floor(col / size) * size;
  for (let r = firstOfBlockRow; r < firstOfBlockRow + 3; r++) {
    for (let c = firstOfBlockCol; c < firstOfBlockCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
};

const solveHelper = (row, col) => {
  if (row === size) {
    return true;
  } else if (col === size) {
    return solveHelper(row + 1, 0);
  } else if (board[row][col] !== 0) {
    return solveHelper(row, col + 1);
  } else {
    for (let num = 1; num < 10; num++) {
      if (!safeToPut(row, col, num)) {
        continue;
      } else {
        console.log(row, col, num);
        board[row][col] = num;
        console.log(board);

        if (solveHelper(row, col + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }
};

const solve = () => {
  //   console.log(board);

  if (solveHelper(0, 0)) {
    console.log(1);
  } else {
    console.log(0);
  }
};

initUI();
solveBtn.addEventListener("click", solve);
