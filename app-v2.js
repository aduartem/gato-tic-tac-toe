const game = {
  board: [],
  player1: 'X',
  player2: 'O',
  lastPlay: null,
  movesMade: 0,
  gameOver: false,
};
const divBoard = document.querySelector('#board');
const btnRestart = document.querySelector('#btn-restart');
const divButtons = document.querySelector('.buttons');
const alert = document.querySelector('.alert');

function drawBoard() {
  const { board } = game;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('id', `${row}-${col}`);
      cell.textContent = board[row][col];
      divBoard.appendChild(cell);
    }
  }
}

function restartBoard() {
  while (divBoard.firstChild) {
    divBoard.removeChild(divBoard.firstChild);
  }
  drawBoard();
  onClickCell();
}

function setMove(cell, player) {
  if (game.gameOver) {
    return;
  }
  cell.textContent = player;
  const cellId = cell.getAttribute('id');
  const arrCellId = cellId.split('-');
  const row = arrCellId[0];
  const col = arrCellId[1];
  game.board[row][col] = player;
  game.lastPlay = player;
  game.movesMade++;
}

function onClickCell() {
  const cells = document.querySelectorAll('.cell');
  const { player1, player2 } = game;
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (!cell.textContent) {
        const { lastPlay } = game;
        if (!lastPlay || lastPlay === player2) {
          turnAlert(player2)
          setMove(cell, player1);
        } else {
          turnAlert(player1)
          setMove(cell, player2);
        }

        if (game.movesMade > 4) {
          checkWin(game.player1);
          checkWin(game.player2);
        }

        if (!game.gameOver && game.movesMade === 9) {
          game.gameOver = true;
          alert.textContent = `Empate!`;
          divButtons.style.display = 'block';
        }
      }
    });
  });
}

function onClickButtonRestart() {
  btnRestart.addEventListener('click', () => {
    resetGame();
  });
}

function resetGame() {
  game.lastPlay = null;
  game.movesMade = 0;
  game.board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  game.gameOver = false;
  divButtons.style.display = 'none';
  restartBoard();
}

//TODO mejorar funcion checkWin
function checkWin(player) {
  const { board, movesMade } = game;

  const result = [
    board[0].filter((e) => e === player).length,
    board[1].filter((e) => e === player).length,
    board[2].filter((e) => e === player).length,
    [board[0][0], board[1][0], board[2][0]].filter((e) => e === player).length,
    [board[0][1], board[1][1], board[2][1]].filter((e) => e === player).length,
    [board[0][2], board[1][2], board[2][2]].filter((e) => e === player).length,
    [board[0][0], board[1][1], board[2][2]].filter((e) => e === player).length,
    [board[0][2], board[1][1], board[2][0]].filter((e) => e === player).length,
  ];

  if (result.includes(3)) {
    game.gameOver = true;
    alert.textContent = `${player} gana!`;
    divButtons.style.display = 'block';
  } else if (movesMade === 9) {
    alert.textContent = `Empate!`;
    divButtons.style.display = 'block';
  }
}

function turnAlert(player) {
  alert.textContent = `Turno del jugador ${player}`;
}

document.addEventListener('DOMContentLoaded', () => {
  resetGame();
  onClickCell();
  onClickButtonRestart();
});