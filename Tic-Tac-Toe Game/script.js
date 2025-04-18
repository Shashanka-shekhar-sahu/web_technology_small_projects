const boardElement = document.getElementById("board");
    const statusElement = document.getElementById("status");

    let board = Array(9).fill("");
    let currentPlayer = "X";
    let gameActive = true;

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function createBoard() {
      boardElement.innerHTML = "";
      board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.index = index;
        cellDiv.addEventListener("click", handleClick);
        boardElement.appendChild(cellDiv);
      });
    }

    function handleClick(e) {
      const index = e.target.dataset.index;
      if (board[index] !== "" || !gameActive) return;

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWin()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (!board.includes("")) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin() {
      return winningCombos.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
      });
    }

    function resetGame() {
      board = Array(9).fill("");
      currentPlayer = "X";
      gameActive = true;
      statusElement.textContent = "Player X's turn";
      createBoard();
    }

    createBoard();