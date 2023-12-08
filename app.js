const game = {
  board: ['', '', '', '', '', '', '', '', ''],
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
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', `${row}`);
    cell.textContent = board[row];
    divBoard.appendChild(cell);
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
  cell.textContent = player;
  game.lastPlay = player;
  game.movesMade++;
}

function onClickCell() {
  const cells = document.querySelectorAll('.cell');
  const { player1, player2 } = game;
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (cell.textContent === '' && !game.gameOver) {
        const { lastPlay } = game;
        if (!lastPlay || lastPlay === player2) {
          turnAlert(player2)
          setMove(cell, player1);
        } else {
          turnAlert(player1)
          setMove(cell, player2);
        }

        if (game.movesMade > 4) {
          checkWin(0, 1, 2);
          checkWin(3, 4, 5);
          checkWin(6, 7, 8);
          checkWin(0, 3, 6);
          checkWin(1, 4, 7);
          checkWin(2, 5, 8);
          checkWin(0, 4, 8);
          checkWin(2, 4, 6);
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
  game.gameOver = false;
  alert.textContent = '';
  divButtons.style.display = 'none';
  restartBoard();
}

function checkWin(position1, position2, position3) {
  const cells = document.querySelectorAll('.cell');
  if (
    cells[position1].textContent &&
    cells[position1].textContent === cells[position2].textContent &&
    cells[position1].textContent === cells[position3].textContent
  ) {
    game.gameOver = true;
    cells[position1].setAttribute('class', 'cell cell-winner');
    cells[position2].setAttribute('class', 'cell cell-winner');
    cells[position3].setAttribute('class', 'cell cell-winner');
    alert.textContent = `El jugador ${cells[position1].textContent} gana!`;
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
