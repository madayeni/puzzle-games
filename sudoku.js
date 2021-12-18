const boardGame = document.getElementById("board-game");
const solveBtn = document.getElementById("solve");
const optionsDOM = document.getElementById("options");
const delayEl = document.getElementById("delay");
const resetBtn = document.getElementById("reset");

const size = 9;
const options = [...Array(size).keys()].map((_, i) => i + 1);
let curNum = 0;
let delay = 100;

for (let i = 0; i < size * size; i++) {
  const el = document.createElement("div");
  el.classList.add("cell");
  const row = Math.floor(i / size);
  const col = i % size;
  el.id = `row${row}col${col}`;
  boardGame.appendChild(el);
  applyBoarders(i, el);
}

function applyBoarders(i, el) {
  if (i < size) el.classList.add("top");
  if (i % size === 0) el.classList.add("left");
  if (i % size === size - 1) el.classList.add("right");
  if (i % size === size - 4) el.classList.add("right");
  if (i % size === size - 7) el.classList.add("right");
  if (Math.floor(i / size) === size - 1) el.classList.add("bottom");
  if (Math.floor(i / size) === size - 4) el.classList.add("bottom");
  if (Math.floor(i / size) === size - 7) el.classList.add("bottom");
}

for (let i = 0; i < size; i++) {
  const el = document.createElement("span");
  el.classList.add("cell");
  el.id = `op${i + 1}`;
  el.draggable = true;
  el.innerHTML = `${i + 1}`;
  optionsDOM.appendChild(el);
  el.addEventListener("dragstart", dragStart);
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

const solution = JSON.parse(JSON.stringify(board)); // deep copy

const initUI = () => {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const val = board[row][col];
      const cell = document.getElementById(`row${row}col${col}`);
      cell.innerHTML = val ? String(val) : "";
      if (val) {
        cell.classList.add("given");
      } else {
        cell.addEventListener("dragenter", dragEnter);
        cell.addEventListener("dragleave", dragLeave);
        cell.addEventListener("drop", dragDrop);
        cell.addEventListener("dragover", dragOver);
      }
    }
  }
};

function deleteCell(e) {
  e.target.classList.remove("put");
  e.target.innerHTML = "";
  board[+e.target.id[3]][+e.target.id[7]] = 0;
}

function dragStart(e) {
  curNum = e.target.innerHTML;
}
function dragEnter(e) {
  e.target.classList.add("hover");
}
function dragLeave(e) {
  e.target.classList.remove("hover");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop(e) {
  e.target.classList.remove("hover");
  board[+e.target.id[3]][+e.target.id[7]] = parseInt(curNum);
  e.target.innerHTML = curNum;
  e.target.classList.add("put");
  e.target.addEventListener("dblclick", deleteCell);
}

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

const pause = (val) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, val);
  });
};

const solveHelper = async (board, row, col, flag) => {
  if (row === size) {
    return true;
  } else if (col === size) {
    return solveHelper(board, row + 1, 0, flag);
  } else if (board[row][col] !== 0) {
    return solveHelper(board, row, col + 1, flag);
  } else {
    for (let num = 1; num < 10; num++) {
      if (!safeToPut(board, row, col, num)) {
        continue;
      } else {
        board[row][col] = num;
        if (flag) updateCell(row, col, num);
        await pause(parseInt(delay));
        if (await solveHelper(board, row, col + 1, flag)) return true;
        board[row][col] = 0;
        await pause(parseInt(delay));
        if (flag) updateCell(row, col, 0);
      }
    }
    return false;
  }
};

function updateCell(row, col, num) {
  const cell = document.getElementById(`row${row}col${col}`);
  if (num > 0) {
    cell.classList.add("put-solved");
    cell.innerHTML = String(num);
  } else {
    cell.classList.remove("put-solved");
    cell.innerHTML = "";
  }
}

const solveForUser = () => {
  if (solveHelper(board, 0, 0, true)) {
    console.log("success");
  } else {
    console.log("failure");
  }
};

const solve = () => {
  if (solveHelper(solution, 0, 0, false)) {
    console.log("possible to solve");
  } else {
    ("not solvable");
  }
};

const changeDelay = (e) => {
  delay = e.target.value;
};

initUI();
solve();
solveBtn.addEventListener("click", solveForUser);
delayEl.addEventListener("change", changeDelay);
resetBtn.addEventListener("click", () => location.reload());
